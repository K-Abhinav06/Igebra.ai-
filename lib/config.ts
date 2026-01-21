
// API configuration and utilities
export const AI_PROVIDERS = {
  GROQ: 'groq',
  GEMINI: 'gemini',
} as const;

export const MODEL_CONFIG = {
  groq: {
    model: 'mixtral-8x7b-32768',
    maxTokens: 2048,
  },
  gemini: {
    model: 'gemini-pro',
    maxTokens: 2048,
  },
};

export const API_ENDPOINTS = {
  chat: '/api/chat',
  tutoring: '/api/tutoring',
  assessment: '/api/assessment',
  generateQuiz: '/api/quiz',
};
