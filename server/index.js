import chalk from 'chalk'
import Koa from 'koa'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import formatJson from 'koa-json'
import Router from 'koa-router'
import koaBody from 'koa-body'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import util from 'util'
// import session from 'koa-session'

import config from './config'
import { servicesReady } from './services'
import getLatestBlogPost from './latest-blog-post'
import sendContactMail from './send-contact-mail'
import nuxtConfig from '../nuxt.config.js'
import koaNuxt from './koa-nuxt'
import { reset } from 'ansi-colors'

const appLogger = consola.withScope(`APP`)
const errorLogger = consola.withScope(`ERROR`)

async function start() {
  //////
  // SERVER CONFIG
  //////

  const app = new Koa()

  // for signed cookies
  app.keys = [
    `e05fa6f6e4c078ad997ec324e6d69f59829b2e2237c5e1d9e3610fea291793f4`,
    `64241b9838c5d0d5f94f7e83c71d83af4674f8c84e406a138263a8803a3b1e6f`,
  ]

  app.use(helmet())
  app.use(compress())
  app.use(logger())
  app.use(formatJson())

  // Don't use sessions
  // • we will need Koa 3 to not have ERR_HTTP_HEADERS_SENT errors
  // • https://github.com/koajs/koa/issues/1008

  // app.use(
  //   session(
  //     {
  //       key: 'hiswe-website',
  //     },
  //     app
  //   )
  // )

  //----- NUXT HANDLING

  // Instantiate nuxt.js
  nuxtConfig.dev = config.isDev
  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (nuxtConfig.dev) {
    console.log(chalk.yellow(`SPA build for dev`))
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const renderNuxt = koaNuxt(nuxt)

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    ctx.state.isJson = ctx.request.type === `application/json`
    await next()
  })

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      errorLogger.error(`one of the next middleware has errored`)
      console.log(util.inspect(err, { colors: true }))
      ctx.status = err.statusCode || err.status || 500
      const nuxtError = {
        code: ctx.status,
        reason: err.message,
        stacktrace: err.stacktrace || err.stack || false,
      }
      if (ctx.state.isJson) {
        errorLogger.error(`serving json response`)
        return (ctx.body = {
          notification: {
            content: nuxtError.reason,
            type: `error`,
          },
        })
      }
      ctx.req.error = {
        statusCode: ctx.status,
        message: err.message,
      }
      try {
        errorLogger.error(`serving nuxt response`)
        await renderNuxt(ctx)
      } catch (nuxtError) {
        errorLogger.error(`serving nuxt response failed`)
        ctx.body = `nuxt error`
      }
    }
  })

  //////
  // API ROUTING
  //////

  //----- API

  const router = new Router({ prefix: `/api` })

  router.get(`/latest-blog-post`, async ctx => {
    const blogEntries = await getLatestBlogPost()
    ctx.body = blogEntries
  })

  router.post(`/contact`, koaBody(), async ctx => {
    const state = await sendContactMail(ctx.request.body)
    if (ctx.state.isJson) return (ctx.body = state)
    ctx.session = state
    ctx.redirect(`/`)
  })

  //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes())
  app.use(router.allowedMethods())

  //////
  // NUXT FALLBACK
  //////

  app.use(async (ctx, next) => {
    const session = ctx.session || {}
    // useful for nuxtServerInit
    ctx.req.session = {
      ...session,
      captcha: config.captcha.site,
    }
    // flush session
    // –> make session act like flash messages
    ctx.session = {}
    await next()
  })

  app.use(renderNuxt)

  //////
  // LAUNCHING
  //////

  try {
    await servicesReady
    app.listen(config.PORT, config.HOST, function endInit() {
      appLogger.start(
        `server is listening on`,
        chalk.cyan(`${config.HOST}:${config.PORT}`),
        `on mode`,
        chalk.cyan(config.NODE_ENV)
      )
    })
  } catch (error) {
    appLogger.fatal(chalk.red(`not launched – needed services errored`))
    console.log(error)
  }
}

start()
