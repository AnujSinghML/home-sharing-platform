// app/api/listings/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/mongoose';
import Listing from '@/models/Listing';
import { authOptions } from '../auth/[...nextauth]/route';

// Helper function to set time to start/end of day
const setTimeToDayBoundary = (date, isStart = true) => {
  const newDate = new Date(date);
  if (isStart) {
    newDate.setHours(0, 0, 0, 0);
  } else {
    newDate.setHours(23, 59, 59, 999);
  }
  return newDate;
};

// GET /api/listings
export async function GET(request) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const user = searchParams.get('user');
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 6;
    const skip = (page - 1) * limit;

    // Build query object
    const query = {};
    
    // Only add featured filter if explicitly requested
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (user === 'true') {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { message: 'Unauthorized' },
          { status: 401 }
        );
      }
      console.log('Session user ID:', session.user.id);
      query.host = session.user.id;
      console.log('Query with host:', query);
    }

    // Add location filter - more flexible search
    if (location) {
      // Split location into parts and create a regex that matches any part
      const locationParts = location.split(/[,\s]+/).filter(Boolean);
      if (locationParts.length > 0) {
        query.location = {
          $regex: locationParts.join('|'),
          $options: 'i'
        };
      }
    }

    let dateRange = null;
    // Add date availability filter
    if (checkIn && checkOut) {
      const startDate = setTimeToDayBoundary(new Date(checkIn), true);
      const endDate = setTimeToDayBoundary(new Date(checkOut), false);
      
      // Only add date filter if both dates are valid
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        dateRange = { start: startDate, end: endDate };
        query.availableDates = {
          $elemMatch: {
            start: { $lte: endDate },
            end: { $gte: startDate }
          }
        };
      }
    }

    console.log('Query:', JSON.stringify(query, null, 2));
    if (dateRange) {
      console.log('Date range:', {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString()
      });
    }

    // Get total count for pagination
    const total = await Listing.countDocuments(query);
    console.log('Total listings found:', total);
    
    // Get listings with pagination
    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('host', 'name email profileImage');

    console.log('Listings returned:', listings.length);

    return NextResponse.json({
      listings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/listings
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await req.json();
    await connectToDB();

    const listing = await Listing.create({
      ...data,
      host: session.user.id,
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { message: 'Error creating listing' },
      { status: 500 }
    );
  }
}