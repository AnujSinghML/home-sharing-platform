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

async function updateSeededPasswords() {
  try {
    await connectToDB();
    console.log('Connected to database');

    // Define the User model exactly as in updatePassword.js
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      profileImage: String,
      createdAt: Date
    }));

    const users = [
      { email: 'john@example.com', password: 'john123!' },
      { email: 'emma@example.com', password: 'emma123!' },
      { email: 'michael@example.com', password: 'michael123!' },
      { email: 'sarah@example.com', password: 'sarah123!' },
      { email: 'david@example.com', password: 'david123!' }
    ];

    for (const userData of users) {
      const user = await User.findOne({ email: userData.email }).select('+password');
      
      if (!user) {
        console.log(`User ${userData.email} not found`);
        continue;
      }

      // Hash the new password using the same method as in updatePassword.js
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      console.log(`Password updated successfully for ${userData.email}`);
    }

    console.log('All passwords updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating passwords:', error);
    process.exit(1);
  }
}

updateSeededPasswords(); 