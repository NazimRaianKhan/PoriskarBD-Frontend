import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AppShell from '../components/common/AppShell';
import PublicLayout from '../layouts/PublicLayout';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import CreateReportPage from '../pages/citizen/CreateReportPage';
import MyReportsPage from '../pages/citizen/MyReportsPage';
import MySchedulesPage from '../pages/citizen/MySchedulesPage';
import CollectorDashboard from '../pages/collector/CollectorDashboard';
import AssignedReportsPage from '../pages/collector/AssignedReportsPage';
import CollectionHistoryPage from '../pages/collector/CollectionHistoryPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersPage from '../pages/admin/UsersPage';
import ZonesPage from '../pages/admin/ZonesPage';
import SchedulesPage from '../pages/admin/SchedulesPage';
import ReportsPage from '../pages/admin/ReportsPage';
import StaffPage from '../pages/admin/StaffPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import CollectionLogsPage from '../pages/admin/CollectionLogsPage';

import { ROLES } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/citizen/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/reports/new"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
              <CreateReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/reports"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
              <MyReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/schedules"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
              <MySchedulesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collector/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.COLLECTOR]}>
              <CollectorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collector/reports"
          element={
            <ProtectedRoute allowedRoles={[ROLES.COLLECTOR]}>
              <AssignedReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collector/history"
          element={
            <ProtectedRoute allowedRoles={[ROLES.COLLECTOR]}>
              <CollectionHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/zones"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <ZonesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedules"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <SchedulesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <StaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/collection-logs"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <CollectionLogsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}