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

const appLogger = consola.withScope(`APP`)
const nuxtLogger = consola.withScope(`NUXT`)

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

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    ctx.state.isJson = ctx.request.type === `application/json`
    await next()
  })

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log(`ERROR HANDLING`)
      console.log(util.inspect(err, { colors: true }))
      ctx.status = err.statusCode || err.status || 500
      const nuxtError = {
        code: ctx.status,
        reason: err.message,
        stacktrace: err.stacktrace || err.stack || false,
      }
      // ctx.body = ctx.redirect(`/error`, {
      //   code: ctx.status,
      //   reason: err.message,
      //   stacktrace: err.stacktrace || err.stack || false,
      // })
      ctx.session = { error: nuxtError }
      if (ctx.state.isJson) {
        return (ctx.body = {
          notification: {
            content: nuxtError.reason,
            type: `error`,
          },
        })
      }
      ctx.redirect(`/${ctx.status}`)
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
  // NUXT
  //////

  // Instantiate nuxt.js
  nuxtConfig.dev = config.isDev
  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (nuxtConfig.dev) {
    console.log(chalk.yellow(`SPA build for dev`))
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    nuxtLogger.debug(ctx.originalUrl)
    ctx.respond = false // Mark request as handled for Koa

    // // useful for nuxtServerInit
    // ctx.req.session = ctx.session || {}
    // // flush session
    // // –> make session act like flash messages
    // ctx.session = {}
    // nuxt.render(ctx.req, ctx.res)

    return new Promise((resolve, reject) => {
      const session = ctx.session
      // useful for nuxtServerInit
      ctx.req.session = {
        ...session,
        captcha: config.captcha.site,
      }
      // flush session
      // –> make session act like flash messages
      ctx.session = {}

      ctx.res.on('close', () => {
        nuxtLogger.debug(`close`, ctx.originalUrl)
        resolve()
      })
      ctx.res.on('finish', () => {
        nuxtLogger.debug(`finish`, ctx.originalUrl)
        resolve()
      })
      // ctx.res.on('finish', resolve)

      nuxt.render(ctx.req, ctx.res, renderPromise => {
        nuxtLogger.debug(`render`, ctx.originalUrl)
        // nuxt.render passes a rejected promise into callback on error.
        renderPromise
          .then(() => {
            nuxtLogger.debug(`resolve`, ctx.originalUrl)
            resolve()
          })
          .catch(() => {
            nuxtLogger.warn(`reject`, ctx.originalUrl)
            reject()
          })
      })
    })
  })

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
