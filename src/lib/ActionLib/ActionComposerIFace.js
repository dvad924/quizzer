/**
 * This interface will compbine multiple actions into a single one to
 * aleaviate the logic in component controllers and allow for robust easy to
 * read actions
 */
import Action from './ActionClass'
export const repercussion = (action, iface) => {
  return (disp, args) => iface(d => disp(action.signal(d)), args)
}

export default class ActionComposer {
  constructor (i, reps) {
    this.instigator = i
    this.repercussions = reps
  }
  composedAction () {
    let act = new Action()
    act.action = this.instigator._action
    const reps = this.repercussions
    act.post = args => {
      let disp = args[0]
      let o = args[1]
      return new Promise((resolve, reject) => {
        reps.forEach(rep => rep(disp, o))
        resolve(o)
      })
    }

    return act
  }
}
