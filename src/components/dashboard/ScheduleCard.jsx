export default function ScheduleCard({ schedule }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">{schedule.zoneName}</h3>
      <p className="mt-1 text-textmain/70">{schedule.dayOfWeek}</p>
      <p className="mt-2 rounded-2xl bg-background px-3 py-2 text-sm">{schedule.timeSlot}</p>
    </div>
  );
}
