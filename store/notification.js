import shortid from 'shortid'

export const state = () => ({
  list: [],
})

export const mutations = {
  ADD(state, payload) {
    const notification = {
      id: payload.id || shortid.generate(),
      ...payload,
    }
    state.list.push(notification)
  },
  REMOVE(state, id) {
    const messageIndex = state.list.findIndex(message => message.id === id)
    state.list.splice(messageIndex, 1)
  },
  REMOVE_ALL(state, payload) {
    state.list = []
  },
}
