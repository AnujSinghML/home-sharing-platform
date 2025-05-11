import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

console.log('MongoDB URI:', MONGODB_URI);

async function seed() {
  try {
    console.log('Attempting to connect to MongoDB...');
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    console.log('Successfully cleared existing data');

    // Create sample users
    console.log('Creating sample users...');
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
      },
    ]);
    console.log('Successfully created sample users:', users.map(u => u.email));

    // Create sample listings
    console.log('Creating sample listings...');
    const listings = await Listing.create([
      {
        title: 'Modern Downtown Apartment',
        description: 'Beautiful apartment in the heart of the city',
        location: 'New York, NY',
        price: 150,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
        host: users[0]._id,
        amenities: ['WiFi', 'Kitchen', 'Washer'],
        featured: true,
        availableDates: [
          {
            start: new Date('2024-06-01'),
            end: new Date('2024-06-30')
          }
        ]
      },
      {
        title: 'Cozy Beachfront Villa',
        description: 'Stunning villa with ocean views',
        location: 'Miami, FL',
        price: 250,
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6'],
        host: users[1]._id,
        amenities: ['Pool', 'Beach Access', 'Air Conditioning'],
        featured: true,
        availableDates: [
          {
            start: new Date('2024-06-01'),
            end: new Date('2024-06-30')
          }
        ]
      },
    ]);
    console.log('Successfully created sample listings:', listings.map(l => l.title));

    // Create sample bookings
    console.log('Creating sample bookings...');
    const bookings = await Booking.create([
      {
        listing: listings[0]._id,
        guest: users[1]._id,
        checkIn: new Date('2024-06-01'),
        checkOut: new Date('2024-06-05'),
        totalPrice: 600,
        status: 'confirmed',
      },
    ]);
    console.log('Successfully created sample bookings');

    console.log('Database seeded successfully!');
    console.log('You can now log in with:');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 