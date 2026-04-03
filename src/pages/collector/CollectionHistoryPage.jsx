import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import { getProfile } from '../../services/userService';
import { getCollectorLogs } from '../../services/adminService';
import { formatBdDateTime } from '../../utils/dateTime';

export default function CollectionHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const profile = await getProfile();
        const data = await getCollectorLogs(profile.id);
        setLogs(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load collection history');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      <PageHeader title="Collection History" subtitle="Previously completed collections." />

      {loading ? (
        <Loader />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-secondary/15 text-textmain/60">
                <th className="py-3 pr-4">Report ID</th>
                <th className="py-3 pr-4">Report Title</th>
                <th className="py-3 pr-4">Collected At</th>
              </tr>
            </thead>
            <tbody>
              {logs.length ? (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-secondary/10 last:border-0">
                    <td className="py-3 pr-4">{log.wasteReportId}</td>
                    <td className="py-3 pr-4 font-medium">{log.reportTitle}</td>
                    <td className="py-3 pr-4">{formatBdDateTime(log.collectedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-textmain/60">
                    No completed history yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}