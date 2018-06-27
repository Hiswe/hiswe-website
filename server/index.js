import chalk from 'chalk'
import Koa from 'koa'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import formatJson from 'koa-json'
import Router from 'koa-router'
import { Nuxt, Builder } from 'nuxt'

import config from './config'
import getLatestBlogPost from './latest-blog-post'

async function start() {
  //////
  // SERVER CONFIG
  //////

  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  app.use(helmet())
  app.use(compress())
  app.use(logger())
  app.use(formatJson())

  //////
  // API ROUTING
  //////

  //----- ERROR HANDLING

  // app.use(async (ctx, next) => {
  //   try {
  //     await next()
  //   } catch (err) {
  //     console.log(util.inspect(err, { colors: true }))
  //     ctx.status = err.statusCode || err.status || 500
  //     ctx.body = ctx.render(`error`, {
  //       code: ctx.status,
  //       reason: err.message,
  //       stacktrace: err.stacktrace || err.stack || false,
  //     })
  //   }
  // })

  const router = new Router({ prefix: `/api` })

  router.get(`/latest-blog-post`, async ctx => {
    const blogEntries = await getLatestBlogPost()
    ctx.body = blogEntries
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

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  //////
  // LAUNCHING
  //////

  app.listen(config.PORT, config.HOST, function endInit() {
    console.log(
      `APP Server is listening on`,
      chalk.cyan(`${config.HOST}:${config.PORT}`),
      `on mode`,
      chalk.cyan(config.NODE_ENV)
    )
  })
}

start()
