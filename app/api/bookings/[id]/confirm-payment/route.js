import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDB();

    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify that the user is the guest of the booking
    if (booking.guest.toString() !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update the booking status to confirmed
    booking.status = 'confirmed';
    await booking.save();

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { message: 'Error confirming payment' },
      { status: 500 }
    );
  }
} 