import { getStatusClasses } from '../../utils/statusColors';

export default function StatusBadge({ status }) {
  return <span className={`badge ${getStatusClasses(status)}`}>{status}</span>;
}
