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

    // 🔥 ENHANCED SYSTEM PROMPT FOR INTERACTIVE & EFFECTIVE TUTORING
    const systemPrompt = `
You are an exceptional AI tutor designed to make learning engaging and effective.

YOUR TEACHING STYLE:
- Be conversational, encouraging, and break complex concepts into digestible parts
- Adapt to ${level || 'intermediate'} level: use appropriate examples and vocabulary
- ${topic ? `Focus on ${topic}` : 'Be ready for any topic'}
- Ask clarifying questions if the user's query is ambiguous
- Provide examples and real-world applications
- Use analogies to explain abstract concepts
- Always end with a quick summary or key takeaway

RESPONSE FORMAT:
1. Direct answer to their question (clear & concise)
2. Examples or analogies (if applicable)
3. Code samples (if relevant, with complete, runnable code)
4. Follow-up tip or challenge (to deepen learning)

CODE RESPONSES:
- Provide complete, runnable code first
- Use proper markdown fenced code blocks with language tags
- Include brief comments in code
- Explain the approach, not line-by-line

LENGTH GUIDELINES:
- Keep responses focused (3-5 paragraphs max)
- Use bullet points for lists
- Add emojis sparingly to improve readability

ENGAGEMENT TACTICS:
- Reference previous topics if relevant
- Suggest follow-up questions
- Provide practice exercises for challenging topics
`;

    let aiResponse = '';

    try {
      // Try Groq first (most reliable)
      aiResponse = await chatWithGroq([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ]);
    } catch (groqError) {
      console.error('Groq failed, trying Gemini:', groqError);
      try {
        // Fallback to Gemini
        aiResponse = await chatWithGemini(
          `${systemPrompt}\n\nUser Question:\n${message}`
        );
      } catch (geminiError) {
        console.error('Gemini also failed, using mock response:', geminiError);
        // Final fallback to mock
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

    // ✅ IMPORTANT: return `response` (matches frontend)
    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Tutoring API Error:', error);
    return NextResponse.json(
      { response: 'Sorry, I could not generate a response. Please try again.' },
      { status: 200 }
    );
  }
}
