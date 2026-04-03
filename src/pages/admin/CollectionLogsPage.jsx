import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import { getCollectionLogs } from '../../services/adminService';
import { formatBdDateTime } from '../../utils/dateTime';

export default function CollectionLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollectionLogs()
      .then(setLogs)
      .catch((error) =>
        toast.error(error.response?.data?.message || 'Failed to load collection logs')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Collection Logs"
        subtitle="Review completed waste collection records."
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-secondary/15 text-textmain/60">
                <th className="py-3 pr-4">Report ID</th>
                <th className="py-3 pr-4">Report Title</th>
                <th className="py-3 pr-4">Collector</th>
                <th className="py-3 pr-4">Collected At</th>
              </tr>
            </thead>
            <tbody>
              {logs.length ? (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-secondary/10 last:border-0">
                    <td className="py-3 pr-4">{log.wasteReportId}</td>
                    <td className="py-3 pr-4 font-medium">{log.reportTitle}</td>
                    <td className="py-3 pr-4">{log.collectorName}</td>
                    <td className="py-3 pr-4">
                      {formatBdDateTime(log.collectedAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-textmain/60">
                    No collection logs found.
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