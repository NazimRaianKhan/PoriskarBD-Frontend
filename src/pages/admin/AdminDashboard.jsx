import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import StatCard from '../../components/dashboard/StatCard';
import ZoneSummaryCard from '../../components/dashboard/ZoneSummaryCard';
import { getAdminStats, getZoneSummary } from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminStats(), getZoneSummary()])
      .then(([statsData, zoneData]) => {
        setStats(statsData);
        setZones(zoneData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Monitor reports, users, zones, and operations from one place." />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Reports" value={stats?.totalReports} />
            <StatCard title="Collected" value={stats?.collectedCount} />
            <StatCard title="Collectors" value={stats?.totalCollectors} />
            <StatCard title="Zones" value={stats?.totalZones} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {zones.map((zone) => (
              <ZoneSummaryCard key={zone.zoneId} zone={zone} />
            ))}
          </div>
        </>
      )}
    </>
  );
}