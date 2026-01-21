import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ChatMessage, QuizResult, StudyPlan } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'messages', 'quizzes', 'plans', or 'all'

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const history: any = {};

    if (type === 'messages' || type === 'all') {
      history.messages = await ChatMessage.find({ userId })
        .sort({ createdAt: -1 })
        .limit(50);
    }

    if (type === 'quizzes' || type === 'all') {
      history.quizzes = await QuizResult.find({ userId })
        .sort({ createdAt: -1 })
        .limit(20);
    }

    if (type === 'plans' || type === 'all') {
      history.studyPlans = await StudyPlan.find({ userId })
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

// Get statistics for dashboard
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Get stats
    const messageCount = await ChatMessage.countDocuments({ userId });
    const quizCount = await QuizResult.countDocuments({ userId });
    const planCount = await StudyPlan.countDocuments({ userId });

    // Get average quiz score
    const quizStats = await QuizResult.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$percentageCorrect' },
          totalQuestions: { $sum: '$totalQuestions' },
        },
      },
    ]);

    // Get topics studied
    const topicsStudied = await ChatMessage.distinct('topic', { userId });

    return NextResponse.json({
      messageCount,
      quizCount,
      planCount,
      averageQuizScore: quizStats[0]?.averageScore || 0,
      totalQuestionsAnswered: quizStats[0]?.totalQuestions || 0,
      topicsStudied,
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
