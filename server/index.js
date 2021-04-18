import chalk from 'chalk'
import Koa from 'koa'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import formatJson from 'koa-json'
import Router from 'koa-router'
import koaBody from 'koa-body'
import consola from 'consola'
import { default as nuxtLib } from 'nuxt'
import util from 'util'
import session from 'koa-session'
import koaNuxt from '@hiswe/koa-nuxt'

import config from './config.js'
import { servicesReady } from './services/index.js'
import getLatestBlogPost from './latest-blog-post.js'
import sendContactMail from './send-contact-mail.js'
import nuxtConfig from '../nuxt.config.js'

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

  const sessionsOptions = {
    key: `hiswe-website`,
    autoCommit: false,
  }

  app.use(session(sessionsOptions, app))

  //----- NUXT HANDLING

  // Instantiate nuxt.js
  nuxtConfig.dev = config.isDev
  const nuxt = new nuxtLib.Nuxt(nuxtConfig)
  // create the nuxt middleWare
  const renderNuxt = koaNuxt(nuxt)

  // Build in development
  if (nuxtConfig.dev) {
    appLogger.warn(`SPA build for dev`)
    const builder = new nuxtLib.Builder(nuxt)
    await builder.build()
  }

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
      ctx.req.serverData = {
        error: {
          statusCode: ctx.status,
          message: err.message,
        },
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
    const mailResponse = await sendContactMail(ctx.request.body)
    if (ctx.state.isJson) return (ctx.body = mailResponse)
    ctx.session = mailResponse
    await ctx.session.manuallyCommit()
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
    ctx.req.serverData = {
      validation: session.validation,
      notification: session.notification,
      captcha: config.captcha.site,
    }
    // flush session
    // –> make session act like flash messages
    ctx.session = {}
    await ctx.session.manuallyCommit()
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
