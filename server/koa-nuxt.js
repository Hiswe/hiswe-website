import consola from 'consola'

const nuxtLogger = consola.withScope(`NUXT`)

export default nuxt =>
  function renderNuxt(ctx) {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    nuxtLogger.debug(ctx.originalUrl)
    ctx.respond = false // Mark request as handled for Koa

    return new Promise((resolve, reject) => {
      ctx.res.on('close', () => {
        nuxtLogger.debug(`close`, ctx.originalUrl)
        resolve()
      })
      ctx.res.on('finish', () => {
        nuxtLogger.debug(`finish`, ctx.originalUrl)
        resolve()
      })
      // ctx.res.on('finish', resolve)

      nuxt.render(ctx.req, ctx.res, function nuxtRenderCallback(renderPromise) {
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
  }
