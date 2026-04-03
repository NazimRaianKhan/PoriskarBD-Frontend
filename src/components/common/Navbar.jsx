import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Leaf,
  LogOut,
  Menu,
  UserCircle2,
  X,
  Home,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function Navbar({ mobileMenuOpen = false, setMobileMenuOpen = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [publicMenuOpen, setPublicMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setPublicMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'Admin') return '/admin/dashboard';
    if (user.role === 'Collector') return '/collector/dashboard';
    return '/citizen/dashboard';
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path ? 'text-primary' : 'text-textmain hover:text-primary'
    }`;

  const handleMobileButton = () => {
    if (user) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setPublicMenuOpen(!publicMenuOpen);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-secondary/15 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to={getDashboardPath()} className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-2.5 text-white shadow-soft">
            <Leaf size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold">Poriskar BD</h1>
            <p className="text-xs text-secondary">Smart Waste Management</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {!user ? (
            <>
              <Link to="/" className={navLinkClass('/')}>Home</Link>
              <Link to="/login" className={navLinkClass('/login')}>Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-soft hover:bg-primary/5"
              >
                <UserCircle2 size={18} className="text-primary" />
                <div className="text-sm text-left">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-secondary">{user.role}</p>
                </div>
              </Link>

              <button onClick={handleLogout} className="btn-accent flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          onClick={handleMobileButton}
          className="inline-flex rounded-2xl bg-white p-2 shadow-soft lg:hidden"
        >
          {(user ? mobileMenuOpen : publicMenuOpen) ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {!user && publicMenuOpen && (
        <div className="border-t border-secondary/15 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
            <Link
              to="/"
              onClick={() => setPublicMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Home size={16} />
              Home
            </Link>

            <Link
              to="/login"
              onClick={() => setPublicMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <LogIn size={16} />
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setPublicMenuOpen(false)}
              className="btn-primary text-center"
            >
              <span className="inline-flex items-center gap-2">
                <UserPlus size={16} />
                Register
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}