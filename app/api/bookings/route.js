// app/api/bookings/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import Listing from '@/models/Listing';
import { authOptions } from '../auth/[...nextauth]/route';

// POST /api/bookings
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

    // Check if listing exists and is available
    const listing = await Listing.findById(data.listing);
    if (!listing) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 }
      );
    }

    // Convert dates to proper format
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    // Check if dates are available
    const isAvailable = listing.availableDates.some(
      (date) =>
        checkInDate >= new Date(date.start) &&
        checkOutDate <= new Date(date.end)
    );

    if (!isAvailable) {
      return NextResponse.json(
        { message: 'Selected dates are not available' },
        { status: 400 }
      );
    }

    // Calculate total price
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * listing.price;

    const booking = await Booking.create({
      ...data,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest: session.user.id,
      totalPrice,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'Error creating booking' },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/:id
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDB();
    const { id } = params;
    const data = await request.json();

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner of the listing
    const listing = await Listing.findById(booking.listing);
    if (listing.owner.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    booking.status = data.status;
    await booking.save();

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
