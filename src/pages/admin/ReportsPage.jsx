import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ReportTable from '../../components/dashboard/ReportTable';
import AssignCollectorForm from '../../components/forms/AssignCollectorForm';
import { filterReportsByStatus, getReports } from '../../services/wasteReportService';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = status ? await filterReportsByStatus(status) : await getReports();
      setReports(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Filter reports and assign collectors from one view."
        action={
          <select className="input max-w-xs" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="Reported">Reported</option>
            <option value="Assigned">Assigned</option>
            <option value="Collected">Collected</option>
          </select>
        }
      />
      {loading ? (
        <Loader />
      ) : (
        <ReportTable
          reports={reports}
          actionRenderer={(report) => {
            if (report.status === 'Collected') {
              return <span className="text-sm text-green-700">Completed</span>;
            }

            if (report.status === 'Reported' && !report.collectorId) {
              return <AssignCollectorForm reportId={report.id} onAssigned={load} mode="assign" />;
            }

            if (report.status === 'Assigned') {
              return (
                <div className="space-y-2">
                  <p className="text-xs text-textmain/60">
                    Current: <span className="font-medium">{report.collectorName || 'Unknown'}</span>
                  </p>
                  <AssignCollectorForm reportId={report.id} onAssigned={load} mode="reassign" />
                </div>
              );
            }

            return <span className="text-sm text-textmain/60">-</span>;
          }}
        />
      )}
    </>
  );
}