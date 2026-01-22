import { NextRequest, NextResponse } from 'next/server';
import { chatWithGroq, chatWithGemini } from '@/lib/ai-providers';
import dbConnect from '@/lib/db';
import { QuizResult } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const { topic, difficulty, numQuestions = 5, provider, userId } = await request.json();

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

    const difficultyDescriptions = {
      beginner: 'basic concepts and definitions',
      intermediate: 'application of concepts and problem-solving',
      advanced: 'complex scenarios, analysis, and synthesis'
    };

    const prompt = `You are an expert educator creating a ${difficulty || 'intermediate'} level quiz.

Generate exactly ${numQuestions} multiple choice quiz questions about "${topic}".

Difficulty Level: ${difficulty || 'intermediate'} - focus on ${difficultyDescriptions[difficulty as keyof typeof difficultyDescriptions] || difficultyDescriptions.intermediate}

IMPORTANT REQUIREMENTS:
1. Each question must test understanding, not just memorization
2. Distractors (wrong answers) must be plausible and educational
3. Include one explanation per question
4. Questions should build from simple to complex
5. Vary question types (definition, application, analysis, etc)

Return ONLY valid JSON array (no markdown, no comments):
[
  {
    "question": "The question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why Option A (index 0) is correct and why others might seem right"
  }
]`;

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

    try {
      const questions = JSON.parse(response);
      
      // Save quiz to database if userId provided and DB is configured
      if (userId && hasValidDb) {
        try {
          await QuizResult.create({
            userId,
            topic,
            difficulty: difficulty || 'intermediate',
            questions: [], // Will be filled when user completes quiz
            score: 0,
            totalQuestions: numQuestions,
            percentageCorrect: 0,
          });
        } catch (dbError) {
          console.error('Error saving quiz to database:', dbError);
        }
      }

      return NextResponse.json({ questions });
    } catch {
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.error('Quiz API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
