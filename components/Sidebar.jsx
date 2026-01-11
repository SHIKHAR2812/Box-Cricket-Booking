// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: '📊',
      permissions: ['view_reports'],
    },
    {
      path: '/bookings',
      name: 'Bookings',
      icon: '📅',
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/users',
      name: 'Users',
      icon: '👥',
      permissions: ['manage_staff'],
    },
    {
      path: '/slots',
      name: 'Slots',
      icon: '⏰',
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/payments',
      name: 'Payments',
      icon: '💰',
      permissions: ['manage_payments', 'view_payments'],
    },
    {
      path: '/reviews',
      name: 'Reviews',
      icon: '⭐',
      permissions: ['view_reports'],
    },
    {
      path: '/rewards',
      name: 'Rewards',
      icon: '🎁',
      permissions: ['manage_offers'],
    },
    {
      path: '/staff',
      name: 'Staff',
      icon: '👤',
      permissions: ['manage_staff'],
    },
    {
      path: '/team-requests',
      name: 'Team Requests',
      icon: '🤝',
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/offers',
      name: 'Offers',
      icon: '🏷️',
      permissions: ['manage_offers', 'view_offers'],
    },
    {
      path: '/inventory',
      name: 'Inventory',
      icon: '🏏',
      permissions: ['manage_inventory', 'update_inventory'],
    },
    {
      path: '/calendar',
      name: 'Calendar',
      icon: '📆',
      permissions: ['manage_bookings', 'view_bookings'],
    },
    {
      path: '/notifications',
      name: 'Notifications',
      icon: '🔔',
      permissions: ['manage_notifications', 'send_notifications'],
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: '⚙️',
      permissions: ['manage_settings'],
    },
  ];

  // Filter menu items based on user permissions
  const authorizedMenuItems = menuItems.filter(item =>
    item.permissions.some(permission => hasPermission(permission))
  );

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-primary-600">Box Cricket Admin</h1>
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.role}</div>
        </div>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {authorizedMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${
                    isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded"
        >
          <span className="mr-3">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
