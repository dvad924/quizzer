'use strict'
/*
  const initialState = {
  visibility:true,
  year:2016,
  month:'all',
  week:{
    'sunday':false,
    'monday':true,
    'tuesday':true,
    'wednesday':true,
    'thursday':true,
    'friday':true,
    'saturday':false
  },
  peak:{ 'AM':false, 'Off':false, 'PM':false },
  resolution:'hour',
  statoptions: [{ name:'mean', value:'mean' }, { name:'qtile', value:'qtile' }],
  stat:'mean',
  stat_param:'0.5',
  start_time:'06:00',
  end_time:'18:00',
  start_date:'2016-01-01',
  end_date:'2016-12-31',
  amPeakStart: 72,
  amPeakEnd: 108,
  pmPeakStart: 192,
  pmPeakEnd: 228,
  depth:3,
  _PeakCache:{},
  time: 0
}
*/
import cloneDeep from 'lodash/cloneDeep'
export default class DataSettingsHandler {

  constructor (setts) {
    this.settings = cloneDeep(setts)
    this.init()
  }

  init () {
  }

  updateComponents (components, type) {
    components.forEach(comp => {
      if (type) {
        comp.setWeekdays(this.settings.week)
        comp.startDate(this.settings.start_date)
        comp.endDate(this.settings.end_date)
        comp.startTime(this.settings.start_time)
        comp.endTime(this.settings.end_time)
        comp.resolution(this.settings.resolution)
        comp.dirty(true)
      } else {
        comp.dirty(true)
        comp.year(this.settings.year)
        comp.month(this.settings.month)
        comp.setDates()
      }
    })
  }
}
