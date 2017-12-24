const getAPIHost = () => "";
export class DataLocation {
  constructor() {
    this.root = "";
    this.sub = "";
  }
  get root() {
    return this._root;
  }
  set root(r) {
    this._root = r;
  }
  get sub() {
    return this._sub;
  }
  set sub(s) {
    this._sub = s;
  }

  get path() {
    return this.root + this.sub;
  }
}

export default class APILocation extends DataLocation {
  constructor() {
    super();
    this._root = getAPIHost;
  }
  set root(s) {}
  get root() {
    return this._root();
  }
}
