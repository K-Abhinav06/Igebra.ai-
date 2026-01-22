import { NextRequest, NextResponse } from 'next/server';
import { chatWithGroq, chatWithGemini } from '@/lib/ai-providers';
import dbConnect from '@/lib/db';
import { StudyPlan } from '@/lib/models';

// Parse study plan text into structured weeks
function parseStudyPlan(text: string) {
  const weeks: any[] = [];
  const lines = text.split('\n');
  let currentWeek: any = null;
  let currentSection = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect week markers (Week 1, Week 2, etc.)
    const weekMatch = trimmed.match(/(?:^|\*\*)?Week\s+(\d+)(?:\*\*)?/i);
    if (weekMatch) {
      if (currentWeek) {
        weeks.push(currentWeek);
      }
      currentWeek = {
        week: parseInt(weekMatch[1]),
        topic: '',
        learningObjectives: [],
        resources: [],
        tasks: [],
        completed: false,
      };
      currentSection = 'header';
      continue;
    }

    if (!currentWeek) continue;

    // Detect sections
    if (trimmed.toLowerCase().includes('learning objectives') || trimmed.toLowerCase().includes('topics to cover')) {
      currentSection = 'objectives';
      continue;
    }
    if (trimmed.toLowerCase().includes('practice') || trimmed.toLowerCase().includes('exercises') || trimmed.toLowerCase().includes('tasks')) {
      currentSection = 'tasks';
      continue;
    }
    if (trimmed.toLowerCase().includes('resources') || trimmed.toLowerCase().includes('materials')) {
      currentSection = 'resources';
      continue;
    }

    // Extract content
    if (trimmed && !trimmed.startsWith('#')) {
      const cleanLine = trimmed
        .replace(/^\*\*/, '')
        .replace(/\*\*$/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/^-\s+/, '')
        .replace(/^\+\s+/, '')
        .trim();

      if (cleanLine) {
        if (currentSection === 'objectives') {
          currentWeek.learningObjectives.push(cleanLine);
        } else if (currentSection === 'tasks') {
          currentWeek.tasks.push(cleanLine);
        } else if (currentSection === 'resources') {
          currentWeek.resources.push(cleanLine);
        } else if (currentSection === 'header' && !currentWeek.topic) {
          currentWeek.topic = cleanLine;
        }
      }
    }
  }

  if (currentWeek) {
    weeks.push(currentWeek);
  }

  return weeks.length > 0 ? weeks : [{
    week: 1,
    topic: 'Complete Study Plan',
    learningObjectives: [text],
    resources: [],
    tasks: [],
    completed: false,
  }];
}

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

    // Parse the response into structured weeks
    const parsedPlan = parseStudyPlan(response);

    // Save study plan to database if userId provided and DB is configured
    if (userId && hasValidDb) {
      try {
        await StudyPlan.create({
          userId,
          topic,
          duration,
          level,
          plan: parsedPlan,
          status: 'active',
          progress: 0,
        });
      } catch (dbError) {
        console.error('Error saving study plan to database:', dbError);
      }
    }

    return NextResponse.json({ plan: parsedPlan, rawText: response });
  } catch (error) {
    console.error('Study Plan API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate study plan' },
      { status: 500 }
    );
  }
}
