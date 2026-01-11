import React, { useState } from 'react';

const Offers = () => {
  // Sample data - replace with API calls later
  const [promos, setPromos] = useState([
    {
      id: 1,
      code: 'WELCOME2024',
      type: 'Percentage',
      value: 20,
      minBookingAmount: 1000,
      maxDiscount: 500,
      validFrom: '2024-03-01',
      validUntil: '2024-04-30',
      usageLimit: 100,
      usedCount: 45,
      status: 'Active',
      description: 'Welcome offer for new users',
      createdAt: '2024-02-28',
      lastUsed: '2024-03-20',
    },
    {
      id: 2,
      code: 'WEEKEND50',
      type: 'Fixed',
      value: 500,
      minBookingAmount: 2000,
      maxDiscount: 500,
      validFrom: '2024-03-15',
      validUntil: '2024-03-31',
      usageLimit: 50,
      usedCount: 32,
      status: 'Active',
      description: 'Weekend special discount',
      createdAt: '2024-03-14',
      lastUsed: '2024-03-19',
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPromo, setNewPromo] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    minBookingAmount: '',
    maxDiscount: '',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    description: '',
  });

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewPromoChange = (e) => {
    const { name, value } = e.target;
    setNewPromo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatePromo = () => {
    const newId = Math.max(...promos.map(p => p.id)) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newPromoCode = {
      ...newPromo,
      id: newId,
      status: 'Active',
      usedCount: 0,
      createdAt: currentDate,
      lastUsed: null,
    };

    setPromos(prev => [...prev, newPromoCode]);
    setShowCreateModal(false);
    setNewPromo({
      code: '',
      type: 'Percentage',
      value: '',
      minBookingAmount: '',
      maxDiscount: '',
      validFrom: '',
      validUntil: '',
      usageLimit: '',
      description: '',
    });
  };

  const handleStatusToggle = (id) => {
    setPromos(prev =>
      prev.map(promo =>
        promo.id === id
          ? { ...promo, status: promo.status === 'Active' ? 'Inactive' : 'Active' }
          : promo
      )
    );
  };

  const filteredPromos = promos.filter(promo => {
    return (
      (filters.search === '' ||
        promo.code.toLowerCase().includes(filters.search.toLowerCase()) ||
        promo.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === '' || promo.status === filters.status) &&
      (filters.type === '' || promo.type === filters.type)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Offers & Discounts</h1>
            <p className="text-gray-600 mt-1">Manage promo codes and track their usage</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Create New Promo
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by code or description"
              className="border rounded-lg px-3 py-2"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select
              name="status"
              className="border rounded-lg px-3 py-2"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              name="type"
              className="border rounded-lg px-3 py-2"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
        </div>

        {/* Promos List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code & Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPromos.map((promo) => (
                  <tr key={promo.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{promo.code}</div>
                      <div className="text-sm text-gray-500">{promo.description}</div>
                      <div className="text-xs text-gray-400">Created: {promo.createdAt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {promo.type === 'Percentage' ? `${promo.value}%` : `₹${promo.value}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: ₹{promo.minBookingAmount}
                      </div>
                      <div className="text-xs text-gray-500">
                        Max: ₹{promo.maxDiscount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        From: {promo.validFrom}
                      </div>
                      <div className="text-sm text-gray-900">
                        Until: {promo.validUntil}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {promo.usedCount} / {promo.usageLimit}
                      </div>
                      {promo.lastUsed && (
                        <div className="text-xs text-gray-500">
                          Last used: {promo.lastUsed}
                        </div>
                      )}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${promo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleStatusToggle(promo.id)}
                        className={`text-sm ${
                          promo.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Promo Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Create New Promo Code</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.code}
                    onChange={handleNewPromoChange}
                    placeholder="e.g., SUMMER2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.type}
                    onChange={handleNewPromoChange}
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.value}
                    onChange={handleNewPromoChange}
                    placeholder={newPromo.type === 'Percentage' ? 'e.g., 20' : 'e.g., 500'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Booking Amount
                  </label>
                  <input
                    type="number"
                    name="minBookingAmount"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.minBookingAmount}
                    onChange={handleNewPromoChange}
                    placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Discount
                  </label>
                  <input
                    type="number"
                    name="maxDiscount"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.maxDiscount}
                    onChange={handleNewPromoChange}
                    placeholder="e.g., 500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    name="usageLimit"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.usageLimit}
                    onChange={handleNewPromoChange}
                    placeholder="e.g., 100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid From
                  </label>
                  <input
                    type="date"
                    name="validFrom"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.validFrom}
                    onChange={handleNewPromoChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    name="validUntil"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.validUntil}
                    onChange={handleNewPromoChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="2"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={newPromo.description}
                    onChange={handleNewPromoChange}
                    placeholder="Enter promo description"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePromo}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Create Promo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
