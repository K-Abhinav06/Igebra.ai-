import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize clients with fallback handling
let groqClient: any = null;
let geminiClient: any = null;

try {
  if (process.env.GROQ_API_KEY) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
} catch (error) {
  console.warn('Groq client initialization failed:', error);
}

try {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    geminiClient = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );
  }
} catch (error) {
  console.warn('Gemini client initialization failed:', error);
}

export async function chatWithGroq(messages: any[]) {
  if (!groqClient) {
    console.warn('Groq API key not configured, using mock response');
    return getMockResponse(messages[messages.length - 1]?.content || 'Question');
  }
  
  try {
    const response = await groqClient.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    return response.choices[0]?.message?.content || 'No response received.';
  } catch (error) {
    console.error('Groq API Error:', error);
    return getMockResponse(messages[messages.length - 1]?.content || 'Question');
  }
}

export async function chatWithGemini(prompt: string) {
  if (!geminiClient) {
    console.warn('Gemini API key not configured, using mock response');
    return getMockResponse(prompt);
  }
  
  try {
    const model = geminiClient.getGenerativeModel({
      model: 'gemini-pro',
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return getMockResponse(prompt);
  }
}

export function getAIProvider(provider: string) {
  return provider === 'groq' ? 'groq' : 'gemini';
}

export function getMockResponse(message: string): string {
  return `
Mock AI Response (Fallback Mode)

\`\`\`ts
// This is a fallback response used when AI providers are unavailable
console.log("User question:", "${message}");
\`\`\`

Explanation:
This response is returned when Groq & Gemini API keys are not configured.
To enable real AI responses, please add GROQ_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file.
`;
