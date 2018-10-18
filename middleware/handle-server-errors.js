export default function(nuxtContext) {
  const { req, error } = nuxtContext
  if (process.client) return
  const { serverData } = req
  if (!serverData.error) return
  error({
    statusCode: serverData.error.statusCode || 500,
    message: serverData.error.message || `an error as occurred`,
  })
}
