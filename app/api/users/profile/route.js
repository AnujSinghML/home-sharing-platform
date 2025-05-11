import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import User from '@/models/User';
import { connectToDB } from '@/lib/mongoose';

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const { name, currentPassword, newPassword, profileImage } = await req.json();

    await connectToDB();

    const user = await User.findById(session.user.id).select('+password');

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update profile image if provided
    if (profileImage) {
      user.profileImage = profileImage;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isPasswordValid = await user.comparePassword(currentPassword);

      if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: 'Current password is incorrect' }), {
          status: 400,
        });
      }

      user.password = newPassword; // The pre-save hook will hash this
    }

    await user.save();

    return new Response(JSON.stringify({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return new Response(JSON.stringify({ message: 'Error updating profile' }), {
      status: 500,
    });
  }
} 