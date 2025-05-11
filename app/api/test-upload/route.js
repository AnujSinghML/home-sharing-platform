import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    return NextResponse.json({ 
      message: 'Test successful',
      receivedFile: file ? true : false,
      fileName: file?.name
    });
  } catch (error) {
    console.error('Test upload error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error.message 
    }, { status: 500 });
  }
} 