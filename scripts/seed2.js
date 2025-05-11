const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Listing = require('../models/Listing');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// Sample user data
const users = [
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww'
  },
  {
    name: 'Michael Brown',
    email: 'michael@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'David Miller',
    email: 'david@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D'
  }
];

// Sample listing data
const listings = [
  {
    title: 'Cozy Mountain Cabin',
    description: 'Beautiful cabin with stunning mountain views. Perfect for a peaceful getaway.',
    price: 250,
    location: 'Aspen, Colorado',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FiaW58ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8fDA%3D'
    ],
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Hot Tub'],
    availableDates: [
      {
        start: new Date('2025-05-01'),
        end: new Date('2025-05-15')
      },
      {
        start: new Date('2025-06-01'),
        end: new Date('2025-06-30')
      }
    ],
    featured: true
  },
  {
    title: 'Beachfront Villa',
    description: 'Luxurious villa with direct beach access and private pool.',
    price: 500,
    location: 'Miami, Florida',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2hob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2hob3VzZXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    amenities: ['Pool', 'Beach Access', 'Air Conditioning', 'Gym'],
    availableDates: [
      {
        start: new Date('2025-05-10'),
        end: new Date('2025-05-25')
      }
    ],
    featured: false
  },
  {
    title: 'Downtown Loft',
    description: 'Modern loft in the heart of the city with amazing skyline views.',
    price: 200,
    location: 'New York, NY',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9mdHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9mdHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    amenities: ['WiFi', 'Gym Access', 'Doorman', 'Parking'],
    availableDates: [
      {
        start: new Date('2025-05-15'),
        end: new Date('2025-05-30')
      }
    ],
    featured: false
  },
  {
    title: 'Lakeside Cottage',
    description: 'Charming cottage on a peaceful lake with fishing and boating.',
    price: 175,
    location: 'Lake Tahoe, California',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    amenities: ['Fishing', 'Boat Dock', 'Fireplace', 'BBQ'],
    availableDates: [
      {
        start: new Date('2025-06-01'),
        end: new Date('2025-06-15')
      }
    ],
    featured: false
  },
  {
    title: 'Desert Oasis',
    description: 'Unique desert retreat with pool and stunning sunset views.',
    price: 300,
    location: 'Phoenix, Arizona',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzZXJ0JTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwaG91c2V8ZW58MHx8MHx8fDA%3D'
    ],
    amenities: ['Pool', 'Hot Tub', 'Air Conditioning', 'Outdoor Kitchen'],
    availableDates: [
      {
        start: new Date('2025-05-20'),
        end: new Date('2025-06-05')
      }
    ],
    featured: false
  },
  {
    title: 'Historic Brownstone',
    description: 'Beautifully restored brownstone in a historic neighborhood.',
    price: 350,
    location: 'Boston, Massachusetts',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25zdG9uZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJvd25zdG9uZXxlbnwwfHwwfHx8MA%3D%3D'
    ],
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking'],
    availableDates: [
      {
        start: new Date('2025-06-10'),
        end: new Date('2025-06-25')
      }
    ],
    featured: false
  },
  {
    title: 'Ski Chalet',
    description: 'Luxurious ski chalet with mountain views and hot tub.',
    price: 400,
    location: 'Park City, Utah',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhbGV0fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbGV0fGVufDB8fDB8fHww'
    ],
    amenities: ['Hot Tub', 'Fireplace', 'Ski Storage', 'Boot Warmers'],
    availableDates: [
      {
        start: new Date('2025-05-25'),
        end: new Date('2025-06-10')
      }
    ],
    featured: false
  },
  {
    title: 'Wine Country Villa',
    description: 'Elegant villa in the heart of wine country with vineyard views.',
    price: 450,
    location: 'Napa Valley, California',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGF8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D'
    ],
    amenities: ['Pool', 'Wine Cellar', 'Vineyard Tours', 'Chef Kitchen'],
    availableDates: [
      {
        start: new Date('2025-06-15'),
        end: new Date('2025-06-30')
      }
    ],
    featured: false
  },
  {
    title: 'Treehouse Retreat',
    description: 'Unique treehouse experience in a private forest setting.',
    price: 200,
    location: 'Portland, Oregon',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJlZWhvdXNlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJlZWhvdXNlfGVufDB8fDB8fHww'
    ],
    amenities: ['WiFi', 'Kitchen', 'Hiking Trails', 'Outdoor Shower'],
    availableDates: [
      {
        start: new Date('2025-05-30'),
        end: new Date('2025-06-15')
      }
    ],
    featured: false
  },
  {
    title: 'Island Paradise',
    description: 'Stunning beach house on a private island with crystal clear waters.',
    price: 600,
    location: 'Key West, Florida',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXNsYW5kJTIwaG91c2V8ZW58MHx8MHx8fDA%3D'
    ],
    amenities: ['Private Beach', 'Boat Dock', 'Snorkeling Gear', 'Outdoor Kitchen'],
    availableDates: [
      {
        start: new Date('2025-06-20'),
        end: new Date('2025-07-05')
      }
    ],
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create users with hashed passwords
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          console.log(`User ${user.email} already exists, skipping...`);
          return existingUser;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return User.create({
          ...user,
          password: hashedPassword
        });
      })
    );
    console.log('Created new users');

    // Create listings with host references
    const createdListings = await Promise.all(
      listings.map(async (listing, index) => {
        // Check if listing already exists
        const existingListing = await Listing.findOne({ title: listing.title });
        if (existingListing) {
          console.log(`Listing ${listing.title} already exists, skipping...`);
          return existingListing;
        }

        const hostIndex = index % createdUsers.length;
        return Listing.create({
          ...listing,
          host: createdUsers[hostIndex]._id
        });
      })
    );
    console.log('Created new listings');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 