import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    // Test Cloudinary configuration by getting account info
    const result = await cloudinary.api.ping();
    return NextResponse.json({ 
      status: 'success',
      message: 'Cloudinary configuration is working',
      result 
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Cloudinary configuration error',
      error: error.message 
    }, { status: 500 });
  }
} 