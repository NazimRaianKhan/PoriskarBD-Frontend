import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import StatCard from '../../components/dashboard/StatCard';
import ReportTable from '../../components/dashboard/ReportTable';
import { getReports } from '../../services/wasteReportService';

export default function CitizenDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports().then(setReports).finally(() => setLoading(false));
  }, []);

  const collected = reports.filter((x) => x.status === 'Collected').length;
  const assigned = reports.filter((x) => x.status === 'Assigned').length;
  const reported = reports.filter((x) => x.status === 'Reported').length;

  return (
    <>
      <PageHeader title="Citizen Dashboard" subtitle="Track your submitted reports and schedule information." />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard title="My Reports" value={reports.length} />
            <StatCard title="Assigned" value={assigned} />
            <StatCard title="Collected" value={collected} hint={`${reported} still pending`} />
          </div>
          <ReportTable reports={reports.slice(0, 5)} />
        </>
      )}
    </>
  );
}