import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Configure the route
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds timeout (Vercel hobby plan limit)

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req) {
  console.log('Upload endpoint called');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    // 1. Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary configuration missing');
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500, headers }
      );
    }

    // 2. Validate session
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('No session found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers }
      );
    }

    // 3. Get file from form data
    console.log('Processing form data...');
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers }
      );
    }

    // 4. Log file details
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // 5. Convert file to buffer
    console.log('Converting file to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Upload to Cloudinary
    console.log('Starting Cloudinary upload...');
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'home-sharing',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload successful:', result);
            resolve(result);
          }
        }
      );

      uploadStream.on('error', (error) => {
        console.error('Upload stream error:', error);
        reject(error);
      });

      uploadStream.end(buffer);
    });

    // 7. Return success response
    console.log('Upload complete, returning response');
    return NextResponse.json({
      success: true,
      data: result
    }, { headers });

  } catch (error) {
    // 8. Handle errors
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error uploading file',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { 
      status: 500, 
      headers 
    });
  }
} 