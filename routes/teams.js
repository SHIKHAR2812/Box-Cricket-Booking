const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// @route   POST /teams
// @desc    Create a team
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, schedule } = req.body;
    
    // Create team
    const newTeam = new Team({
      name,
      schedule,
      players: [req.user.id], // Add creator as first player
      createdBy: req.user.id
    });
    
    const team = await newTeam.save();
    
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /teams
// @desc    Get all teams
// @access  Public
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('players', ['firstName', 'lastName'])
      .sort({ createdAt: -1 });
    
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /teams/:id
// @desc    Get team by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('players', ['firstName', 'lastName'])
      .populate('createdBy', ['firstName', 'lastName']);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    
    res.json(team);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /teams/:id/join
// @desc    Join a team
// @access  Private
router.put('/:id/join', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    
    // Check if user is already in team
    if (team.players.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already a member of this team' });
    }
    
    // Add user to team
    team.players.push(req.user.id);
    await team.save();
    
    res.json(team);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 