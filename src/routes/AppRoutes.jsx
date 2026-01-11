// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import BookingDetails from '../pages/BookingDetails';
import Slots from '../pages/Slots';
import Payments from '../pages/Payments';
import Reviews from '../pages/Reviews';
import Rewards from '../pages/Rewards';
import Staff from '../pages/Staff';
import Offers from '../pages/Offers';
import Inventory from '../pages/Inventory';
import Calendar from '../pages/Calendar';
import Settings from '../pages/Settings';
import Notifications from '../pages/Notifications';
import TeamRequests from '../pages/TeamRequests';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes (only accessible when authenticated) */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/bookings" element={<MainLayout><Bookings /></MainLayout>} />
            <Route path="/bookings/:bookingId" element={<MainLayout><BookingDetails /></MainLayout>} />
            <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
            <Route path="/users/:userId" element={<MainLayout><UserProfile /></MainLayout>} />
            <Route path="/slots" element={<MainLayout><Slots /></MainLayout>} />
            <Route path="/payments" element={<MainLayout><Payments /></MainLayout>} />
            <Route path="/reviews" element={<MainLayout><Reviews /></MainLayout>} />
            <Route path="/rewards" element={<MainLayout><Rewards /></MainLayout>} />
            <Route path="/staff" element={<MainLayout><Staff /></MainLayout>} />
            <Route path="/offers" element={<MainLayout><Offers /></MainLayout>} />
            <Route path="/inventory" element={<MainLayout><Inventory /></MainLayout>} />
            <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />
            <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
            <Route path="/team-requests" element={<MainLayout><TeamRequests /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          </>
        ) : (
          // If not authenticated, redirect to login
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
