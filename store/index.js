export const actions = {
  nuxtServerInit({ commit }, nuxtCtx) {
    const { req } = nuxtCtx
    const { session } = req
    if (!session) return
    if (session.notification) {
      commit(`notification/ADD`, session.notification)
    }
    if (session.captcha) {
      commit(`contact/CAPTCHA`, session.captcha)
    }
    if (session.validation) {
      commit(`contact/SET_FIELDS`, session.validation)
    }
  },
}
