const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image'],
  }],
  amenities: [{
    type: String,
  }],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  availableDates: [{
    start: Date,
    end: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false
  },
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

module.exports = Listing; 