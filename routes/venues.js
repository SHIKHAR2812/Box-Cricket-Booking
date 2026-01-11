const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');
const auth = require('../middleware/auth');

// @route   GET /venues
// @desc    Get all venues
// @access  Public
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });
    res.json(venues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /venues/:id
// @desc    Get venue by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({ msg: 'Venue not found' });
    }
    
    res.json(venue);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Venue not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 