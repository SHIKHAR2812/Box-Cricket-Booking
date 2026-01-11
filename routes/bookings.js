const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Create a new booking (user)
router.post('/', auth, async (req, res) => {
  try {
    const { venue, date, slot, players, price } = req.body;
    const booking = new Booking({
      user: req.user.userId,
      venue,
      date,
      slot,
      players,
      price,
      status: 'pending'
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all bookings (admin or user)
router.get('/', auth, async (req, res) => {
  // Optionally add isAdmin middleware for admin-only access
  const bookings = await Booking.find().populate('user', 'firstName lastName email');
  res.json(bookings);
});

module.exports = router; 