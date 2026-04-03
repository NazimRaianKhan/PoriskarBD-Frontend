import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ReportTable from '../../components/dashboard/ReportTable';
import { getReports, markCollected } from '../../services/wasteReportService';

export default function AssignedReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCollect = async (id) => {
    try {
      await markCollected(id);
      toast.success('Marked as collected');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update report');
    }
  };

  return (
    <>
      <PageHeader title="Assigned Reports" subtitle="Mark your assigned reports as collected." />
      {loading ? (
        <Loader />
      ) : (
        <ReportTable
          reports={reports}
          actionRenderer={(report) =>
            report.status === 'Assigned' ? (
              <button className="btn-primary" onClick={() => handleCollect(report.id)}>
                Mark Collected
              </button>
            ) : null
          }
        />
      )}
    </>
  );
}