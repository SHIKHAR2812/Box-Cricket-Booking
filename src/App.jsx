import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Slots from './pages/Slots';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import Rewards from './pages/Rewards';
import Staff from './pages/Staff';
import Offers from './pages/Offers';
import Inventory from './pages/Inventory';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
  const protectedRoutes = [
    {
      path: '/dashboard',
      element: <Dashboard />,
      permissions: ['view_reports'],
    },
    {
      path: '/bookings',
      element: <Bookings />,
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/users',
      element: <Users />,
      permissions: ['manage_staff'],
    },
    {
      path: '/slots',
      element: <Slots />,
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/payments',
      element: <Payments />,
      permissions: ['manage_payments', 'view_payments'],
    },
    {
      path: '/reviews',
      element: <Reviews />,
      permissions: ['view_reports'],
    },
    {
      path: '/rewards',
      element: <Rewards />,
      permissions: ['manage_offers'],
    },
    {
      path: '/staff',
      element: <Staff />,
      permissions: ['manage_staff'],
    },
    {
      path: '/offers',
      element: <Offers />,
      permissions: ['manage_offers', 'view_offers'],
    },
    {
      path: '/inventory',
      element: <Inventory />,
      permissions: ['manage_inventory', 'update_inventory'],
    },
    {
      path: '/calendar',
      element: <Calendar />,
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/settings',
      element: <Settings />,
      permissions: ['manage_settings'],
    },
  ];

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {protectedRoutes.map(({ path, element, permissions }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute requiredPermissions={permissions}>
                  <DashboardLayout>
                    {element}
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
