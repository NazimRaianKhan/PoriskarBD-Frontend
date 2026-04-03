import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getZones } from '../../services/zoneService';
import { createSchedule } from '../../services/scheduleService';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeOptions = [
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
];

export default function ScheduleForm({ onSuccess }) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    zoneId: '',
    dayOfWeek: '0',
    startTime: '',
    startMeridiem: 'AM',
    endTime: '',
    endMeridiem: 'AM',
  });

  useEffect(() => {
    getZones().then(setZones).catch(() => setZones([]));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dayValue = Number(form.dayOfWeek);
    if (!form.zoneId) return toast.error('Zone is required');
    if (Number.isNaN(dayValue) || dayValue < 0 || dayValue > 6) {
      return toast.error('Day must be between 0 and 6');
    }
    if (!form.startTime || !form.endTime) {
      return toast.error('Start and end time are required');
    }

    const timeSlot = `${form.startTime} ${form.startMeridiem} - ${form.endTime} ${form.endMeridiem}`;

    setLoading(true);
    try {
      await createSchedule({
        zoneId: Number(form.zoneId),
        dayOfWeek: dayValue,
        timeSlot,
      });
      toast.success('Schedule created');
      setForm({
        zoneId: '',
        dayOfWeek: '0',
        startTime: '',
        startMeridiem: 'AM',
        endTime: '',
        endMeridiem: 'AM',
      });
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create schedule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="mb-4 text-lg font-bold">Create Schedule</h3>

      <div className="space-y-4">
        <div>
          <label className="label">Zone</label>
          <select className="input" name="zoneId" value={form.zoneId} onChange={handleChange}>
            <option value="">Select zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Day</label>
          <select className="input" name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange}>
            {days.map((day, index) => (
              <option key={day} value={index}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Start Time</label>
            <div className="grid grid-cols-[1fr_100px] gap-2">
              <select className="input" name="startTime" value={form.startTime} onChange={handleChange}>
                <option value="">Select</option>
                {timeOptions.map((time, index) => (
                  <option key={`${time}-${index}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                className="input"
                name="startMeridiem"
                value={form.startMeridiem}
                onChange={handleChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">End Time</label>
            <div className="grid grid-cols-[1fr_100px] gap-2">
              <select className="input" name="endTime" value={form.endTime} onChange={handleChange}>
                <option value="">Select</option>
                {timeOptions.map((time, index) => (
                  <option key={`${time}-${index}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                className="input"
                name="endMeridiem"
                value={form.endMeridiem}
                onChange={handleChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-background px-4 py-3 text-sm text-textmain/70">
          Preview:{" "}
          <span className="font-medium text-textmain">
            {form.startTime ? `${form.startTime} ${form.startMeridiem}` : '--'} -{' '}
            {form.endTime ? `${form.endTime} ${form.endMeridiem}` : '--'}
          </span>
        </div>
      </div>

      <button className="btn-primary mt-5" disabled={loading}>
        {loading ? 'Saving...' : 'Create Schedule'}
      </button>
    </form>
  );
}