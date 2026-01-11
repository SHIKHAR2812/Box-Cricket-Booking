import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // Sample data - replace with API calls later
  const [booking, setBooking] = useState({
    id: 'BK001',
    paymentDetails: {
      amount: 1200,
      paymentId: 'TXN123456',
      paymentType: 'Online',
      paymentMethod: 'Credit Card',
      status: 'Paid',
      paidAt: '2024-03-19 14:35',
      cardDetails: {
        cardType: 'Visa',
        lastFourDigits: '4242',
      },
      bankName: 'HDFC Bank',
      receiptNo: 'RCPT123456',
      gst: {
        amount: 216,
        number: 'GST123456789',
      }
    },
    bookingDetails: {
      date: '2024-03-20',
      time: '18:00-19:00',
      duration: '1 hour',
      ground: 'Ground 1',
      status: 'Completed',
      bookingType: 'Online',
      createdAt: '2024-03-19 14:30',
      rate: 1000,
    },
    customerDetails: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      type: 'Player',
      address: '123 Main St, City - 400001',
    },
    additionalCharges: [
      {
        description: 'Equipment Rental (Bat, Ball)',
        amount: 200
      },
      {
        description: 'Lighting Charges',
        amount: 100
      },
      {
        description: 'GST (18%)',
        amount: 216
      }
    ],
    refundDetails: null, // Will contain refund information if payment is refunded
  });

  const handlePrintReceipt = () => {
    window.print(); // Add proper print functionality
  };

  return (
    <div className="p-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={() => navigate('/payments')}
            className="text-primary-600 hover:text-primary-900 flex items-center mb-2"
          >
            ← Back to Payments
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Payment Receipt</h1>
          <p className="text-gray-600">Receipt No: {booking.paymentDetails.receiptNo}</p>
        </div>
        <button
          onClick={handlePrintReceipt}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Print Receipt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Payment Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
                ${booking.paymentDetails.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                  booking.paymentDetails.status === 'Refunded' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}
              >
                {booking.paymentDetails.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-medium">{booking.paymentDetails.paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">{booking.paymentDetails.paymentMethod}</span>
            </div>
            {booking.paymentDetails.cardDetails && (
              <div className="flex justify-between">
                <span className="text-gray-600">Card Details</span>
                <span className="font-medium">
                  {booking.paymentDetails.cardDetails.cardType} ****{booking.paymentDetails.cardDetails.lastFourDigits}
                </span>
              </div>
            )}
            {booking.paymentDetails.bankName && (
              <div className="flex justify-between">
                <span className="text-gray-600">Bank</span>
                <span className="font-medium">{booking.paymentDetails.bankName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date</span>
              <span className="font-medium">{booking.paymentDetails.paidAt}</span>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-2">
              <span className="text-gray-600">Ground Charges ({booking.bookingDetails.duration})</span>
              <span className="font-medium">₹{booking.bookingDetails.rate}</span>
            </div>
            {booking.additionalCharges.map((charge, index) => (
              <div key={index} className="flex justify-between pb-2">
                <span className="text-gray-600">{charge.description}</span>
                <span className="font-medium">₹{charge.amount}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t font-bold">
              <span>Total Amount</span>
              <span>₹{booking.paymentDetails.amount}</span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">{booking.bookingDetails.date}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Time Slot</label>
                <p className="font-medium">{booking.bookingDetails.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Ground</label>
                <p className="font-medium">{booking.bookingDetails.ground}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Duration</label>
                <p className="font-medium">{booking.bookingDetails.duration}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Booking ID</label>
              <p className="font-medium">{booking.id}</p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium">{booking.customerDetails.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Contact</label>
              <p className="font-medium">{booking.customerDetails.phone}</p>
              <p className="text-sm text-gray-500">{booking.customerDetails.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <p className="font-medium">{booking.customerDetails.address}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">GST Number</label>
              <p className="font-medium">{booking.paymentDetails.gst.number}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        {booking.paymentDetails.status === 'Paid' && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={() => {/* Handle refund */}}
          >
            Process Refund
          </button>
        )}
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={() => {/* Handle download */}}
        >
          Download Invoice
        </button>
      </div>

      {/* Refund Details (if applicable) */}
      {booking.refundDetails && (
        <div className="mt-6 bg-red-50 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-4">Refund Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-red-600">Refund Amount</label>
                <p className="font-medium">₹{booking.refundDetails.amount}</p>
              </div>
              <div>
                <label className="text-sm text-red-600">Refund Date</label>
                <p className="font-medium">{booking.refundDetails.date}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-red-600">Refund Reason</label>
              <p className="text-gray-700">{booking.refundDetails.reason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails; 