// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="flex justify-between">
        <div className="text-xl">Box Cricket Booking Admin</div>
        <div>Admin</div>
      </div>
    </nav>
  );
};

export default Navbar;
