const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});

    // Create sample user
    await User.create({
      firstName: 'Ganesh',
      lastName: 'prajapat',
      email: 'ganesh@gmail.com',
      password: 'Ganesh12',
      phone: '8107290058',
      birthday: '2001-08-04'
    });

    console.log('Sample data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();