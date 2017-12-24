import { requestResolutionToResHierarchyStr } from './requestResolutionToResHierarchyStr'
let DateObject = require('react/utils/DateObject')
import { APIFetchingAction } from './ActionClass'
export class APICQFetchingAction extends APIFetchingAction {
  constructor () {
    super()
    this.id = null
    this.req = null
  }
  format (data) {
    return { id: this.id, settings: this.req, data }
  }
  setCQParams (id, req) {
    this.id = id
    this.req = req
    this.request.addParam(
      'resHierarchyStr',
      requestResolutionToResHierarchyStr(req.resolution)
    )
    this.request.addParam('startDate', req.startDate)
    this.request.addParam('endDate', req.endDate)
    if (req.startTime) {
      this.request.addParam(
        'startTime',
        DateObject.epochToTimeString(req.startTime).replace(':', '')
      )
      if (req.endTime) {
        this.request.addParam(
          'endTime',
          DateObject.epochToTimeString(req.endTime).replace(':', '')
        )
      }
    }
  }
}
export default APICQFetchingAction
