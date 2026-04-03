import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import ZoneForm from '../../components/forms/ZoneForm';
import { deleteZone, getZones, updateZone } from '../../services/zoneService';

export default function ZonesPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingZone, setEditingZone] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', areaName: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getZones();
      setZones(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load zones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (zone) => {
    setEditingZone(zone);
    setEditForm({ name: zone.name, areaName: zone.areaName });
  };

  const cancelEdit = () => {
    setEditingZone(null);
    setEditForm({ name: '', areaName: '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.areaName.trim()) {
      return toast.error('Both fields are required');
    }

    setSaving(true);
    try {
      await updateZone(editingZone.id, editForm);
      toast.success('Zone updated');
      cancelEdit();
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update zone');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (zone) => {
    const ok = window.confirm(`Delete zone "${zone.name}"?`);
    if (!ok) return;

    try {
      await deleteZone(zone.id);
      toast.success('Zone deleted');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete zone');
    }
  };

  return (
    <>
      <PageHeader title="Zones" subtitle="Create, update, and monitor service zones." />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <ZoneForm onSuccess={load} />

          {editingZone && (
            <form onSubmit={handleUpdate} className="card">
              <h3 className="mb-4 text-lg font-bold">Edit Zone</h3>

              <div className="space-y-4">
                <div>
                  <label className="label">Zone Name</label>
                  <input
                    className="input"
                    value={editForm.name}
                    onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="label">Area Name</label>
                  <input
                    className="input"
                    value={editForm.areaName}
                    onChange={(e) => setEditForm((p) => ({ ...p, areaName: e.target.value }))}
                  />
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
          <div className="grid gap-4 md:grid-cols-2">
            {zones.map((zone) => (
              <div key={zone.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{zone.name}</h3>
                    <p className="mt-1 text-textmain/70">{zone.areaName}</p>
                  </div>
                  <span className="badge bg-primary/10 text-primary">#{zone.id}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="btn-secondary" onClick={() => startEdit(zone)}>
                    Edit
                  </button>
                  <button className="btn-accent" onClick={() => handleDelete(zone)}>
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