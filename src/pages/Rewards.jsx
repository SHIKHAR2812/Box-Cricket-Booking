import React, { useState } from 'react';

const Rewards = () => {
  // Sample rewards data - replace with API calls later
  const [rewards, setRewards] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      totalPoints: 1500,
      availablePoints: 1000,
      redeemedPoints: 500,
      referralCount: 3,
      referralPoints: 300,
      lastActivity: '2024-03-20',
      tier: 'Gold',
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Team Warriors',
      totalPoints: 800,
      availablePoints: 800,
      redeemedPoints: 0,
      referralCount: 1,
      referralPoints: 100,
      lastActivity: '2024-03-19',
      tier: 'Silver',
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Sarah Smith',
      totalPoints: 2500,
      availablePoints: 1200,
      redeemedPoints: 1300,
      referralCount: 5,
      referralPoints: 500,
      lastActivity: '2024-03-18',
      tier: 'Platinum',
    }
  ]);

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: '10% Off Booking',
      pointsCost: 500,
      discountValue: 10,
      type: 'percentage',
      minBookingAmount: 1000,
      validity: 30, // days
      active: true,
    },
    {
      id: 2,
      name: '₹200 Flat Discount',
      pointsCost: 400,
      discountValue: 200,
      type: 'fixed',
      minBookingAmount: 800,
      validity: 15, // days
      active: true,
    },
    {
      id: 3,
      name: 'Free Equipment Rental',
      pointsCost: 300,
      discountValue: 100,
      type: 'service',
      minBookingAmount: 0,
      validity: 7, // days
      active: true,
    }
  ]);

  const [redemptionHistory, setRedemptionHistory] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      discountName: '10% Off Booking',
      pointsUsed: 500,
      redeemedDate: '2024-03-15',
      status: 'Used',
      bookingId: 'BK001',
    },
    {
      id: 2,
      userId: 'USR003',
      userName: 'Sarah Smith',
      discountName: '₹200 Flat Discount',
      pointsUsed: 400,
      redeemedDate: '2024-03-10',
      status: 'Expired',
      bookingId: null,
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    tier: '',
    dateRange: '',
  });

  const [newDiscount, setNewDiscount] = useState({
    name: '',
    pointsCost: '',
    discountValue: '',
    type: 'percentage',
    minBookingAmount: '',
    validity: 30,
    active: true,
  });

  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);

  // Analytics calculations
  const analytics = {
    totalUsers: rewards.length,
    totalPointsIssued: rewards.reduce((sum, user) => sum + user.totalPoints, 0),
    totalPointsRedeemed: rewards.reduce((sum, user) => sum + user.redeemedPoints, 0),
    totalReferrals: rewards.reduce((sum, user) => sum + user.referralCount, 0),
    tierDistribution: {
      Platinum: rewards.filter(user => user.tier === 'Platinum').length,
      Gold: rewards.filter(user => user.tier === 'Gold').length,
      Silver: rewards.filter(user => user.tier === 'Silver').length,
    },
    activeDiscounts: discounts.filter(discount => discount.active).length,
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewDiscountChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDiscount = () => {
    if (!newDiscount.name || !newDiscount.pointsCost) return;

    const newDiscountData = {
      id: discounts.length + 1,
      ...newDiscount,
    };

    setDiscounts(prev => [...prev, newDiscountData]);
    setNewDiscount({
      name: '',
      pointsCost: '',
      discountValue: '',
      type: 'percentage',
      minBookingAmount: '',
      validity: 30,
      active: true,
    });
    setShowAddDiscountModal(false);
  };

  const handleDiscountStatusChange = (discountId) => {
    setDiscounts(prev =>
      prev.map(discount =>
        discount.id === discountId
          ? { ...discount, active: !discount.active }
          : discount
      )
    );
  };

  const filteredRewards = rewards.filter(user => {
    return (
      (filters.search === '' ||
        user.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.userId.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.tier === '' || user.tier === filters.tier)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rewards & Loyalty</h1>
          <p className="text-gray-600 mt-1">Manage customer rewards, points, and referrals</p>
        </div>
        <button
          onClick={() => setShowAddDiscountModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add New Discount
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Points Issued</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.totalPointsIssued}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Points Redeemed</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">{analytics.totalPointsRedeemed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{analytics.totalReferrals}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Discounts</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">{analytics.activeDiscounts}</p>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Tier Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(analytics.tierDistribution).map(([tier, count]) => (
            <div key={tier} className="text-center">
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{tier}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search users"
            className="border rounded-lg px-3 py-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="tier"
            className="border rounded-lg px-3 py-2"
            value={filters.tier}
            onChange={handleFilterChange}
          >
            <option value="">All Tiers</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
          <input
            type="date"
            name="dateRange"
            className="border rounded-lg px-3 py-2"
            value={filters.dateRange}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <h3 className="text-lg font-medium p-4 border-b">Users & Points</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRewards.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                  <div className="text-sm text-gray-500">{user.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Available: {user.availablePoints}</div>
                  <div className="text-sm text-gray-500">Total Earned: {user.totalPoints}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.referralCount} referrals</div>
                  <div className="text-sm text-gray-500">{user.referralPoints} points earned</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                      user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                    {user.tier}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Available Discounts */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <h3 className="text-lg font-medium p-4 border-b">Available Discounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {discounts.map((discount) => (
            <div key={discount.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{discount.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {discount.type === 'percentage' ? `${discount.discountValue}% off` :
                      discount.type === 'fixed' ? `₹${discount.discountValue} off` :
                        'Service discount'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={discount.active}
                    onChange={() => handleDiscountStatusChange(discount.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-600">Points Required: {discount.pointsCost}</div>
                {discount.minBookingAmount > 0 && (
                  <div className="text-sm text-gray-600">Min. Booking: ₹{discount.minBookingAmount}</div>
                )}
                <div className="text-sm text-gray-600">Valid for {discount.validity} days</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b">Recent Redemptions</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {redemptionHistory.map((redemption) => (
              <tr key={redemption.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{redemption.userName}</div>
                  <div className="text-sm text-gray-500">{redemption.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {redemption.discountName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {redemption.pointsUsed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {redemption.redeemedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${redemption.status === 'Used' ? 'bg-green-100 text-green-800' :
                      redemption.status === 'Expired' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {redemption.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Discount Modal */}
      {showAddDiscountModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Discount</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newDiscount.name}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={newDiscount.type}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="service">Service Discount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {newDiscount.type === 'percentage' ? 'Discount Percentage' :
                    newDiscount.type === 'fixed' ? 'Discount Amount' :
                      'Service Value'}
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={newDiscount.discountValue}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Points Required</label>
                <input
                  type="number"
                  name="pointsCost"
                  value={newDiscount.pointsCost}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Booking Amount</label>
                <input
                  type="number"
                  name="minBookingAmount"
                  value={newDiscount.minBookingAmount}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Validity (days)</label>
                <input
                  type="number"
                  name="validity"
                  value={newDiscount.validity}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddDiscountModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDiscount}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Add Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
