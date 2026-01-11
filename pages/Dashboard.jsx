import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Total Bookings</h2>
          <p>Today: <strong>12</strong></p>
          <p>Weekly: <strong>87</strong></p>
          <p>Monthly: <strong>342</strong></p>
        </div>

        {/* Revenue Summary */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Revenue Summary</h2>
          <p>Today: <strong>₹1,200</strong></p>
          <p>Weekly: <strong>₹9,000</strong></p>
          <p>Monthly: <strong>₹38,000</strong></p>
        </div>

        {/* Ground Availability */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Ground Availability</h2>
          <p>Ground 1: <span className="text-green-500 font-medium">Available</span></p>
          <p>Ground 2: <span className="text-red-500 font-medium">Booked</span></p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Bookings</h2>
        <ul className="space-y-3">
          <li className="border-b pb-2">
            <strong>John Doe</strong> - 7:00 PM - Ground 1
          </li>
          <li className="border-b pb-2">
            <strong>Rahul Mehta</strong> - 8:30 PM - Ground 2
          </li>
        </ul>
      </div>

      {/* Active Users */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Active Users</h2>
        <p>Currently Logged In: <strong>15</strong></p>
        <p>In Booking Process: <strong>3</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;
