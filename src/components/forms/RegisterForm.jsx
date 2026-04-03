import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getZones } from '../../services/zoneService';
import { registerUser } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    zoneId: '',
  });

  useEffect(() => {
    getZones().then(setZones).catch(() => setZones([]));
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    if (!validateEmail(form.email)) return toast.error('Enter a valid email');
    if (!validatePassword(form.password)) return toast.error('Password must be at least 8 characters, atleast one capital, one smaller and a special character ');
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        zoneId: form.zoneId ? Number(form.zoneId) : null,
      });
      toast.success('Registration successful. You can login now.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-lg">
      <h2 className="mb-6 text-2xl font-bold">Create citizen account</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Full Name</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        <div>
          <label className="label">Confirm Password</label>
          <input className="input" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Zone</label>
          <select className="input" name="zoneId" value={form.zoneId} onChange={handleChange}>
            <option value="">Select a zone (optional)</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>{zone.name} - {zone.areaName}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
      <p className="mt-4 text-center text-sm text-textmain/70">
        Already have an account? <Link className="font-semibold text-primary" to="/login">Login</Link>
      </p>
    </form>
  );
}
