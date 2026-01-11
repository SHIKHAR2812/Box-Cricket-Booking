import React, { useState } from 'react';

const Notifications = () => {
  // Sample notification templates - replace with API calls later
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Booking Confirmation',
      type: 'booking',
      channels: ['email', 'sms', 'push'],
      subject: 'Booking Confirmed: {booking_id}',
      content: `Dear {customer_name},

Your booking has been confirmed!
Booking ID: {booking_id}
Date: {booking_date}
Time: {booking_time}
Ground: {ground_name}

Thank you for choosing us!`,
      active: true,
    },
    {
      id: 2,
      name: 'Low Slot Availability',
      type: 'alert',
      channels: ['email', 'push'],
      subject: 'Low Slot Availability Alert',
      content: 'Slots for {ground_name} on {date} are {percentage}% booked. Consider adding more slots.',
      active: true,
    },
    {
      id: 3,
      name: 'Maintenance Schedule',
      type: 'maintenance',
      channels: ['email', 'sms'],
      subject: 'Maintenance Scheduled: {ground_name}',
      content: 'Maintenance work scheduled for {ground_name} on {date} from {start_time} to {end_time}.',
      active: true,
    }
  ]);

  // Sample notification history - replace with API calls later
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      templateId: 1,
      type: 'booking',
      recipient: 'John Doe',
      channels: ['email', 'sms'],
      sentAt: '2024-03-20 14:30:00',
      status: 'Delivered',
      bookingId: 'BK001',
    },
    {
      id: 2,
      templateId: 2,
      type: 'alert',
      recipient: 'Admin Team',
      channels: ['email'],
      sentAt: '2024-03-20 10:15:00',
      status: 'Delivered',
      groundName: 'Ground A',
    },
    {
      id: 3,
      templateId: 3,
      type: 'maintenance',
      recipient: 'Staff Team',
      channels: ['email', 'sms'],
      sentAt: '2024-03-19 16:45:00',
      status: 'Failed',
      groundName: 'Ground B',
    }
  ]);

  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      provider: 'SMTP',
      fromEmail: 'notifications@bcb.com',
      fromName: 'BCB Admin',
    },
    sms: {
      enabled: true,
      provider: 'Twilio',
      fromNumber: '+1234567890',
    },
    push: {
      enabled: true,
      provider: 'Firebase',
      appId: 'bcb-admin-app',
    },
    alerts: {
      lowAvailabilityThreshold: 80, // percentage
      maintenanceAdvanceNotice: 24, // hours
      sendReminders: true,
      reminderInterval: 1, // hours
    }
  });

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    dateRange: '',
  });

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Analytics calculations
  const analytics = {
    totalSent: notificationHistory.length,
    deliveryRate: (notificationHistory.filter(n => n.status === 'Delivered').length / notificationHistory.length * 100).toFixed(1),
    channelDistribution: {
      email: notificationHistory.filter(n => n.channels.includes('email')).length,
      sms: notificationHistory.filter(n => n.channels.includes('sms')).length,
      push: notificationHistory.filter(n => n.channels.includes('push')).length,
    },
    typeDistribution: {
      booking: notificationHistory.filter(n => n.type === 'booking').length,
      alert: notificationHistory.filter(n => n.type === 'alert').length,
      maintenance: notificationHistory.filter(n => n.type === 'maintenance').length,
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleTemplateStatusChange = (templateId) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, active: !template.active }
          : template
      )
    );
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowTemplateModal(true);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate.id) {
      setTemplates(prev =>
        prev.map(template =>
          template.id === editingTemplate.id
            ? editingTemplate
            : template
        )
      );
    } else {
      setTemplates(prev => [...prev, { ...editingTemplate, id: prev.length + 1 }]);
    }
    setShowTemplateModal(false);
    setEditingTemplate(null);
  };

  const filteredHistory = notificationHistory.filter(notification => {
    return (
      (filters.search === '' ||
        notification.recipient.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.type === '' || notification.type === filters.type) &&
      (filters.status === '' || notification.status === filters.status)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage notifications, templates, and delivery settings</p>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Settings
          </button>
          <button
            onClick={() => {
              setEditingTemplate({
                name: '',
                type: 'booking',
                channels: [],
                subject: '',
                content: '',
                active: true,
              });
              setShowTemplateModal(true);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Add Template
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Notifications</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.totalSent}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Delivery Rate</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{analytics.deliveryRate}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Templates</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {templates.filter(t => t.active).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Channels Active</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {Object.entries(settings).filter(([_, config]) => config.enabled).length}
          </p>
        </div>
      </div>

      {/* Channel Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Channel Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(analytics.channelDistribution).map(([channel, count]) => (
            <div key={channel} className="text-center">
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500 capitalize">{channel}</div>
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
            placeholder="Search notifications"
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
            <option value="booking">Booking</option>
            <option value="alert">Alert</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
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

      {/* Templates List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <h3 className="text-lg font-medium p-4 border-b">Notification Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-500 mt-1 capitalize">{template.type}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={template.active}
                    onChange={() => handleTemplateStatusChange(template.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {template.channels.map(channel => (
                    <span
                      key={channel}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600">{template.subject}</div>
              </div>
              <button
                onClick={() => handleEditTemplate(template)}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700"
              >
                Edit Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b">Notification History</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHistory.map((notification) => (
              <tr key={notification.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{notification.recipient}</div>
                  <div className="text-sm text-gray-500">
                    {notification.bookingId || notification.groundName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize text-sm text-gray-900">{notification.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {notification.channels.map(channel => (
                      <span
                        key={channel}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {notification.sentAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${notification.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      notification.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {notification.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Template Modal */}
      {showTemplateModal && editingTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingTemplate.id ? 'Edit Template' : 'New Template'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Template Name</label>
                <input
                  type="text"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={editingTemplate.type}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, type: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                >
                  <option value="booking">Booking</option>
                  <option value="alert">Alert</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Channels</label>
                <div className="mt-2 space-x-4">
                  {['email', 'sms', 'push'].map(channel => (
                    <label key={channel} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={editingTemplate.channels.includes(channel)}
                        onChange={(e) => {
                          const channels = e.target.checked
                            ? [...editingTemplate.channels, channel]
                            : editingTemplate.channels.filter(c => c !== channel);
                          setEditingTemplate(prev => ({ ...prev, channels }));
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Available variables: {'{customer_name}'}, {'{booking_id}'}, {'{booking_date}'}, {'{booking_time}'}, {'{ground_name}'}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setEditingTemplate(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
            <div className="space-y-6">
              {/* Email Settings */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.email.enabled}
                      onChange={(e) => handleSettingsChange('email', 'enabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">From Email</label>
                    <input
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={(e) => handleSettingsChange('email', 'fromEmail', e.target.value)}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">From Name</label>
                    <input
                      type="text"
                      value={settings.email.fromName}
                      onChange={(e) => handleSettingsChange('email', 'fromName', e.target.value)}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* SMS Settings */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.sms.enabled}
                      onChange={(e) => handleSettingsChange('sms', 'enabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">From Number</label>
                  <input
                    type="text"
                    value={settings.sms.fromNumber}
                    onChange={(e) => handleSettingsChange('sms', 'fromNumber', e.target.value)}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* Push Notification Settings */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Push Notifications</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.push.enabled}
                      onChange={(e) => handleSettingsChange('push', 'enabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">App ID</label>
                  <input
                    type="text"
                    value={settings.push.appId}
                    onChange={(e) => handleSettingsChange('push', 'appId', e.target.value)}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* Alert Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Alert Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Low Availability Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={settings.alerts.lowAvailabilityThreshold}
                      onChange={(e) => handleSettingsChange('alerts', 'lowAvailabilityThreshold', parseInt(e.target.value))}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Maintenance Advance Notice (hours)
                    </label>
                    <input
                      type="number"
                      value={settings.alerts.maintenanceAdvanceNotice}
                      onChange={(e) => handleSettingsChange('alerts', 'maintenanceAdvanceNotice', parseInt(e.target.value))}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.alerts.sendReminders}
                      onChange={(e) => handleSettingsChange('alerts', 'sendReminders', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send Reminders</span>
                  </label>
                  {settings.alerts.sendReminders && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Reminder Interval (hours)
                      </label>
                      <input
                        type="number"
                        value={settings.alerts.reminderInterval}
                        onChange={(e) => handleSettingsChange('alerts', 'reminderInterval', parseInt(e.target.value))}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications; 