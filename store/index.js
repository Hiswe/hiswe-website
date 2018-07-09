export const actions = {
  nuxtServerInit({ commit }, nuxtCtx) {
    const { req } = nuxtCtx
    const { session } = req
    if (session.notification) {
      commit(`notification/ADD`, session.notification)
    }
    if (session.validation) {
      commit(`validation/SET`, session.validation)
    }
  },
}
