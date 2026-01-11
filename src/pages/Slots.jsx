import React, { useState } from 'react';

const initialSlots = [
  { id: 1, time: '06:00-08:00', type: 'Morning', price: 800, available: true },
  { id: 2, time: '08:00-10:00', type: 'Morning', price: 900, available: true },
  { id: 3, time: '17:00-19:00', type: 'Evening', price: 1200, available: true },
  { id: 4, time: '19:00-21:00', type: 'Night', price: 1500, available: false },
];

const Slots = () => {
  const [slots, setSlots] = useState(initialSlots);
  const [newSlot, setNewSlot] = useState({ time: '', type: '', price: '', available: true });

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setNewSlot((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.time || !newSlot.type || !newSlot.price) return;
    setSlots((prev) => [
      ...prev,
      { ...newSlot, id: Date.now(), price: Number(newSlot.price) },
    ]);
    setNewSlot({ time: '', type: '', price: '', available: true });
  };

  const toggleAvailability = (id) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Slot Management</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Slot</h2>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={handleAddSlot}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 06:00-08:00"
              className="border rounded-lg px-3 py-2 w-full"
              value={newSlot.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              className="border rounded-lg px-3 py-2 w-full"
              value={newSlot.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (per hour)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 1200"
              className="border rounded-lg px-3 py-2 w-full"
              value={newSlot.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={newSlot.available}
              onChange={handleInputChange}
            />
            <label className="text-sm">Available</label>
            <button
              type="submit"
              className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Add Slot
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td className="px-6 py-4 whitespace-nowrap">{slot.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{slot.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{slot.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {slot.available ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Maintenance
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleAvailability(slot.id)}
                    className={`px-3 py-1 rounded text-xs font-medium ${slot.available ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {slot.available ? 'Mark as Maintenance' : 'Mark as Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Slots;
