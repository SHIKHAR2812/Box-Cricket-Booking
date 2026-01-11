import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const Calendar = () => {
  // Sample booking data - replace with API calls later
  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: 'Team Warriors vs Eagles',
      start: '2024-03-20T10:00:00',
      end: '2024-03-20T12:00:00',
      extendedProps: {
        status: 'confirmed',
        teamSize: 12,
        groundNumber: 'G1',
        bookingType: 'match',
        customerName: 'John Doe',
        customerPhone: '+91 98765 43210',
      },
      backgroundColor: '#10B981', // green for confirmed
      borderColor: '#059669',
    },
    {
      id: 2,
      title: 'Practice Session - Thunder Kings',
      start: '2024-03-21T14:00:00',
      end: '2024-03-21T16:00:00',
      extendedProps: {
        status: 'pending',
        teamSize: 8,
        groundNumber: 'G2',
        bookingType: 'practice',
        customerName: 'Rahul Kumar',
        customerPhone: '+91 98765 43211',
      },
      backgroundColor: '#F59E0B', // yellow for pending
      borderColor: '#D97706',
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowEventModal(true);
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    
    // Here you would typically make an API call to update the booking
    setBookings(prev => prev.map(booking => 
      booking.id === parseInt(event.id) 
        ? {
            ...booking,
            start: event.start,
            end: event.end,
          }
        : booking
    ));
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent({
      start: selectInfo.start,
      end: selectInfo.end,
      extendedProps: {
        status: 'pending',
        teamSize: '',
        groundNumber: '',
        bookingType: 'match',
        customerName: '',
        customerPhone: '',
      },
    });
    setShowEventModal(true);
  };

  const handleEventChange = (field, value) => {
    setSelectedEvent(prev => ({
      ...prev,
      extendedProps: {
        ...prev.extendedProps,
        [field]: value,
      },
    }));
  };

  const handleSaveEvent = () => {
    // Here you would typically make an API call to save the booking
    if (selectedEvent.id) {
      // Update existing booking
      setBookings(prev => prev.map(booking =>
        booking.id === selectedEvent.id
          ? { ...booking, ...selectedEvent }
          : booking
      ));
    } else {
      // Create new booking
      const newBooking = {
        ...selectedEvent,
        id: Math.max(...bookings.map(b => b.id)) + 1,
        title: `${selectedEvent.extendedProps.bookingType === 'match' ? 'Match' : 'Practice'} - ${selectedEvent.extendedProps.customerName}`,
        backgroundColor: selectedEvent.extendedProps.status === 'confirmed' ? '#10B981' : '#F59E0B',
        borderColor: selectedEvent.extendedProps.status === 'confirmed' ? '#059669' : '#D97706',
      };
      setBookings(prev => [...prev, newBooking]);
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent.id) {
      // Here you would typically make an API call to delete the booking
      setBookings(prev => prev.filter(booking => booking.id !== selectedEvent.id));
    }
    setShowEventModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Booking Calendar</h1>
            <p className="text-gray-600 mt-1">Manage and track all bookings</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={bookings}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            select={handleDateSelect}
            height="auto"
          />
        </div>

        {/* Booking Details Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">
                  {selectedEvent.id ? 'Edit Booking' : 'New Booking'}
                </h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.customerName}
                    onChange={(e) => handleEventChange('customerName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.customerPhone}
                    onChange={(e) => handleEventChange('customerPhone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Type
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.bookingType}
                    onChange={(e) => handleEventChange('bookingType', e.target.value)}
                  >
                    <option value="match">Match</option>
                    <option value="practice">Practice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ground Number
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.groundNumber}
                    onChange={(e) => handleEventChange('groundNumber', e.target.value)}
                  >
                    <option value="G1">Ground 1</option>
                    <option value="G2">Ground 2</option>
                    <option value="G3">Ground 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size
                  </label>
                  <input
                    type="number"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.teamSize}
                    onChange={(e) => handleEventChange('teamSize', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 w-full"
                    value={selectedEvent.extendedProps.status}
                    onChange={(e) => handleEventChange('status', e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedEvent.id && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 border rounded-lg text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;


