import React, { useState } from 'react';

const Staff = () => {
  // Sample staff data - replace with API calls later
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Ground Staff',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      joinDate: '2024-01-15',
      status: 'Active',
      shift: 'Morning',
    },
    {
      id: 2,
      name: 'Suresh Patel',
      role: 'Maintenance',
      phone: '+91 98765 43211',
      email: 'suresh@example.com',
      joinDate: '2024-02-01',
      status: 'Active',
      shift: 'Evening',
    },
  ]);

  // Sample duty roster - replace with API calls later
  const [dutyRoster, setDutyRoster] = useState([
    {
      id: 1,
      staffId: 1,
      date: '2024-03-21',
      shift: 'Morning',
      duties: ['Field Preparation', 'Equipment Management'],
      status: 'Assigned',
    },
    {
      id: 2,
      staffId: 2,
      date: '2024-03-21',
      shift: 'Evening',
      duties: ['Ground Maintenance', 'Equipment Collection'],
      status: 'Assigned',
    },
  ]);

  // Sample attendance records - replace with API calls later
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      staffId: 1,
      date: '2024-03-21',
      status: 'Present',
      checkIn: '08:00 AM',
      checkOut: '04:00 PM',
      shift: 'Morning',
    },
    {
      id: 2,
      staffId: 2,
      date: '2024-03-21',
      status: 'Present',
      checkIn: '02:00 PM',
      checkOut: '10:00 PM',
      shift: 'Evening',
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    shift: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAssignDutyModal, setShowAssignDutyModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    shift: '',
  });

  const [newDuty, setNewDuty] = useState({
    staffId: '',
    date: '',
    shift: '',
    duties: [],
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const staffMember = {
      id: staff.length + 1,
      ...newStaff,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setStaff(prev => [...prev, staffMember]);
    setShowAddStaffModal(false);
    setNewStaff({
      name: '',
      role: '',
      phone: '',
      email: '',
      shift: '',
    });
  };

  const handleAssignDuty = (e) => {
    e.preventDefault();
    const duty = {
      id: dutyRoster.length + 1,
      ...newDuty,
      status: 'Assigned',
    };
    setDutyRoster(prev => [...prev, duty]);
    setShowAssignDutyModal(false);
    setNewDuty({
      staffId: '',
      date: '',
      shift: '',
      duties: [],
    });
  };

  const handleAttendanceUpdate = (staffId, status) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const existingAttendance = attendance.find(
      a => a.staffId === staffId && a.date === filters.date
    );

    if (existingAttendance) {
      setAttendance(prev =>
        prev.map(a =>
          a.id === existingAttendance.id
            ? { ...a, status, checkOut: time }
            : a
        )
      );
    } else {
      setAttendance(prev => [
        ...prev,
        {
          id: attendance.length + 1,
          staffId,
          date: filters.date,
          status,
          checkIn: time,
          checkOut: null,
          shift: staff.find(s => s.id === staffId)?.shift || '',
        },
      ]);
    }
  };

  const filteredStaff = staff.filter(member => {
    return (
      (filters.search === '' ||
        member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.phone.includes(filters.search)) &&
      (filters.role === '' || member.role === filters.role) &&
      (filters.status === '' || member.status === filters.status) &&
      (filters.shift === '' || member.shift === filters.shift)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage ground staff, duties, and attendance</p>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setShowAssignDutyModal(true)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Assign Duties
          </button>
          <button
            onClick={() => setShowAddStaffModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Add Staff
          </button>
        </div>
      </div>

      {/* Filters */}
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
            name="role"
            className="border rounded-lg px-3 py-2"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">All Roles</option>
            <option value="Ground Staff">Ground Staff</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            name="shift"
            className="border rounded-lg px-3 py-2"
            value={filters.shift}
            onChange={handleFilterChange}
          >
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          <input
            type="date"
            name="date"
            className="border rounded-lg px-3 py-2"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Staff List with Attendance */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Today's Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStaff.map((member) => {
              const todayAttendance = attendance.find(
                a => a.staffId === member.id && a.date === filters.date
              );
              return (
                <tr key={member.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.phone}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{member.shift}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${member.status === 'Active' ? 'bg-green-100 text-green-800' :
                        member.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {todayAttendance ? (
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${todayAttendance.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {todayAttendance.status}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          In: {todayAttendance.checkIn}
                          {todayAttendance.checkOut && ` | Out: ${todayAttendance.checkOut}`}
                        </div>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleAttendanceUpdate(member.id, 'Present')}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold"
                        >
                          Mark Present
                        </button>
                        <button
                          onClick={() => handleAttendanceUpdate(member.id, 'Absent')}
                          className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold"
                        >
                          Mark Absent
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowAssignDutyModal(true);
                      }}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Assign Duty
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Duty Roster */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b">Today's Duty Roster</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duties</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dutyRoster
              .filter(duty => duty.date === filters.date)
              .map((duty) => {
                const staffMember = staff.find(s => s.id === duty.staffId);
                return (
                  <tr key={duty.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {staffMember?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{duty.shift}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {duty.duties.map((task, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {duty.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Staff</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Ground Staff">Ground Staff</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shift</label>
                <select
                  value={newStaff.shift}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, shift: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Duty Modal */}
      {showAssignDutyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign Duty</h2>
            <form onSubmit={handleAssignDuty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff Member</label>
                <select
                  value={newDuty.staffId}
                  onChange={(e) => setNewDuty(prev => ({ ...prev, staffId: Number(e.target.value) }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Staff</option>
                  {staff.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newDuty.date}
                  onChange={(e) => setNewDuty(prev => ({ ...prev, date: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shift</label>
                <select
                  value={newDuty.shift}
                  onChange={(e) => setNewDuty(prev => ({ ...prev, shift: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duties</label>
                <div className="mt-2 space-y-2">
                  {['Field Preparation', 'Equipment Management', 'Ground Maintenance', 'Equipment Collection', 'Security'].map((duty) => (
                    <label key={duty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newDuty.duties.includes(duty)}
                        onChange={(e) => {
                          const duties = e.target.checked
                            ? [...newDuty.duties, duty]
                            : newDuty.duties.filter(d => d !== duty);
                          setNewDuty(prev => ({ ...prev, duties }));
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{duty}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignDutyModal(false);
                    setSelectedStaff(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Assign Duty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
