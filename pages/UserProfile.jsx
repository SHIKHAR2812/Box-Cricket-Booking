import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sample data - replace with API calls later
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  // Sample users data - replace with API calls later
  const sampleUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      type: 'Player',
      status: 'Active',
      joinedDate: '2024-01-15',
      totalBookings: 12,
      address: '123 Main St, City',
      preferredGround: 'Ground 1',
      totalSpent: 14400,
    },
    {
      id: 2,
      name: 'Team Warriors',
      email: 'warriors@example.com',
      phone: '+91 98765 43211',
      type: 'Team',
      status: 'Blocked',
      joinedDate: '2024-02-01',
      totalBookings: 8,
      address: '456 Sports Complex, City',
      preferredGround: 'Ground 2',
      totalSpent: 9600,
    },
  ];

  // Sample booking history - replace with API calls later
  const sampleBookings = {
    1: [
      {
        id: 1,
        date: '2024-03-20',
        time: '18:00-19:00',
        ground: 'Ground 1',
        status: 'Completed',
        amount: 1200,
        paymentStatus: 'Paid',
      },
      {
        id: 2,
        date: '2024-03-15',
        time: '19:00-20:00',
        ground: 'Ground 2',
        status: 'Cancelled',
        amount: 1200,
        paymentStatus: 'Refunded',
      },
    ],
    2: [
      {
        id: 3,
        date: '2024-03-18',
        time: '17:00-18:00',
        ground: 'Ground 2',
        status: 'Completed',
        amount: 1200,
        paymentStatus: 'Paid',
      },
    ],
  };

  useEffect(() => {
    const fetchUserData = () => {
      setLoading(true);
      try {
        // Find user in sample data
        const foundUser = sampleUsers.find(u => u.id === parseInt(userId));
        if (!foundUser) {
          setError('User not found');
          return;
        }
        
        setUser(foundUser);
        // Get booking history for user
        setBookingHistory(sampleBookings[userId] || []);
      } catch (err) {
        setError('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/users')}
            className="text-primary-600 hover:text-primary-900 flex items-center justify-center"
          >
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The requested user could not be found.</p>
          <button
            onClick={() => navigate('/users')}
            className="text-primary-600 hover:text-primary-900 flex items-center justify-center"
          >
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  const toggleUserStatus = () => {
    setUser(prev => ({
      ...prev,
      status: prev.status === 'Active' ? 'Blocked' : 'Active'
    }));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/users')}
        className="mb-6 text-primary-600 hover:text-primary-900 flex items-center"
      >
        ← Back to Users
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Details Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
                ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {user.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">{user.address}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Type</label>
                <p className="font-medium">{user.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Joined Date</label>
                <p className="font-medium">{user.joinedDate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Preferred Ground</label>
                <p className="font-medium">{user.preferredGround}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Spent</label>
                <p className="font-medium">₹{user.totalSpent}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={toggleUserStatus}
                className={`w-full py-2 px-4 rounded-lg ${
                  user.status === 'Active'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {user.status === 'Active' ? 'Block User' : 'Unblock User'}
              </button>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Booking History</h2>
              <p className="text-gray-600 mt-1">Total {bookingHistory.length} bookings</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ground
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookingHistory.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.date}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {booking.ground}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">₹{booking.amount}</div>
                        <div className="text-sm text-gray-500">{booking.paymentStatus}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 