export const setactions = nstate => {
  nstate.hieractions = {}
  nstate.hieractions.getTmcDataBy = (id, type) => {
    // this must be depth first as to keep data association
    let items = {}
    let stack = []
    let hier = nstate.hier[id]
    stack = stack.concat(Object.keys(hier).map(k => hier[k])) // root level of tree
    let graynodes = []
    let curroot = ''
    while (stack.length > 0) {
      let len = stack.length - 1
      let cur = stack[len]
      let ix = graynodes.indexOf(cur)
      if (ix >= 0) {
        stack.pop() // remove the twice seen item from the view stack
        graynodes.splice(ix, 1) // forget that we had seen that node before
        if (curroot === cur.value) {
          curroot = ''
          continue
        }
      }
      graynodes.push(cur)
      if (cur[type.type] && cur[type.type] === type.key) {
        curroot = cur.value
        items[curroot] = []
      }
      if (cur.children.length === 0 && cur.selected && curroot) {
        items[curroot].push(cur)
      } else {
        stack = stack.concat(cur.children)
      }
    }
    return items
  }
  nstate.hieractions.aggedData = (id, req) => {
    let istruct = nstate.hieractions.getTmcDataBy(id, {
      type: 'level_type',
      key: req.class
    })
    return Object.keys(istruct).map(el => {
      let tmcs = istruct[el]

      return {
        label: el,
        value: tmcs.reduce((sum, tmc) => sum + tmc.data.length, 0)
      }
    })
  }
  nstate.hieractions.getSelected = id => {
    let items = []
    let hier = nstate.hier[id]
    let children = Object.keys(hier).map(k => hier[k])
    let ix = 0
    while (ix < children.length) {
      let child = children[ix]
      if (child.children.length === 0 && child.selected) {
        items.push(child.value)
      } else {
        children = children.concat(child.children)
      }
      ix += 1
    }
    return items
  }
}

export const route_class = {
  [true]: 'Interstate',
  [false]: 'Non-Interstate'
}
