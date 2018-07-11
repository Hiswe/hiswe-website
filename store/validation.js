export const state = () => ({
  fields: {
    email: {
      valid: true,
    },
    message: {
      valid: true,
    },
  },
})

export const mutations = {
  SET(state, payload) {
    state.fields = payload
  },
}
