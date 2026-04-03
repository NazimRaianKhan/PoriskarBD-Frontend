import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  CalendarDays,
  ClipboardList,
  History,
  Users,
  Map,
  Clock3,
  UserPlus,
  UserCircle2,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const baseClass =
  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all';
const inactiveClass = 'text-textmain hover:bg-primary/10';
const activeClass = 'bg-primary text-white shadow-soft';

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    onNavigate?.();
  };

  const citizenLinks = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/citizen/reports/new', label: 'Create Report', icon: FilePlus2, end: true },
    { to: '/citizen/reports', label: 'My Reports', icon: FileText, end: true },
    { to: '/citizen/schedules', label: 'Schedules', icon: CalendarDays, end: true },
  ];

  const collectorLinks = [
    { to: '/collector/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/collector/reports', label: 'Assigned Reports', icon: ClipboardList, end: true },
    { to: '/collector/history', label: 'History', icon: History, end: true },
  ];

  const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users, end: true },
  { to: '/admin/staff', label: 'Create Staff', icon: UserPlus, end: true },
  { to: '/admin/zones', label: 'Zones', icon: Map, end: true },
  { to: '/admin/schedules', label: 'Schedules', icon: Clock3, end: true },
  { to: '/admin/reports', label: 'Reports', icon: FileText, end: true },
  { to: '/admin/collection-logs', label: 'Collection Logs', icon: History, end: true },
];

  const links =
    user.role === 'Admin'
      ? adminLinks
      : user.role === 'Collector'
      ? collectorLinks
      : citizenLinks;

  return (
    <aside className="h-full rounded-2xl bg-white/90 p-4 shadow-soft lg:h-fit">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-textmain">Navigation</h2>
        <p className="text-sm text-secondary">{user.role} panel</p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t border-secondary/15 pt-4 lg:hidden">
        <Link
          to="/profile"
          onClick={onNavigate}
          className="mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-textmain hover:bg-primary/10"
        >
          <UserCircle2 size={18} />
          <span>Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-textmain hover:bg-accent/10"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}