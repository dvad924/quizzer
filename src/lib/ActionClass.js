import APILocation from './DataLocationClass'
import fetchable, { fetchhandler } from './FetchableIFace'
import receiveData from './signal'

export default class Action {
  constructor () {
    this._name = ''
    this.post = this.post.bind(this)
    this.action = (...args) => {
      return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
          let state = getState()
          let obj = args[0]
          if (this.preaction) obj = this.preaction(state, ...args)
          resolve([dispatch, obj])
        })
      }
    }
  }
  get name () {
    return this._name
  }
  set name (n) {
    this._name = n
  }
  get consequence () {
    return this._consequence
  }
  set consequence (s) {
    this._consequence = s
  }
  get action () {
    return (...args) => {
      return (dispatch, getState) => {
        let act = this._action(...args)(dispatch, getState)
        return act.then(this.post)
      }
    }
  }
  set action (a) {
    this._action = a
  }
  signal (o) {
    return receiveData(this.name, o)
  }
  format (x) {
    return x
  }
  post (args) {
    let disp = args[0]
    let o = args[1]
    o = this.format(o)
    return new Promise((resolve, reject) => {
      disp(this.signal(o))
      resolve()
    })
  }
  chainable (disp, gstate) {
    return o => {
      return new Promise((resolve, reject) => {
        disp(this.signal(o))
        resolve(o)
      })
    }
  }
}
export class APIFetchingAction extends Action {
  constructor () {
    super()
    this._location = new APILocation()
    this._request = null
  }
  get location () {
    return this._location
  }
  set location (l) {
    this._location = l
  }
  get request () {
    return this._request
  }
  set request (r) {
    this._request = r
  }

  execRequest () {
    let f = fetchable(this.location, this.request)
    return fetchhandler(f, this.prefetch)
  }
}

export class UXAction extends Action {
  constructor () {
    super()
  }
}
