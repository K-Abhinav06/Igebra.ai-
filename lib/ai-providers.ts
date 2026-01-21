import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const geminiClient = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

export async function chatWithGroq(messages: any[]) {
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
    throw error;
  }
}

export async function chatWithGemini(prompt: string) {
  try {
    const model = geminiClient.getGenerativeModel({
      model: 'gemini-pro',
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export function getAIProvider(provider: string) {
  return provider === 'groq' ? 'groq' : 'gemini';
}
export function getMockResponse(message: string): string {
  return `
Mock AI Response (Fallback Mode)

\`\`\`ts
// This is a fallback response used when AI providers fail
console.log("User question:", "${message}");
\`\`\`

Explanation:
This response is returned only if Groq & Gemini are unavailable.
`;
}
