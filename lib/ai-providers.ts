import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize clients with fallback handling
let groqClient: any = null;
let geminiClient: any = null;

try {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY.trim(),
    });
    console.log('✅ Groq client initialized successfully');
  } else {
    console.warn('⚠️ GROQ_API_KEY not set in environment');
  }
} catch (error) {
  console.warn('❌ Groq client initialization failed:', error);
}

try {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GOOGLE_GENERATIVE_AI_API_KEY.trim()) {
    geminiClient = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY.trim()
    );
    console.log('✅ Gemini client initialized successfully');
  } else {
    console.warn('⚠️ GOOGLE_GENERATIVE_AI_API_KEY not set in environment');
  }
} catch (error) {
  console.warn('❌ Gemini client initialization failed:', error);
}

export async function chatWithGroq(messages: any[]) {
  if (!groqClient) {
    console.warn('Groq API key not configured, using mock response');
    return getMockResponse(messages[messages.length - 1]?.content || 'Question');
  }
  
  try {
    console.log('📤 Sending request to Groq...');
    const response = await groqClient.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      console.warn('⚠️ Groq returned empty response');
      return getMockResponse(messages[messages.length - 1]?.content || 'Question');
    }
    console.log('✅ Groq response received');
    return result;
  } catch (error) {
    console.error('❌ Groq API Error:', error);
    return getMockResponse(messages[messages.length - 1]?.content || 'Question');
  }
}

export async function chatWithGemini(prompt: string) {
  if (!geminiClient) {
    console.warn('🚫 Gemini client not initialized');
    return getMockResponse(prompt);
  }
  
  try {
    console.log('📤 Sending request to Gemini with model: gemini-1.5-flash');
    
    const model = geminiClient.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    console.log('🔄 Generating content...');
    const result = await model.generateContent(prompt);
    
    console.log('⏳ Waiting for response...');
    const response = await result.response;
    
    if (!response) {
      console.warn('⚠️ No response object received from Gemini');
      return getMockResponse(prompt);
    }

    const text = response.text();
    
    if (!text || text.trim() === '') {
      console.warn('⚠️ Gemini returned empty text');
      return getMockResponse(prompt);
    }
    
    console.log('✅ Gemini response received successfully');
    return text;
  } catch (error: any) {
    console.error('❌ Gemini API Error:', error?.message || error);
    console.error('Full error:', error);
    
    // Check for specific API errors
    if (error?.message?.includes('API key')) {
      console.error('🔑 API Key issue detected');
    }
    if (error?.message?.includes('not enabled')) {
      console.error('⚙️ API not enabled in Google Cloud project');
    }
    
    return getMockResponse(prompt);
  }
}

export function getAIProvider(provider: string) {
  return provider === 'groq' ? 'groq' : 'gemini';
}

export function getMockResponse(message: string): string {
  return `I appreciate your question about "${message}". However, I'm currently running in demo mode since the AI service keys haven't been configured yet.

To enable real AI tutoring responses, please set up your API keys:
1. Get a free API key from Groq (https://console.groq.com)
2. Add it to your .env.local file as: GROQ_API_KEY=your_key_here
3. Restart the server

In the meantime, I'm here to help guide your learning! Feel free to ask follow-up questions or let me know what topic you'd like to explore.`;
}
