import { NextRequest, NextResponse } from 'next/server';
import { chatWithGroq, chatWithGemini } from '@/lib/ai-providers';
import dbConnect from '@/lib/db';
import { StudyPlan } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const { topic, duration, level, provider, userId } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Connect to database only if configured
    const hasValidDb = process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('mongodb+srv://username');
    if (hasValidDb) {
      await dbConnect();
    }

    const prompt = `You are an expert learning coach creating a personalized study plan.

Topic: "${topic}"
Duration: ${duration}
Student Level: ${level}

Create a realistic, week-by-week study plan that:
1. Breaks down the topic into manageable milestones
2. Includes specific subtopics to master
3. Suggests practice activities and projects
4. Recommends estimated daily study time
5. Lists key resources and learning outcomes

Format the plan clearly with:
- Week-by-week breakdown
- Daily time commitment
- Topics to cover
- Practice exercises
- Milestones and assessments

Make it specific, actionable, and motivating.`;

    let response: string;

    if (provider === 'gemini') {
      response = await chatWithGemini(prompt);
    } else {
      const messages = [
        {
          role: 'user' as const,
          content: prompt,
        },
      ];
      response = await chatWithGroq(messages);
    }

    // Save study plan to database if userId provided and DB is configured
    if (userId && hasValidDb) {
      try {
        await StudyPlan.create({
          userId,
          topic,
          duration,
          level,
          plan: response,
          status: 'active',
          progress: 0,
        });
      } catch (dbError) {
        console.error('Error saving study plan to database:', dbError);
      }
    }

    return NextResponse.json({ plan: response });
  } catch (error) {
    console.error('Study Plan API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate study plan' },
      { status: 500 }
    );
  }
}
