const INITIAL_STATE = {
  email: {
    valid: true,
  },
  message: {
    valid: true,
  },
}

export const state = () => ({
  fields: INITIAL_STATE,
})

export const mutations = {
  SET(state, payload) {
    state.fields = payload
  },
  RESET(state) {
    state.fields = INITIAL_STATE
  },
}
