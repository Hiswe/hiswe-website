export default function({ store }) {
  if (process.server) return
  store.commit(`contact/RESET`)
  store.commit(`notification/REMOVE_ALL`)
}
