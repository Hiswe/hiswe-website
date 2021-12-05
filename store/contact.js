const getInitialFields = () => ({
  email: {
    valid: true,
  },
  message: {
    valid: true,
  },
})

export const state = () => ({
  captcha: ``,
  fields: getInitialFields(),
})

export const mutations = {
  SET_FIELDS(state, payload) {
    state.fields = payload
  },
  RESET(state) {
    state.fields = getInitialFields()
  },
  CAPTCHA(state, payload) {
    state.captcha = payload
  },
}
