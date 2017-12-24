/**
 * Class Request
 * Purpose :
 *         To handle the structure of requests to apis
 *
 */
class Request {
  constructor () {
    this.location = ''
    this.method = ''
    this.parameters = {}
    this.headers = {}
    this.body = {}
  }
  set loc (loc) {
    this.location = loc
  }
  get loc () {
    return this.location.path
  }
  addBody (k, v) {
    this.body[k] = v
  }
  setBody (b) {
    this.body = b
  }
  addHeader (k, v) {
    this.headers[k] = v
  }
  addParam (k, v) {
    this.parameters[k] = v
  }
  joinParams () {
    return Object.keys(this.parameters).map(k => `${k}=${this.parameters[k]}`)
  }
  get query () {
    if (Object.keys(this.parameters).length) {
      return '?' + this.joinParams().join('&')
    } else return ''
  }
  get URL () {
    return this.loc + this.query
  }
  get Meta () {
    let meta = {
      method: this.method,
      headers: this.headers
    }
    if (this.method !== 'GET') meta.body = JSON.stringify(this.body)
    return meta
  }
}
/**
 * Class GetRequest
 * Instance Class for GET requests
 */
export class GetRequest extends Request {
  constructor () {
    super()
    this.method = 'GET'
  }
}
/**
 * Class PostRequest
 * Instance Class for POST requests
 */
export class PostRequest extends Request {
  constructor () {
    super()
    this.method = 'POST'
    this.addHeader('Content-Type', 'application/json; charset=utf-8')
  }
}
