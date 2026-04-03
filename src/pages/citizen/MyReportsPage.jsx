import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ReportTable from '../../components/dashboard/ReportTable';
import { getReports } from '../../services/wasteReportService';

export default function MyReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports().then(setReports).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="My Reports" subtitle="All reports created by you." />
      {loading ? <Loader /> : <ReportTable reports={reports} />}
    </>
  );
}