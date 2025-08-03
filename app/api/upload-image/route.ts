import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { saveUserImage, getUserBySessionId } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const sessionId = formData.get('sessionId') as string;
    const imageType = formData.get('imageType') as string || 'selfie';

    if (!imageFile || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user
    const user = await getUserBySessionId(sessionId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = imageFile.name.split('.').pop() || 'jpg';
    const filename = `${user.id}_${timestamp}_${randomString}.${fileExtension}`;
    const filePath = path.join(uploadsDir, filename);

    // Convert File to Buffer and save
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save image record to database
    const imageId = await saveUserImage({
      userId: user.id,
      imagePath: `/uploads/${filename}`,
      imageType
    });

    return NextResponse.json({
      success: true,
      imageId,
      imagePath: `/uploads/${filename}`,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 