export const flatten = net => {
  let tmcs = new Set()
  net.forEach(node => {
    tmcs.add(node.source)
    tmcs.add(node.target)
  })
  return [...tmcs]
}

// take a single step in the graph
// checking the list of required nodes
function breadth_min_step (graph, cur, ledger, checklist) {
  let visible = graph[cur]
  let reachable = checklist.filter(n => visible.has(n))
  if (reachable.length > 0) {
    checklist.splice(checklist.indexOf(reachable[0]), 1)
    return { found: reachable[0] }
  }
  visible.forEach(k => {
    ledger[k] = cur
  })
  return { next: [...visible] }
}

function unravel (seed, map) {
  let list = [seed]
  let key = seed
  while (map[key]) {
    list.unshift(map[key])
    key = map[key]
  }
  return list
}

function travelAlongGraph (state, seq, nodes) {
  let cur = state.que.splice(0, 1)[0]
  let res = null
  if (cur) {
    res = breadth_min_step(state.graph, cur, state.ledger, nodes)
    if (res.found) {
      if (state.prepend) {
        seq = unravel(res.found, state.ledger).concat(seq)
      } else {
        seq = seq.concat(unravel(res.found, state.ledger))
      }
      state.que.push(res.found)
    } else {
      let newnodes = res.next.filter(id => state.seen.indexOf(id) < 0)
      state.que = state.que.concat(newnodes)
      state.seen = state.seen.concat(newnodes)
    }
  }
  return seq
}

// search through the graph in a breadth first fashion
// assumes full reachability within graph
function breadth_min_build (graph, nodes) {
  let first = nodes.pop()
  let fque = [first]
  let rque = [first]
  let fseen = [first]
  let rseen = [first]
  let seq = [first]
  let fstate = {
    graph: graph.for,
    que: fque,
    ledger: {},
    seq: seq,
    seen: fseen
  }
  let rstate = {
    graph: graph.rev,
    que: rque,
    ledger: {},
    seq: seq,
    seen: rseen,
    prepend: true
  }
  let seqs = []
  while (nodes.length > 0) {
    console.log('BFS loop', nodes)

    seq = travelAlongGraph(fstate, seq, nodes)

    if (nodes.length === 0) {
      break
    }

    seq = travelAlongGraph(rstate, seq, nodes)

    // no nodes left to check in either direction
    if (!fstate.que.length && !rstate.que.length) {
      seqs.push(seq) // add seq
      let nfirst = nodes.splice(0, 1)[0] // reset states
      fstate.que = [nfirst]
      fstate.seq = [nfirst]
      fstate.ledger = {}
      fstate.seen = [nfirst]
      rstate.que = [nfirst]
      rstate.seq = [nfirst]
      rstate.ledger = {}
      rstate.seen = [nfirst]
      seq = [nfirst]
      if (nodes.length === 0) {
        seqs.push(seq)
      }
    }
  }
  if (seqs.length) {
    return seqs
  }
  return seq
}

// go through the graph
// create each minimal path
// Result will be sorted from source to target
export const extractRoutesFromHierAndGraph = (hier, graph) => {
  let routes = {}
  let path_required = bundle_routes(hier)

  for (var route in path_required) {
    let rtmcs = path_required[route]
    routes[route] = breadth_min_build(graph, [...rtmcs])
    // for the case of subroutes under a header
    if (typeof routes[route][0] === 'object') {
      let seqs = routes[route]
      seqs.forEach((seq, i) => {
        let name = route + (i ? '_' + i : '')
        routes[name] = seq
      })
    }
  }
  return routes
}

// Go throught the hier
// grabbing the tmcs under a route name
function bundle_routes (hier) {
  let route_tmcs = {}
  Object.keys(hier).forEach(k => {
    let cls = hier[k]
    let clsroutes = cls.children
    clsroutes.forEach(r => {
      route_tmcs[r.value] = route_tmcs[r.value] || new Set()
      r.children.forEach(tmc => {
        route_tmcs[r.value].add(tmc.value)
      })
    })
  })
  return route_tmcs
}
