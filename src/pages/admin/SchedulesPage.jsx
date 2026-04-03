import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ScheduleForm from '../../components/forms/ScheduleForm';
import {
  deleteSchedule,
  getSchedules,
  updateSchedule,
} from '../../services/scheduleService';
import { getZones } from '../../services/zoneService';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editForm, setEditForm] = useState({
  zoneId: '',
  dayOfWeek: '0',
  startTime: '',
  startMeridiem: 'AM',
  endTime: '',
  endMeridiem: 'AM',
});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [scheduleData, zoneData] = await Promise.all([getSchedules(), getZones()]);
      setSchedules(scheduleData);
      setZones(zoneData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const parseTimeSlot = (timeSlot) => {
    const [startPart, endPart] = timeSlot.split(' - ');
    const [startTime, startMeridiem] = startPart.split(' ');
    const [endTime, endMeridiem] = endPart.split(' ');

    return {
      startTime: startTime || '',
      startMeridiem: startMeridiem || 'AM',
      endTime: endTime || '',
      endMeridiem: endMeridiem || 'AM',
    };
  };

  const startEdit = (schedule) => {
    const parsed = parseTimeSlot(schedule.timeSlot);

    setEditingSchedule(schedule);
    setEditForm({
      zoneId: String(schedule.zoneId),
      dayOfWeek: String(days.indexOf(schedule.dayOfWeek)),
      startTime: parsed.startTime,
      startMeridiem: parsed.startMeridiem,
      endTime: parsed.endTime,
      endMeridiem: parsed.endMeridiem,
    });
  };

  const cancelEdit = () => {
    setEditingSchedule(null);
    setEditForm({
      zoneId: '',
      dayOfWeek: '0',
      startTime: '',
      startMeridiem: 'AM',
      endTime: '',
      endMeridiem: 'AM',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const dayValue = Number(editForm.dayOfWeek);
    if (!editForm.zoneId) return toast.error('Zone is required');
    if (Number.isNaN(dayValue) || dayValue < 0 || dayValue > 6) {
      return toast.error('Day must be between 0 and 6');
    }
    if (!editForm.startTime || !editForm.endTime) {
      return toast.error('Start and end time are required');
    }

    const timeSlot = `${editForm.startTime} ${editForm.startMeridiem} - ${editForm.endTime} ${editForm.endMeridiem}`;

    setSaving(true);
    try {
      await updateSchedule(editingSchedule.id, {
        zoneId: Number(editForm.zoneId),
        dayOfWeek: dayValue,
        timeSlot,
      });
      toast.success('Schedule updated');
      cancelEdit();
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update schedule');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (schedule) => {
    const ok = window.confirm(`Delete schedule for ${schedule.zoneName}?`);
    if (!ok) return;

    try {
      await deleteSchedule(schedule.id);
      toast.success('Schedule deleted');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete schedule');
    }
  };

  return (
    <>
      <PageHeader title="Schedules" subtitle="Create, update, and review collection schedules." />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <ScheduleForm onSuccess={load} />

          {editingSchedule && (
            <form onSubmit={handleUpdate} className="card">
              <h3 className="mb-4 text-lg font-bold">Edit Schedule</h3>

              <div className="space-y-4">
                <div>
                  <label className="label">Zone</label>
                  <select
                    className="input"
                    value={editForm.zoneId}
                    onChange={(e) => setEditForm((p) => ({ ...p, zoneId: e.target.value }))}
                  >
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
                  <select
                    className="input"
                    value={editForm.dayOfWeek}
                    onChange={(e) => setEditForm((p) => ({ ...p, dayOfWeek: e.target.value }))}
                  >
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
                      <select
                        className="input"
                        value={editForm.startTime}
                        onChange={(e) => setEditForm((p) => ({ ...p, startTime: e.target.value }))}
                      >
                        <option value="">Select</option>
                        {timeOptions.map((time, index) => (
                          <option key={`${time}-${index}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <select
                        className="input"
                        value={editForm.startMeridiem}
                        onChange={(e) => setEditForm((p) => ({ ...p, startMeridiem: e.target.value }))}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">End Time</label>
                    <div className="grid grid-cols-[1fr_100px] gap-2">
                      <select
                        className="input"
                        value={editForm.endTime}
                        onChange={(e) => setEditForm((p) => ({ ...p, endTime: e.target.value }))}
                      >
                        <option value="">Select</option>
                        {timeOptions.map((time, index) => (
                          <option key={`${time}-${index}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <select
                        className="input"
                        value={editForm.endMeridiem}
                        onChange={(e) => setEditForm((p) => ({ ...p, endMeridiem: e.target.value }))}
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
                    {editForm.startTime ? `${editForm.startTime} ${editForm.startMeridiem}` : '--'} -{' '}
                    {editForm.endTime ? `${editForm.endTime} ${editForm.endMeridiem}` : '--'}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Update'}
                </button>
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="card">
                <h3 className="text-lg font-semibold">{schedule.zoneName}</h3>
                <p className="mt-1 text-textmain/70">{schedule.dayOfWeek}</p>
                <p className="mt-2 rounded-2xl bg-background px-3 py-2 text-sm">
                  {schedule.timeSlot}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="btn-secondary" onClick={() => startEdit(schedule)}>
                    Edit
                  </button>
                  <button className="btn-accent" onClick={() => handleDelete(schedule)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}