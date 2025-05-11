import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import Listing from '@/models/Listing';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDB();
    const { status } = await request.json();

    const booking = await Booking.findById(params.id).populate('listing');
    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify that the user is the host of the listing
    if (booking.listing.host.toString() !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { message: 'Error updating booking status' },
      { status: 500 }
    );
  }
} 