export const actions = {
  nuxtServerInit({ commit }, nuxtCtx) {
    const { req } = nuxtCtx
    const { serverData } = req
    if (!serverData) return
    if (serverData.notification) {
      commit(`notification/ADD`, serverData.notification)
    }
    if (serverData.captcha) {
      commit(`contact/CAPTCHA`, serverData.captcha)
    }
    if (serverData.validation) {
      commit(`contact/SET_FIELDS`, serverData.validation)
    }
  },
}
