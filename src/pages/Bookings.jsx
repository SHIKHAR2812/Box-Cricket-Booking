import React, { useState, useEffect } from 'react';
import { getAllBookings } from '../utils/bookingApi';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings().then(setBookings);
  }, []);

  const [filters, setFilters] = useState({
    search: '',
    ground: '',
    status: '',
    date: '',
    bookingType: '',
  });

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    ground: '',
    teamSize: '',
    duration: '1',
    requirements: '',
  });

  const timeSlots = [
    '06:00-07:00',
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
    '20:00-21:00',
    '21:00-22:00',
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewBookingChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewBookingSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the booking
    const booking = {
      id: bookings.length + 1,
      ...newBooking,
      status: 'Pending',
      paymentStatus: 'Pending',
      amount: 1200, // Calculate based on duration and ground
      bookingType: 'Online',
    };

    setBookings(prev => [...prev, booking]);
    setShowNewBookingModal(false);
    setNewBooking({
      customerName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      ground: '',
      teamSize: '',
      duration: '1',
      requirements: '',
    });
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  const filteredBookings = bookings.filter(booking => {
    return (
      (filters.search === '' || 
        booking.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.phone.includes(filters.search)) &&
      (filters.ground === '' || booking.ground === filters.ground) &&
      (filters.status === '' || booking.status === filters.status) &&
      (filters.date === '' || booking.date === filters.date) &&
      (filters.bookingType === '' || booking.bookingType === filters.bookingType)
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage all your box cricket bookings</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowNewBookingModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            + New Online Booking
          </button>
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700">
            + Add Offline Booking
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search by name or phone"
            className="border rounded-lg px-3 py-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="ground"
            className="border rounded-lg px-3 py-2"
            value={filters.ground}
            onChange={handleFilterChange}
          >
            <option value="">All Grounds</option>
            <option value="Ground 1">Ground 1</option>
            <option value="Ground 2">Ground 2</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            name="date"
            className="border rounded-lg px-3 py-2"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <select
            name="bookingType"
            className="border rounded-lg px-3 py-2"
            value={filters.bookingType}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ground
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.ground}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">₹{booking.amount}</div>
                    <div className={`text-sm ${
                      booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${booking.bookingType === 'Online' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'}`}
                    >
                      {booking.bookingType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleReschedule(booking)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      Reschedule
                    </button>
                    {booking.status === 'Pending' && (
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Approve
                      </button>
                    )}
                    {booking.status !== 'Cancelled' && (
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      {showNewBookingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">New Online Booking</h2>
              <button
                onClick={() => setShowNewBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleNewBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.customerName}
                    onChange={handleNewBookingChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.phone}
                    onChange={handleNewBookingChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.email}
                    onChange={handleNewBookingChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size
                  </label>
                  <input
                    type="number"
                    name="teamSize"
                    min="2"
                    max="22"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.teamSize}
                    onChange={handleNewBookingChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.date}
                    onChange={handleNewBookingChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    name="time"
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.time}
                    onChange={handleNewBookingChange}
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ground
                  </label>
                  <select
                    name="ground"
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.ground}
                    onChange={handleNewBookingChange}
                  >
                    <option value="">Select Ground</option>
                    <option value="Ground 1">Ground 1</option>
                    <option value="Ground 2">Ground 2</option>
                    <option value="Ground 3">Ground 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <select
                    name="duration"
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newBooking.duration}
                    onChange={handleNewBookingChange}
                  >
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requirements
                </label>
                <textarea
                  name="requirements"
                  rows="3"
                  className="border rounded-lg px-3 py-2 w-full"
                  value={newBooking.requirements}
                  onChange={handleNewBookingChange}
                  placeholder="Any special requirements or notes..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Reschedule Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <select className="mt-1 block w-full border rounded-md px-3 py-2">
                  <option>18:00-19:00</option>
                  <option>19:00-20:00</option>
                  <option>20:00-21:00</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
