import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import StatCard from '../../components/dashboard/StatCard';
import ReportTable from '../../components/dashboard/ReportTable';
import { getReports } from '../../services/wasteReportService';

export default function CollectorDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports().then(setReports).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Collector Dashboard" subtitle="View and manage your assigned collection tasks." />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard title="Assigned to Me" value={reports.length} />
            <StatCard title="Collected" value={reports.filter((x) => x.status === 'Collected').length} />
            <StatCard title="Still Active" value={reports.filter((x) => x.status === 'Assigned').length} />
          </div>
          <ReportTable reports={reports.slice(0, 5)} />
        </>
      )}
    </>
  );
}