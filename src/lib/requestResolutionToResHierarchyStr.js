export function requestResolutionToResHierarchyStr (resolution) {
  switch (resolution) {
    case '5-minutes':
      return 'EPOCH'
    case '15-minutes':
      return '3EPOCH'
    case 'hour':
      return 'HOUR'
    case 'weekday':
      return 'DOW'
    case 'day':
      return 'DAY'
    case 'month':
      return 'MONTH'
    case 'year':
      return 'YEAR'
  }
}
