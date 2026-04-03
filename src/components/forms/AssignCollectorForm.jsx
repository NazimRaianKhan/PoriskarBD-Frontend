import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { assignCollector } from '../../services/wasteReportService';
import { getCollectors } from '../../services/userService';

export default function AssignCollectorForm({ reportId, onAssigned, mode = 'assign' }) {
  const [collectors, setCollectors] = useState([]);
  const [collectorId, setCollectorId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollectors().then(setCollectors).catch(() => setCollectors([]));
  }, []);

  const handleAssign = async () => {
    if (!collectorId) return toast.error('Select a collector');
    setLoading(true);
    try {
      await assignCollector(reportId, Number(collectorId));
      toast.success(mode === 'reassign' ? 'Collector reassigned' : 'Collector assigned');
      setCollectorId('');
      onAssigned?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to assign collector');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <select
        className="input max-w-xs"
        value={collectorId}
        onChange={(e) => setCollectorId(e.target.value)}
      >
        <option value="">Select collector</option>
        {collectors.map((collector) => (
          <option key={collector.id} value={collector.id}>
            {collector.name}
          </option>
        ))}
      </select>

      <button className="btn-accent" onClick={handleAssign} disabled={loading}>
        {loading ? 'Saving...' : mode === 'reassign' ? 'Reassign' : 'Assign'}
      </button>
    </div>
  );
}