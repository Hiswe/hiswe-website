import chalk from 'chalk'
import Koa from 'koa'
// const serveStatic = require('koa-static')
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import formatJson from 'koa-json'
import Router from 'koa-router'
import { Nuxt, Builder } from 'nuxt'

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
  const config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
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

  app.listen(port, host, function endInit() {
    console.log(
      `APP Server is listening on port`,
      chalk.cyan(`${host}:${port}`),
      `on mode`,
      chalk.cyan(config.dev ? `development` : `production`)
    )
  })
}

start()
