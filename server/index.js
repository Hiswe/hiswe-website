import chalk from 'chalk'
import Koa from 'koa'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import formatJson from 'koa-json'
import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-session'
import { Nuxt, Builder } from 'nuxt'

import config from './config'
import { servicesReady } from './services'
import getLatestBlogPost from './latest-blog-post'
import sendContactMail from './send-contact-mail'

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
  app.use(
    session(
      {
        key: 'hiswe-website',
      },
      app
    )
  )

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log(util.inspect(err, { colors: true }))
      ctx.status = err.statusCode || err.status || 500
      ctx.body = ctx.render(`error`, {
        code: ctx.status,
        reason: err.message,
        stacktrace: err.stacktrace || err.stack || false,
      })
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
    ctx.session = state
    ctx.redirect(`/`)
  })

  //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes())
  app.use(router.allowedMethods())

  //////
  // NUXT
  //////

  // Import and Set Nuxt.js options
  const nuxtConfig = require('../nuxt.config.js')
  nuxtConfig.dev = config.isDev

  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (config.isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Nuxt middleware
  // • take a different take from the one in examples
  //   to fix error “Error: Can’t set headers after they are sent”
  // • see this ticket
  //   https://github.com/nuxt/nuxt.js/issues/1206#issuecomment-319271260
  //   https://github.com/nuxt-community/koa-template/pull/39/commits/f478d18dcd613490da8271193bb2f16199360f8c
  app.use(function nuxtMiddleware(ctx) {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    // useful for nuxtServerInit
    ctx.req.session = ctx.session
    ctx.session = {}
    nuxt.render(ctx.req, ctx.res)
  })

  //////
  // LAUNCHING
  //////

  try {
    await servicesReady
    app.listen(config.PORT, config.HOST, function endInit() {
      console.log(
        `APP Server is listening on`,
        chalk.cyan(`${config.HOST}:${config.PORT}`),
        `on mode`,
        chalk.cyan(config.NODE_ENV)
      )
    })
  } catch (error) {
    console.log(chalk.red(`[APP] not launched – needed services errored`))
    console.log(error)
  }
}

start()
