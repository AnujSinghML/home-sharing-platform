const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function updatePassword() {
  try {
    await connectToDB();
    console.log('Connected to database');

    const email = 'jane@example.com';
    const newPassword = 'jane123!';

    // Find the user
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      profileImage: String,
      createdAt: Date
    }));

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('User not found');
      process.exit(1);
    }

    // Hash the new password using the same method as the User model
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    console.log('Password updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updatePassword(); 