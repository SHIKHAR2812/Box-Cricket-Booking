// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
