import { useState } from 'react';
import toast from 'react-hot-toast';
import { createReport } from '../../services/wasteReportService';
import { reverseGeocode } from '../../services/locationService';
import { buildStoredLocation } from '../../utils/locationFormat';
import LocationPicker from '../maps/LocationPicker';
import LocationPreviewMap from '../maps/LocationPreviewMap';

export default function WasteReportForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [pickedCoords, setPickedCoords] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleMapPick = async (pos) => {
    setAddressLoading(true);
    try {
      const address = await reverseGeocode(pos.lat, pos.lng);
      const storedLocation = buildStoredLocation(address, pos.lat, pos.lng);

      setPickedCoords({ lat: pos.lat, lng: pos.lng });
      setForm((prev) => ({
        ...prev,
        location: storedLocation,
      }));
      toast.success('Location selected from map');
    } catch {
      toast.error('Could not get address from map');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title.trim().length < 5) {
      return toast.error('Title should be at least 5 characters');
    }

    if (form.description.trim().length < 10) {
      return toast.error('Description should be at least 10 characters');
    }

    if (!form.location.trim()) {
      return toast.error('Please select a location from the map');
    }

    setLoading(true);
    try {
      await createReport(form);
      toast.success('Waste report submitted');
      setForm({ title: '', description: '', location: '' });
      setPickedCoords(null);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-3xl">
      <h3 className="mb-5 text-xl font-bold">Report a waste issue</h3>

      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input className="input" name="title" value={form.title} onChange={handleChange} />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-32"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Pick Location from Map</label>
          <LocationPicker onPick={handleMapPick} />
          <p className="mt-2 text-sm text-textmain/70">
            {addressLoading
              ? 'Fetching address from map...'
              : form.location
              ? form.location.split('||')[0].trim()
              : 'Click on the map to select the exact waste location'}
          </p>
        </div>

        
      </div>

      <button className="btn-primary mt-6" disabled={loading || addressLoading}>
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}