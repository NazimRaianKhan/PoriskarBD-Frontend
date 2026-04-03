import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ScheduleCard from '../../components/dashboard/ScheduleCard';
import { getProfile } from '../../services/userService';
import { getSchedulesByZone } from '../../services/scheduleService';

export default function MySchedulesPage() {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function run() {
      try {
        const profile = await getProfile();
        if (profile?.zoneId) {
          const data = await getSchedulesByZone(profile.zoneId);
          setSchedules(data);
        }
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  return (
    <>
      <PageHeader title="Collection Schedules" subtitle="Schedules based on your zone." />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {schedules.length ? (
            schedules.map((schedule) => <ScheduleCard key={schedule.id} schedule={schedule} />)
          ) : (
            <div className="card">No schedules available for your zone.</div>
          )}
        </div>
      )}
    </>
  );
}