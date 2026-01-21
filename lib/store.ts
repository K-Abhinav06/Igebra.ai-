import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface StudentProfile {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading-writing';
  interests: string[];
  progress: Record<string, number>;
}

interface AIStore {
  // Chat state
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Student profile
  studentProfile: StudentProfile | null;
  setStudentProfile: (profile: StudentProfile) => void;

  // API provider
  apiProvider: 'groq' | 'gemini';
  setApiProvider: (provider: 'groq' | 'gemini') => void;
}

export const useAIStore = create<AIStore>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),

  studentProfile: null,
  setStudentProfile: (profile) => set({ studentProfile: profile }),

  apiProvider: 'groq',
  setApiProvider: (provider) => set({ apiProvider: provider }),
}));
