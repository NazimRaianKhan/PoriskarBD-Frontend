import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';

export default function AppShell() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-textmain">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex gap-6">
          {user && (
            <>
              <div
                className={`fixed inset-0 z-40 bg-black/30 transition lg:hidden ${
                  mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              />

              <div
                className={`fixed left-0 top-0 z-50 h-full w-72 transform bg-white p-4 shadow-soft transition lg:static lg:h-auto lg:w-72 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
                  mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <div className="lg:hidden">
                  <div className="mb-4 border-b border-secondary/15 pb-4">
                    <h2 className="text-lg font-bold text-textmain">Menu</h2>
                    <p className="text-sm text-secondary">Navigation and account</p>
                  </div>
                </div>

                <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </>
          )}

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Footer />
      </div>
    </div>
  );
}