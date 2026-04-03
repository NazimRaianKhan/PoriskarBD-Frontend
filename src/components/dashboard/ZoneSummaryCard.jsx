export default function ZoneSummaryCard({ zone }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{zone.zoneName}</h3>
          <p className="text-sm text-textmain/60">{zone.areaName}</p>
        </div>
        <span className="badge bg-primary/10 text-primary">Zone #{zone.zoneId}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-2xl bg-background p-3">
          <p className="text-textmain/60">Reports</p>
          <p className="text-xl font-bold">{zone.totalReports}</p>
        </div>
        <div className="rounded-2xl bg-green-50 p-3">
          <p className="text-textmain/60">Collected</p>
          <p className="text-xl font-bold text-green-700">{zone.collectedReports}</p>
        </div>
        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-textmain/60">Pending</p>
          <p className="text-xl font-bold text-orange-700">{zone.pendingReports}</p>
        </div>
      </div>
    </div>
  );
}
