import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validators';
import { ROLES } from '../../utils/constants';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return toast.error('Enter a valid email');
    if (!form.password) return toast.error('Password is required');

    try {
      const data = await login(form);
      if (data.role === ROLES.ADMIN) navigate('/admin/dashboard');
      else if (data.role === ROLES.COLLECTOR) navigate('/collector/dashboard');
      else navigate('/citizen/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md">
      <h2 className="mb-6 text-2xl font-bold">Welcome back</h2>
      <label className="label">Email</label>
      <input className="input mb-4" name="email" type="email" value={form.email} onChange={handleChange} />
      <label className="label">Password</label>
      <input className="input mb-6" name="password" type="password" value={form.password} onChange={handleChange} />
      <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      <p className="mt-4 text-center text-sm text-textmain/70">
        Need an account? <Link className="font-semibold text-primary" to="/register">Register</Link>
      </p>
    </form>
  );
}
