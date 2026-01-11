// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Define all possible permissions
const ALL_PERMISSIONS = [
  'manage_staff',
  'manage_roles',
  'view_reports',
  'manage_bookings',
  'view_bookings',
  'manage_inventory',
  'update_inventory',
  'manage_settings',
  'manage_grounds',
  'view_grounds',
  'manage_offers',
  'view_offers',
  'manage_notifications',
  'send_notifications',
  'manage_payments',
  'view_payments',
  'manage_teams',
  'view_teams',
];

// Define role permissions
const rolePermissions = {
  // Super Admin gets all permissions
  superAdmin: ALL_PERMISSIONS,
  
  // Manager permissions
  manager: [
    'view_reports',
    'manage_bookings',
    'view_bookings',
    'manage_inventory',
    'update_inventory',
    'manage_grounds',
    'view_grounds',
    'manage_offers',
    'view_offers',
    'send_notifications',
    'view_payments',
    'view_teams',
  ],
  
  // Staff permissions
  staff: [
    'view_bookings',
    'update_inventory',
    'view_grounds',
    'view_offers',
    'view_teams',
  ],
};

// Sample user data - replace with API calls later
const sampleUsers = [
  {
    email: 'superadmin@boxcricket.com',
    password: 'super123',
    role: 'superAdmin',
    name: 'Super Admin',
  },
  {
    email: 'manager@boxcricket.com',
    password: 'manager123',
    role: 'manager',
    name: 'John Manager',
  },
  {
    email: 'staff@boxcricket.com',
    password: 'staff123',
    role: 'staff',
    name: 'Staff Member',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Here you would typically make an API call to your backend
    const foundUser = sampleUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        permissions: rolePermissions[foundUser.role],
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }

    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    // Super Admin always has access to everything
    if (user.role === 'superAdmin') return true;
    // For other roles, check specific permissions
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
    loading,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hook for permission checking
export const usePermission = (permission) => {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
};
