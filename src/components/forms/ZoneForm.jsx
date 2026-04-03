import { useState } from 'react';
import toast from 'react-hot-toast';
import { createZone } from '../../services/zoneService';

export default function ZoneForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', areaName: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.areaName.trim()) return toast.error('Both fields are required');
    setLoading(true);
    try {
      await createZone(form);
      toast.success('Zone created');
      setForm({ name: '', areaName: '' });
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create zone');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="mb-4 text-lg font-bold">Create Zone</h3>
      <div className="space-y-4">
        <div>
          <label className="label">Zone Name</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label className="label">Area Name</label>
          <input className="input" name="areaName" value={form.areaName} onChange={handleChange} />
        </div>
      </div>
      <button className="btn-primary mt-5" disabled={loading}>{loading ? 'Saving...' : 'Create Zone'}</button>
    </form>
  );
}
