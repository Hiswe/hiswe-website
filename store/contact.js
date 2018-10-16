import clone from 'lodash.clonedeep'

const INITIAL_FIELDS = {
  email: {
    valid: true,
  },
  message: {
    valid: true,
  },
}

export const state = () => ({
  captcha: ``,
  fields: clone(INITIAL_FIELDS),
})

export const mutations = {
  SET_FIELDS(state, payload) {
    state.fields = payload
  },
  RESET(state) {
    state.fields = clone(INITIAL_FIELDS)
  },
  CAPTCHA(state, payload) {
    state.captcha = payload
  },
}
