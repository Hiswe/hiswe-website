export const state = () => ({
  fields: {},
})

export const mutations = {
  SET(state, payload) {
    state.fields = payload
  },
}
