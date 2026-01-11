import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Payments = () => {
  // Sample data - replace with API calls later
  const [payments, setPayments] = useState([
    {
      id: 1,
      bookingId: 'BK001',
      customerName: 'John Doe',
      date: '2024-03-20',
      amount: 1200,
      paymentType: 'Online',
      paymentMethod: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN123456',
    },
    {
      id: 2,
      bookingId: 'BK002',
      customerName: 'Team Warriors',
      date: '2024-03-19',
      amount: 1200,
      paymentType: 'Offline',
      paymentMethod: 'Cash',
      status: 'Completed',
      transactionId: 'TXN123457',
    },
    {
      id: 3,
      bookingId: 'BK003',
      customerName: 'Sarah Smith',
      date: '2024-03-18',
      amount: 1500,
      paymentType: 'Online',
      paymentMethod: 'UPI',
      status: 'Refunded',
      transactionId: 'TXN123458',
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    dateRange: '',
    paymentType: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  // Analytics data - replace with API calls later
  const analytics = {
    totalRevenue: 45600,
    onlineRevenue: 32400,
    offlineRevenue: 13200,
    pendingAmount: 2400,
    refundedAmount: 3600,
    thisMonthRevenue: 15600,
    lastMonthRevenue: 30000,
    revenueByMethod: {
      'Credit Card': 18000,
      'UPI': 14400,
      'Cash': 13200,
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRefund = (paymentId) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === paymentId
          ? { ...payment, status: 'Refunded' }
          : payment
      )
    );
  };

  const filteredPayments = payments.filter(payment => {
    return (
      (filters.search === '' ||
        payment.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.paymentType === '' || payment.paymentType === filters.paymentType) &&
      (filters.status === '' || payment.status === filters.status)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments & Transactions</h1>
          <p className="text-gray-600 mt-1">Manage payments, refunds, and view analytics</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">₹{analytics.totalRevenue}</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">Online: ₹{analytics.onlineRevenue}</span>
            <span className="text-sm text-gray-500">Offline: ₹{analytics.offlineRevenue}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">₹{analytics.thisMonthRevenue}</p>
          <div className="flex items-center mt-2">
            {analytics.thisMonthRevenue > analytics.lastMonthRevenue ? (
              <span className="text-green-600 text-sm">↑ {((analytics.thisMonthRevenue - analytics.lastMonthRevenue) / analytics.lastMonthRevenue * 100).toFixed(1)}%</span>
            ) : (
              <span className="text-red-600 text-sm">↓ {((analytics.lastMonthRevenue - analytics.thisMonthRevenue) / analytics.lastMonthRevenue * 100).toFixed(1)}%</span>
            )}
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Payment Methods</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">3 Active</p>
          <div className="space-y-1 mt-2">
            {Object.entries(analytics.revenueByMethod).map(([method, amount]) => (
              <div key={method} className="flex justify-between text-sm">
                <span className="text-gray-500">{method}</span>
                <span className="text-gray-900">₹{amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending/Refunds</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">₹{analytics.pendingAmount}</p>
          <div className="mt-2">
            <div className="text-sm text-red-600">Refunded: ₹{analytics.refundedAmount}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search by name, booking ID or transaction ID"
            className="border rounded-lg px-3 py-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="paymentType"
            className="border rounded-lg px-3 py-2"
            value={filters.paymentType}
            onChange={handleFilterChange}
          >
            <option value="">All Payment Types</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="endDate"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                    <div className="text-sm text-gray-500">Booking ID: {payment.bookingId}</div>
                    <div className="text-sm text-gray-500">Transaction ID: {payment.transactionId}</div>
                    <div className="text-sm text-gray-500">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">₹{payment.amount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{payment.paymentType}</div>
                    <div className="text-sm text-gray-500">{payment.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        payment.status === 'Refunded' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/bookings/${payment.bookingId}`}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View Booking
                    </Link>
                    {payment.status === 'Completed' && (
                      <button
                        onClick={() => handleRefund(payment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Process Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
