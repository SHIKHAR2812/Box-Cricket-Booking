import React, { useState } from 'react';

const TeamRequests = () => {
  // Sample team requests data - replace with API calls later
  const [teamRequests, setTeamRequests] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      type: 'Looking for Team',
      preferredPosition: 'Batsman',
      experience: '3 years',
      availability: ['Weekends', 'Evening'],
      status: 'Pending',
      requestDate: '2024-03-20',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      age: 25,
      previousTeam: 'Warriors XI',
      description: 'Looking for a competitive team. Can play as opening batsman.',
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Team Eagles',
      type: 'Looking for Players',
      requiredPositions: ['Bowler', 'All-rounder'],
      teamSize: 12,
      playingLevel: 'Intermediate',
      status: 'Pending',
      requestDate: '2024-03-19',
      phone: '+91 98765 43211',
      email: 'eagles@example.com',
      matchFrequency: 'Weekly',
      description: 'Semi-professional team looking for fast bowlers and all-rounders.',
    },
  ]);

  // Sample suggested matches - replace with API calls later
  const [suggestedMatches, setSuggestedMatches] = useState([
    {
      id: 1,
      requestId: 1,
      matches: [
        {
          teamId: 'TM001',
          teamName: 'Royal Strikers',
          matchScore: 85,
          requirements: ['Batsman'],
          captain: 'Rahul Kumar',
          contact: '+91 98765 43212',
        },
        {
          teamId: 'TM002',
          teamName: 'Thunder Kings',
          matchScore: 75,
          requirements: ['Batsman', 'Wicket Keeper'],
          captain: 'Amit Shah',
          contact: '+91 98765 43213',
        },
      ],
    },
    {
      id: 2,
      requestId: 2,
      matches: [
        {
          userId: 'USR003',
          userName: 'Rajesh Patel',
          matchScore: 90,
          position: 'Bowler',
          experience: '5 years',
          contact: '+91 98765 43214',
        },
        {
          userId: 'USR004',
          userName: 'Suresh Kumar',
          matchScore: 80,
          position: 'All-rounder',
          experience: '4 years',
          contact: '+91 98765 43215',
        },
      ],
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    date: '',
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    setTeamRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const handleConnect = (requestId, matchId) => {
    // Here you would typically make an API call to connect the users
    handleStatusUpdate(requestId, 'Connected');
    setShowMatchModal(false);
  };

  const filteredRequests = teamRequests.filter(request => {
    return (
      (filters.search === '' ||
        request.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.phone.includes(filters.search)) &&
      (filters.type === '' || request.type === filters.type) &&
      (filters.status === '' || request.status === filters.status) &&
      (filters.date === '' || request.requestDate === filters.date)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Team & Matchmaking Requests</h1>
            <p className="text-gray-600 mt-1">Manage team formation and player connections</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by name or phone"
              className="border rounded-lg px-3 py-2"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select
              name="type"
              className="border rounded-lg px-3 py-2"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Looking for Team">Looking for Team</option>
              <option value="Looking for Players">Looking for Players</option>
            </select>
            <select
              name="status"
              className="border rounded-lg px-3 py-2"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Connected">Connected</option>
              <option value="Closed">Closed</option>
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

        {/* Requests List */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                      <div className="text-sm text-gray-500">{request.phone}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                      <div className="text-sm text-gray-500">Requested: {request.requestDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${request.type === 'Looking for Team' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.type === 'Looking for Team' ? (
                        <div>
                          <div className="text-sm text-gray-900">Position: {request.preferredPosition}</div>
                          <div className="text-sm text-gray-500">Experience: {request.experience}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.availability.map((time, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-gray-900">Team Size: {request.teamSize}</div>
                          <div className="text-sm text-gray-500">Level: {request.playingLevel}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.requiredPositions.map((position, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                              >
                                {position}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'Connected' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-y-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowMatchModal(true);
                        }}
                        className="block text-primary-600 hover:text-primary-900"
                      >
                        View Matches
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request.id, 'Closed')}
                        className="block text-red-600 hover:text-red-900"
                      >
                        Close Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Match Suggestions Modal */}
        {showMatchModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">Suggested Matches</h2>
                  <p className="text-gray-600">
                    For: {selectedRequest.userName} ({selectedRequest.type})
                  </p>
                </div>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedMatches
                  .find(sm => sm.requestId === selectedRequest.id)
                  ?.matches.map((match, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">
                            {match.teamName || match.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {match.captain ? `Captain: ${match.captain}` : `Position: ${match.position}`}
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {match.matchScore}% Match
                        </span>
                      </div>

                      {match.requirements ? (
                        <div className="flex flex-wrap gap-1">
                          {match.requirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Experience: {match.experience}
                        </div>
                      )}

                      <div className="text-sm text-gray-500">
                        Contact: {match.contact}
                      </div>

                      <button
                        onClick={() => handleConnect(selectedRequest.id, match.teamId || match.userId)}
                        className="mt-2 w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                      >
                        Connect
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRequests; 