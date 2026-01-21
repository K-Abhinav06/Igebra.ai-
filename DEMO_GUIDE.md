import { NextRequest, NextResponse } from 'next/server';
import { chatWithGroq, chatWithGemini, getMockResponse } from '@/lib/ai-providers';
import dbConnect from '@/lib/db';
import { ChatMessage } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const { message, level, topic, provider, userId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Connect DB only if configured
    const hasValidDb =
      process.env.MONGODB_URI &&
      !process.env.MONGODB_URI.includes('mongodb+srv://username');

    if (hasValidDb) {
      await dbConnect();
    }

    // 🔥 STRONG SYSTEM PROMPT (CRITICAL)
    const systemPrompt = `
You are a senior software engineer and AI tutor.

STRICT RULES (DO NOT BREAK):
- When the user asks for CODE, return COMPLETE, RUNNABLE CODE FIRST.
- Use ONLY proper markdown fenced code blocks with language tags.
- NEVER return links instead of code.
- NEVER summarize code unless explicitly asked.
- Do NOT remove indentation.
- Do NOT explain before code.

Teaching Level: ${level || 'intermediate'}
Topic: ${topic || 'General Programming'}

After code, give a SHORT explanation (max 5 lines).
`;

    let aiResponse = '';

    try {
      if (provider === 'gemini') {
        // ✅ Gemini prefers clean prompt
        aiResponse = await chatWithGemini(
          `${systemPrompt}\n\nUser Question:\n${message}`
        );
      } else {
        // ✅ Groq (Chat Completions)
        aiResponse = await chatWithGroq([
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ]);
      }
    } catch (primaryError) {
      console.error('Primary AI failed, switching provider:', primaryError);

      try {
        if (provider === 'groq') {
          aiResponse = await chatWithGemini(
            `${systemPrompt}\n\nUser Question:\n${message}`
          );
        } else {
          aiResponse = await chatWithGroq([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ]);
        }
      } catch (fallbackError) {
        console.error('Both AI providers failed:', fallbackError);
        aiResponse = getMockResponse(message);
      }
    }

    // Save chat history (optional)
    if (userId && hasValidDb) {
      try {
        await ChatMessage.create({
          userId,
          role: 'user',
          content: message,
          topic,
          level,
          provider: provider || 'groq',
        });

        await ChatMessage.create({
          userId,
          role: 'assistant',
          content: aiResponse,
          topic,
          level,
          provider: provider || 'groq',
        });
      } catch (dbError) {
        console.error('DB save failed:', dbError);
      }
    }

    // ✅ IMPORTANT: return `text` (matches frontend)
    return NextResponse.json({ text: aiResponse });

  } catch (error) {
    console.error('Tutoring API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
