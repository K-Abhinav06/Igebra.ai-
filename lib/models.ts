import mongoose, { Schema, Document } from 'mongoose';

// User Interface
export interface IUser extends Document {
//   _id: string;
  email: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferredProvider: 'groq' | 'gemini';
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Chat Message Interface
export interface IChatMessage extends Document {
//   _id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  topic?: string;
  level?: string;
  provider: 'groq' | 'gemini';
  createdAt: Date;
}

// Quiz Result Interface
export interface IQuizResult extends Document {
//   _id: string;
  userId: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: {
    question: string;
    userAnswer: number;
    correctAnswer: number;
    explanation: string;
  }[];
  score: number;
  totalQuestions: number;
  percentageCorrect: number;
  createdAt: Date;
}

// Study Plan Interface
export interface IStudyPlan extends Document {
//   _id: string;
  userId: string;
  topic: string;
  duration: '1-week' | '2-weeks' | '1-month' | '3-months';
  level: 'beginner' | 'intermediate' | 'advanced';
  plan: {
    week: number;
    topic: string;
    learningObjectives: string[];
    resources: string[];
    tasks: string[];
    completed: boolean;
  }[];
  status: 'active' | 'completed' | 'paused';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    preferredProvider: { type: String, enum: ['groq', 'gemini'], default: 'groq' },
    topics: [String],
  },
  { timestamps: true }
);

// Chat Message Schema
const ChatMessageSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    topic: String,
    level: String,
    provider: { type: String, enum: ['groq', 'gemini'], required: true },
  },
  { timestamps: true }
);

// Quiz Result Schema
const QuizResultSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    questions: [
      {
        question: String,
        userAnswer: Number,
        correctAnswer: Number,
        explanation: String,
      },
    ],
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentageCorrect: { type: Number, required: true },
  },
  { timestamps: true }
);

// Study Plan Schema
const StudyPlanSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    duration: { type: String, enum: ['1-week', '2-weeks', '1-month', '3-months'], required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    plan: [
      {
        week: { type: Number, required: true },
        topic: { type: String, required: true },
        learningObjectives: [String],
        resources: [String],
        tasks: [String],
        completed: { type: Boolean, default: false },
      },
    ],
    status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create or retrieve models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
export const QuizResult = mongoose.models.QuizResult || mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);
export const StudyPlan = mongoose.models.StudyPlan || mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);
