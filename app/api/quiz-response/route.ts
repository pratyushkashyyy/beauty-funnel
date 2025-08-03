import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResponse, getUserBySessionId, createUser } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, questionId, questionTitle, answer } = body;

    if (!sessionId || !questionId || !questionTitle || !answer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await getUserBySessionId(sessionId);
    
    if (!user) {
      // Create a temporary anonymous user for tracking quiz responses
      const userId = await createUser({
        name: 'Anonymous',
        email: 'anonymous@temp.com',
        phone: '0000000000',
        sessionId,
        fingerprint: JSON.stringify({ sessionId }),
        deviceInfo: JSON.stringify({ sessionId })
      });
      
      // Get the created user
      user = await getUserBySessionId(sessionId);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Failed to create temporary user' },
          { status: 500 }
        );
      }
    }

    // Save quiz response
    const responseId = await saveQuizResponse({
      userId: user.id,
      questionId,
      questionTitle,
      answer: Array.isArray(answer) ? answer.join(', ') : answer,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      responseId,
      message: 'Quiz response saved successfully'
    });

  } catch (error) {
    console.error('Error saving quiz response:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 