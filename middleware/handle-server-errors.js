export default function(nuxtContext) {
  const { store, redirect, route, req, error } = nuxtContext
  if (process.server && !req) return
  console.log(`handle-server-errors`)
  // console.log(req.session)
  // const { session } = req

  // if (!store.state.authUser) {
  // 	return redirect('/login', {next: route.path})
  // }
}
