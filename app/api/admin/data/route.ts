import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllUsers, 
  getAllQuizResponses, 
  getAllUserImages,
  getCompleteUserData 
} from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const dataType = searchParams.get('type') || 'all';

    if (userId) {
      // Get specific user data
      const userData = await getCompleteUserData(userId);
      return NextResponse.json({
        success: true,
        data: userData
      });
    }

    // Get all data based on type
    let data: any = {};

    if (dataType === 'all' || dataType === 'users') {
      data.users = await getAllUsers();
    }

    if (dataType === 'all' || dataType === 'responses') {
      data.responses = await getAllQuizResponses();
    }

    if (dataType === 'all' || dataType === 'images') {
      data.images = await getAllUserImages();
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 