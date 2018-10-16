export default function(nuxtContext) {
  const { req, error } = nuxtContext
  // console.log(`HANDLE SERVER ERRORS`)
  if (process.server && !req) {
    // console.log(`HANDLE SERVER ERRORS`, `not server`)
    return
  }
  // console.log(`HANDLE SERVER ERRORS`, `server`)
  // console.log(req)
  if (!req.error) {
    // console.log(`HANDLE SERVER ERRORS`, `no req.error`)
    return
  }
  // console.log(`HANDLE SERVER ERRORS`, `ERROR`)
  // console.log(req.error)

  error({
    statusCode: req.error.statusCode || 500,
    message: req.error.message || `an error as occurred`,
  })
}
