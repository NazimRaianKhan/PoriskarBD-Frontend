import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/common/PageHeader';
import Loader from '../components/common/Loader';
import { getProfile, updateMyProfile } from '../services/userService';
import { validateEmail, validateName } from '../utils/validators';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setForm({
          name: data?.name || '',
          email: data?.email || '',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(form.name)) {
      return toast.error('Name must be at least 3 characters');
    }

    if (!validateEmail(form.email)) {
      return toast.error('Enter a valid email address');
    }

    setSaving(true);
    try {
      const updated = await updateMyProfile({
        name: form.name.trim(),
        email: form.email.trim(),
      });
      setProfile(updated);
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader title="My Profile" subtitle="View and update your account details." />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <button className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Update Profile'}
          </button>
        </form>

        <div className="card space-y-3">
          <div>
            <span className="font-semibold">Role:</span> {profile?.role}
          </div>
          <div>
            <span className="font-semibold">Zone:</span> {profile?.zoneName || '-'}
          </div>
        </div>
      </div>
    </>
  );
}