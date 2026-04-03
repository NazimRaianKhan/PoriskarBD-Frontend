import { REPORT_STATUS } from './constants';

export function getStatusClasses(status) {
  switch (status) {
    case REPORT_STATUS.COLLECTED:
      return 'bg-green-100 text-green-800';
    case REPORT_STATUS.ASSIGNED:
      return 'bg-amber-100 text-amber-800';
    case REPORT_STATUS.REPORTED:
    default:
      return 'bg-orange-100 text-orange-800';
  }
}
