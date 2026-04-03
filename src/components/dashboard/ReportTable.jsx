import { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import ReportLocationModal from '../common/ReportLocationModal';
import { parseStoredLocation } from '../../utils/locationFormat';
import { formatBdDateTime } from '../../utils/dateTime';

export default function ReportTable({ reports = [], actionRenderer }) {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <>
      <div className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary/15 text-textmain/60">
              <th className="py-3 pr-4">Title</th>
              <th className="py-3 pr-4">Location</th>
              <th className="py-3 pr-4">Map</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Citizen</th>
              <th className="py-3 pr-4">Collector</th>
              <th className="py-3 pr-4">Created</th>
              {actionRenderer && <th className="py-3 pr-4">Action</th>}
            </tr>
          </thead>

          <tbody>
            {reports.length ? (
              reports.map((report) => {
                const parsed = parseStoredLocation(report.location);

                return (
                  <tr key={report.id} className="border-b border-secondary/10 align-top last:border-0">
                    <td className="py-3 pr-4 font-medium">{report.title}</td>
                    <td className="py-3 pr-4">
                      {parsed.address || report.location || '-'}
                    </td>
                    <td className="py-3 pr-4">
                      {parsed.hasCoords ? (
                        <button
                          className="btn-secondary"
                          onClick={() => setSelectedReport(report)}
                        >
                          View Map
                        </button>
                      ) : (
                        <span className="text-textmain/50">N/A</span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="py-3 pr-4">{report.citizenName || '-'}</td>
                    <td className="py-3 pr-4">{report.collectorName || '-'}</td>
                    <td className="py-3 pr-4">{formatBdDateTime(report.createdAt)}</td>
                    {actionRenderer && <td className="py-3 pr-4">{actionRenderer(report)}</td>}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-textmain/60">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReportLocationModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </>
  );
}