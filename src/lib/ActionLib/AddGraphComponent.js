let GRAPH_TYPES = require('routes/NetworkView/modules/GraphTypes')
import GraphFactory from '../modules/GraphFactory'
import placeComponent from 'react/utils/placeComponent'
import * as d3 from 'd3'
export const AddGraphComponent = (state, comp, id) => {
  console.log('<AddGraphComponent>', comp, id)
  let comps = state.components || []
  let cstate = comp.state
  let type = comp.type
  let layout = comp.layout
  let size = comp.size
  let compData = GRAPH_TYPES.reduce((a, c) => (c && c.type === type ? c : a))
  if (compData._loc === 0) {
    compData.react = require('components/Graphs/' + compData.reactFile)
  }
  if (compData._loc === 1) {
    compData.react = require('routes/NetworkView/containers/graphcontainers/' +
      compData.reactFile)
  }
  let graphComp = GraphFactory(compData)
  if (cstate) {
    graphComp.state(cstate)
  }

  if (layout) {
    graphComp.layout(layout, false)
  } else {
    layout = getDefaultLayout(graphComp.getIdString(), comps.length)
    layout.w = size || layout.w
    let others = comps.map(d => d.layout())
    if (others.length) {
      layout = placeComponent(layout, others)
    }
    graphComp.layout(layout, false)
  }
  comps.push(graphComp)
  return graphComp
}

export const checkGraphComponentsEligibility = (state, manager, id) => {
  if (!state.components.length) {
    return false
  }
  let gcomps = state.components.filter(d =>
    graphComponentEligible(d.getType(), manager)
  )
  // if (!gcomps.length) state.initial_added[id] = false

  if (
    !state.initial_added[id] &&
    !gcomps.length &&
    graphComponentEligible(state.defaultType, manager)
  ) {
    state.initial_added[id] = true
    AddGraphComponent(state, { type: state.defaultType }, id)
  }
}

export const graphComponentEligible = (type, manager) => {
  let netComps
  switch (type) {
    case 'Route Difference Graph':
      netComps = manager()
      if (netComps.length <= 1) return false
      var resolutions = d3.set()
      netComps.forEach(comp => {
        var resolution = comp.getDataResolution()
        resolutions.add(resolution)
      })
      return resolutions.size() < netComps.length

    case 'Tmc Differnece Grid':
      netComps = manager()
      if (netComps.length <= 1) return false
      var netCompSet = d3.set()
      for (let i = 0; i < netComps.length; ++i) {
        let comp = netComps[i]
        let route = comp.route()
        let resolution = comp.getDataResolution()
        let setId = route.id + '-' + resolution
        if (netCompSet.has(setId)) return true
        netCompSet.add(setId)
      }
      return false

    case 'Tmc Grid Graph':
    case 'Bar Graph Summary':
    case 'Transcom Events Chart':
    case 'Route Indices Chart':
    case 'Stacked Transcom Graph':
    case 'Route Info Box':
    case 'Peak Data Graphs':
    case 'Route Line Graph':
    case 'Monthly Hours Graph':
    case 'Route Bar Graph':
    case 'TMC Info Box':
    case 'Route Map':
    case 'Distribution Graph':
    case 'Hours of Delay Graph':
    case 'Info Compare Component':
    case 'TMC Data Graph':
    case 'Traffic Volume Graph':
      return manager().reduce((a, c) => a || c.data().length, false)

    case 'Graph Component Divider':
    case 'Text Box':
      return true
  }
}

export const getDefaultLayout = (i, len) => {
  return {
    isDraggable: true,
    isResizable: true,
    maxH: 20,
    maxW: 12,
    minH: 5,
    minW: 4,
    x: 0,
    y: 0,
    h: 10,
    w: len ? 6 : 12,
    static: false,
    i
  }
}

export default AddGraphComponent
