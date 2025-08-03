import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserBySessionId, updateUser } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, sessionId, fingerprint, deviceInfo } = body;

    if (!name || !email || !phone || !sessionId || !fingerprint || !deviceInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserBySessionId(sessionId);
    if (existingUser) {
      // Update anonymous user with real contact information
      if (existingUser.name === 'Anonymous' && existingUser.email === 'anonymous@temp.com') {
        await updateUser(existingUser.id, {
          name,
          email,
          phone,
          fingerprint,
          deviceInfo
        });
        
        return NextResponse.json({
          success: true,
          userId: existingUser.id,
          message: 'Anonymous user updated with contact information'
        });
      } else {
        return NextResponse.json({
          success: true,
          userId: existingUser.id,
          message: 'User already exists'
        });
      }
    }

    // Create new user
    const userId = await createUser({
      name,
      email,
      phone,
      sessionId,
      fingerprint,
      deviceInfo
    });

    return NextResponse.json({
      success: true,
      userId,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const user = await getUserBySessionId(sessionId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 