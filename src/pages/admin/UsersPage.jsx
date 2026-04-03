import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';
import { deleteUser, getUsers } from '../../services/userService';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getUsers(role || undefined);
      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [role]);

  const handleDelete = async (user) => {
    const ok = window.confirm(`Delete user "${user.name}"?`);
    if (!ok) return;

    try {
      await deleteUser(user.id);
      toast.success('User deleted');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage system users with filtering and delete actions."
        action={
          <select className="input max-w-xs" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Collector">Collector</option>
            <option value="Citizen">Citizen</option>
          </select>
        }
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-secondary/15 text-textmain/60">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Zone</th>
                <th className="py-3 pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-secondary/10 last:border-0">
                    <td className="py-3 pr-4 font-medium">{user.name}</td>
                    <td className="py-3 pr-4">{user.email}</td>
                    <td className="py-3 pr-4">{user.role}</td>
                    <td className="py-3 pr-4">{user.zoneName || '-'}</td>
                    <td className="py-3 pr-4">
                      <button className="btn-accent" onClick={() => handleDelete(user)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-textmain/60">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}