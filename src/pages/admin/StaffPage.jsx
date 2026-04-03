import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import { createAdmin, createCollector } from '../../services/userService';
import { getZones } from '../../services/zoneService';
import { validateEmail, validateName, validatePassword } from '../../utils/validators';

const initialForm = {
  name: '',
  email: '',
  password: '',
  zoneId: '',
};

export default function StaffPage() {
  const [zones, setZones] = useState([]);
  const [collectorForm, setCollectorForm] = useState(initialForm);
  const [adminForm, setAdminForm] = useState(initialForm);
  const [savingCollector, setSavingCollector] = useState(false);
  const [savingAdmin, setSavingAdmin] = useState(false);

  useEffect(() => {
    getZones().then(setZones).catch(() => setZones([]));
  }, []);

  const handleCollectorChange = (e) =>
    setCollectorForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdminChange = (e) =>
    setAdminForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateStaffBase = (form, requireZone = false) => {
    if (!validateName(form.name)) {
      toast.error('Name must be at least 3 characters');
      return false;
    }

    if (!validateEmail(form.email)) {
      toast.error('Enter a valid email address');
      return false;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return false;
    }

    if (requireZone && !form.zoneId) {
      toast.error('Zone is required for collector');
      return false;
    }

    return true;
  };

  const submitCollector = async (e) => {
    e.preventDefault();

    if (!validateStaffBase(collectorForm, true)) return;

    setSavingCollector(true);
    try {
      await createCollector({
        name: collectorForm.name.trim(),
        email: collectorForm.email.trim(),
        password: collectorForm.password,
        zoneId: Number(collectorForm.zoneId),
      });
      toast.success('Collector created');
      setCollectorForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create collector');
    } finally {
      setSavingCollector(false);
    }
  };

  const submitAdmin = async (e) => {
    e.preventDefault();

    if (!validateStaffBase(adminForm, false)) return;

    setSavingAdmin(true);
    try {
      await createAdmin({
        name: adminForm.name.trim(),
        email: adminForm.email.trim(),
        password: adminForm.password,
      });
      toast.success('Admin created');
      setAdminForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setSavingAdmin(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Create Staff"
        subtitle="Admin can create collector and admin accounts from here."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <form onSubmit={submitCollector} className="card">
          <h3 className="mb-4 text-lg font-bold">Create Collector</h3>

          <div className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input className="input" name="name" value={collectorForm.name} onChange={handleCollectorChange} />
            </div>

            <div>
              <label className="label">Email</label>
              <input className="input" name="email" type="email" value={collectorForm.email} onChange={handleCollectorChange} />
            </div>

            <div>
              <label className="label">Password</label>
              <input className="input" name="password" type="password" value={collectorForm.password} onChange={handleCollectorChange} />
              <p className="mt-1 text-xs text-textmain/60">
                Must be 8+ characters with uppercase, lowercase, number, and special character.
              </p>
            </div>

            <div>
              <label className="label">Zone</label>
              <select className="input" name="zoneId" value={collectorForm.zoneId} onChange={handleCollectorChange}>
                <option value="">Select zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} - {zone.areaName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-primary mt-5" disabled={savingCollector}>
            {savingCollector ? 'Creating...' : 'Create Collector'}
          </button>
        </form>

        <form onSubmit={submitAdmin} className="card">
          <h3 className="mb-4 text-lg font-bold">Create Admin</h3>

          <div className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input className="input" name="name" value={adminForm.name} onChange={handleAdminChange} />
            </div>

            <div>
              <label className="label">Email</label>
              <input className="input" name="email" type="email" value={adminForm.email} onChange={handleAdminChange} />
            </div>

            <div>
              <label className="label">Password</label>
              <input className="input" name="password" type="password" value={adminForm.password} onChange={handleAdminChange} />
              <p className="mt-1 text-xs text-textmain/60">
                Must be 8+ characters with uppercase, lowercase, number, and special character.
              </p>
            </div>
          </div>

          <button className="btn-primary mt-5" disabled={savingAdmin}>
            {savingAdmin ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </>
  );
}