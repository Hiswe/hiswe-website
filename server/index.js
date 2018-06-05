'use strict'

const path = require('path')
const util = require('util')
const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-body')
const serveStatic = require('koa-static')
const compress = require('koa-compress')
const logger = require('koa-logger')
const Router = require('koa-router')
const helmet = require('koa-helmet')

const config = require('./config')

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use(helmet())
app.use(bodyParser())
app.use(compress())
app.use(serveStatic(path.join(__dirname, `./public`)))
app.use(logger())

//////
// ROUTING
//////

const router = new Router()

//----- ERROR HANDLING

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(util.inspect(err, { colors: true }))
    ctx.status = err.statusCode || err.status || 500
    ctx.body = render.errorPage({
      reason: err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- ROUTING

router.get(`/`, async (ctx, next) => {
  ctx.body = `bonjour le monde !`
})

//----- MOUNT ROUTER TO APPLICATION

app.use(router.routes())
app.use(router.allowedMethods())

//////
// LAUNCHING
//////

const server = app.listen(config.PORT, function endInit() {
  console.log(
    `APP Server is listening on port`,
    chalk.cyan(server.address().port),
    `on mode`,
    chalk.cyan(config.NODE_ENV)
  )
})
