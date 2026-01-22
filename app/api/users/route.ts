import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, name, level, preferredProvider, topics } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name required' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.level = level || user.level;
      user.preferredProvider = preferredProvider || user.preferredProvider;
      user.topics = topics || user.topics;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        email,
        name,
        level: level || 'beginner',
        preferredProvider: preferredProvider || 'groq',
        topics: topics || [],
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Create/Update User Error:', error);
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { id, level, preferredProvider, topics } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        level,
        preferredProvider,
        topics,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update User Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
