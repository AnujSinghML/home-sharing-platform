import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();
    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    // Check if the user is the one who made the booking
    if (booking.guest.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if the booking is in a cancellable state
    if (booking.status !== 'confirmed') {
      return NextResponse.json(
        { message: 'This booking cannot be cancelled' },
        { status: 400 }
      );
    }

    // Update the booking status
    booking.status = 'cancelled';
    await booking.save();

    return NextResponse.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { message: 'Error cancelling booking' },
      { status: 500 }
    );
  }
} 