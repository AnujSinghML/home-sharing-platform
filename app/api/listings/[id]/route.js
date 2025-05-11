import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/mongoose';
import Listing from '@/models/Listing';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/listings/:id
export async function GET(request, { params }) {
  try {
    await connectToDB();
    const listing = await Listing.findById(params.id)
      .populate({
        path: 'host',
        select: '_id name email'
      });
    
    if (!listing) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 }
      );
    }

    // Convert the listing to a plain object and ensure host._id is a string
    const listingData = listing.toObject();
    if (listingData.host) {
      listingData.host._id = listingData.host._id.toString();
    }

    console.log('API Response:', listingData); // Debug log
    return NextResponse.json(listingData);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { message: 'Error fetching listing' },
      { status: 500 }
    );
  }
}

// PATCH /api/listings/:id
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
    const listing = await Listing.findById(params.id);

    if (!listing) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner
    if (listing.host.toString() !== session.user.id) {
      console.log('API Auth check failed:', {
        hostId: listing.host.toString(),
        userId: session.user.id
      });
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Update all fields except host and _id
    Object.keys(data).forEach(key => {
      if (key !== 'host' && key !== '_id') {
        listing[key] = data[key];
      }
    });

    await listing.save();
    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { message: 'Error updating listing' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();
    const listing = await Listing.findById(params.id);

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    // Check if the user is the host of the listing
    if (listing.host.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Not authorized to delete this listing' }, { status: 403 });
    }

    await Listing.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { message: 'Error deleting listing' },
      { status: 500 }
    );
  }
} 