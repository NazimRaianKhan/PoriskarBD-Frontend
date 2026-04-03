import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import { useAuth } from '../hooks/useAuth';

export default function AppShell() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-textmain">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {user && <Sidebar />}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Footer />
      </div>
    </div>
  );
}