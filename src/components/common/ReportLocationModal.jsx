import LocationPreviewMap from '../maps/LocationPreviewMap';
import { parseStoredLocation } from '../../utils/locationFormat';

export default function ReportLocationModal({ report, onClose }) {
  if (!report) return null;

  const parsed = parseStoredLocation(report.location);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{report.title}</h3>
            <p className="mt-2 text-sm text-textmain/70">
              <span className="font-semibold">Address:</span>{' '}
              {parsed.address || report.location}
            </p>
            {parsed.hasCoords && (
              <p className="mt-1 text-xs text-textmain/50">
                {parsed.lat}, {parsed.lng}
              </p>
            )}
          </div>

          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        {parsed.hasCoords ? (
          <LocationPreviewMap
            lat={parsed.lat}
            lng={parsed.lng}
            address={parsed.address}
          />
        ) : (
          <div className="card">No map coordinates available for this report.</div>
        )}
      </div>
    </div>
  );
}