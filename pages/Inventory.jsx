import React, { useState } from 'react';

const Inventory = () => {
  // Sample inventory data - replace with API calls later
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'MRF Cricket Bat',
      category: 'Bats',
      condition: 'Good',
      status: 'Available',
      quantity: 5,
      lastIssued: null,
      issuedTo: null,
      addedDate: '2024-03-01',
    },
    {
      id: 2,
      name: 'SG Test Cricket Ball',
      category: 'Balls',
      condition: 'Good',
      status: 'Available',
      quantity: 12,
      lastIssued: null,
      issuedTo: null,
      addedDate: '2024-03-01',
    },
    {
      id: 3,
      name: 'SS Batting Pads',
      category: 'Pads',
      condition: 'Damaged',
      status: 'Under Repair',
      quantity: 2,
      lastIssued: '2024-03-15',
      issuedTo: null,
      addedDate: '2024-02-15',
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    condition: '',
  });

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 1,
    condition: 'Good',
  });

  const [showAddModal, setShowAddModal] = useState(false);

  // Analytics calculations
  const analytics = {
    totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
    availableItems: inventory.filter(item => item.status === 'Available').reduce((sum, item) => sum + item.quantity, 0),
    damagedItems: inventory.filter(item => item.condition === 'Damaged').reduce((sum, item) => sum + item.quantity, 0),
    issuedItems: inventory.filter(item => item.status === 'Issued').reduce((sum, item) => sum + item.quantity, 0),
    categories: {
      Bats: inventory.filter(item => item.category === 'Bats').reduce((sum, item) => sum + item.quantity, 0),
      Balls: inventory.filter(item => item.category === 'Balls').reduce((sum, item) => sum + item.quantity, 0),
      Pads: inventory.filter(item => item.category === 'Pads').reduce((sum, item) => sum + item.quantity, 0),
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) return;

    const newItemData = {
      id: inventory.length + 1,
      ...newItem,
      status: 'Available',
      lastIssued: null,
      issuedTo: null,
      addedDate: new Date().toISOString().split('T')[0],
    };

    setInventory(prev => [...prev, newItemData]);
    setNewItem({
      name: '',
      category: '',
      quantity: 1,
      condition: 'Good',
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (itemId, newStatus) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  const handleConditionChange = (itemId, newCondition) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, condition: newCondition }
          : item
      )
    );
  };

  const handleQuantityChange = (itemId, change) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const filteredInventory = inventory.filter(item => {
    return (
      (filters.search === '' ||
        item.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === '' || item.category === filters.category) &&
      (filters.status === '' || item.status === filters.status) &&
      (filters.condition === '' || item.condition === filters.condition)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cricket Kit Inventory</h1>
          <p className="text-gray-600 mt-1">Manage cricket equipment and track availability</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add New Item
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.totalItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Available Items</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{analytics.availableItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Issued Items</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">{analytics.issuedItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Damaged Items</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">{analytics.damagedItems}</p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Category Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(analytics.categories).map(([category, count]) => (
            <div key={category} className="text-center">
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search items"
            className="border rounded-lg px-3 py-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="category"
            className="border rounded-lg px-3 py-2"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="Bats">Bats</option>
            <option value="Balls">Balls</option>
            <option value="Pads">Pads</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
            <option value="Under Repair">Under Repair</option>
          </select>
          <select
            name="condition"
            className="border rounded-lg px-3 py-2"
            value={filters.condition}
            onChange={handleFilterChange}
          >
            <option value="">All Conditions</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">Added: {item.addedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="Available">Available</option>
                    <option value="Issued">Issued</option>
                    <option value="Under Repair">Under Repair</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={item.condition}
                    onChange={(e) => handleConditionChange(item.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setInventory(prev => prev.filter(i => i.id !== item.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Category</option>
                  <option value="Bats">Bats</option>
                  <option value="Balls">Balls</option>
                  <option value="Pads">Pads</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleNewItemChange}
                  min="1"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <select
                  name="condition"
                  value={newItem.condition}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
