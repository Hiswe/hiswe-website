import shortid from 'shortid'

export const state = () => ({
  messages: [],
})

export const mutations = {
  ADD(state, payload) {
    state.messages.push({
      id: shortid(),
      ...payload,
    })
  },
  REMOVE(state, id) {
    const messageIndex = state.messages.findIndex(message => message.id === id)
    state.messages = state.messages.splice(messageIndex, 1)
  },
  REMOVE_ALL(state, payload) {
    state.messages = []
  },
}
