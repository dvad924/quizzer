export default class State {
  constructor () {
    this.initial = {}
    this.changes = {}
  }
  associateChange (key, change) {
    this.changes[key] = change
  }
  setInitial (key, obj) {
    this.initial[key] = obj
  }
  actionReducer (state, action) {
    if (!state) state = this.initial
    const handler = this.changes[action.type]
    return handler ? handler(state, action) : state
  }
}
