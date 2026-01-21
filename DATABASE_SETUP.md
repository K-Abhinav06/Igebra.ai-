# EduAI - AI-Powered Personalized Learning Platform

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (installed at `C:\nodejs\node-v20.11.0-win-x64`)
- MongoDB Atlas account (free tier available)
- Groq API key (optional - free tier available)
- Google Generative AI API key (optional - free tier available)

### Setup Instructions

#### 1. MongoDB Setup
1. Sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with username/password
4. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/eduai?retryWrites=true&w=majority`)

#### 2. Environment Configuration
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/eduai?retryWrites=true&w=majority
   GROQ_API_KEY=your_groq_key_here
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_key_here
   ```

#### 3. Install Dependencies
```bash
npm install
```

#### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app!

---

## 📊 Database Schema

### Collections

#### **Users**
Store user profiles and preferences
```typescript
{
  _id: ObjectId
  email: string (unique)
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  preferredProvider: 'groq' | 'gemini'
  topics: [string]
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### **ChatMessages**
Store conversation history
```typescript
{
  _id: ObjectId
  userId: string
  role: 'user' | 'assistant'
  content: string
  topic: string
  level: string
  provider: 'groq' | 'gemini'
  createdAt: timestamp
}
```

#### **QuizResults**
Store quiz performance
```typescript
{
  _id: ObjectId
  userId: string
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  questions: [{ question, userAnswer, correctAnswer, explanation }]
  score: number
  totalQuestions: number
  percentageCorrect: number
  createdAt: timestamp
}
```

#### **StudyPlans**
Store learning plans
```typescript
{
  _id: ObjectId
  userId: string
  topic: string
  duration: '1-week' | '2-weeks' | '1-month' | '3-months'
  level: 'beginner' | 'intermediate' | 'advanced'
  plan: string
  status: 'active' | 'completed' | 'paused'
  progress: number (0-100)
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## 🔌 API Endpoints

### Users
- `GET /api/users?id=userId` - Get user profile
- `POST /api/users` - Create/update user
- `PUT /api/users` - Update user

### AI Tutoring
- `POST /api/tutoring` - Chat with AI tutor
  ```json
  {
    "message": "How does photosynthesis work?",
    "level": "beginner",
    "topic": "Biology",
    "provider": "groq",
    "userId": "user123"
  }
  ```

### Quiz Generation
- `POST /api/quiz` - Generate quiz
  ```json
  {
    "topic": "Python Basics",
    "difficulty": "intermediate",
    "numQuestions": 5,
    "provider": "groq",
    "userId": "user123"
  }
  ```

### Study Plans
- `POST /api/study-plan` - Create study plan
  ```json
  {
    "topic": "Web Development",
    "duration": "2-weeks",
    "level": "beginner",
    "provider": "groq",
    "userId": "user123"
  }
  ```

### History & Stats
- `GET /api/history?userId=user123&type=all` - Get user history
- `POST /api/history` - Get user statistics
  ```json
  {
    "userId": "user123"
  }
  ```

---

## 🏗️ Project Structure

```
app/
├── api/
│   ├── tutoring/        # AI tutor chat
│   ├── quiz/            # Quiz generation
│   ├── study-plan/      # Study plan creation
│   ├── users/           # User management
│   └── history/         # Learning history & stats
├── components/
│   └── navbar.tsx       # Global navigation
├── features/            # Features showcase page
├── study-plan/          # Study planner page
├── tech-stack/          # Tech stack explanation page
├── tutor/               # Tutor chat page
├── globals.css          # Global styles & animations
├── layout.tsx           # Root layout
└── page.tsx             # Homepage

lib/
├── db.ts                # MongoDB connection
├── models.ts            # Database schemas
├── ai-providers.ts      # Groq & Gemini integration
└── store.ts             # Zustand state management
```

---

## 🎨 Features

✅ **AI Tutor** - Real-time chat with Groq or Gemini  
✅ **Quiz Generator** - Auto-generate quizzes by topic  
✅ **Study Planner** - AI-powered learning roadmaps  
✅ **Progress Tracking** - Dashboard with learning statistics  
✅ **Database Integration** - MongoDB for data persistence  
✅ **Responsive Design** - Works on desktop, tablet, mobile  
✅ **Professional UI** - Glass-morphism effects, smooth animations  

---

## 📝 Environment Variables

See `.env.local.example` for all required variables.

**Critical Variables:**
- `MONGODB_URI` - MongoDB connection string (REQUIRED)
- `GROQ_API_KEY` - Groq API key (optional)
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google Gemini key (optional)

---

## 🚀 Deployment

### Deploy to Vercel
```bash
git push origin main
```

Vercel will automatically detect `next.config.js` and deploy your app.

**Important:** Add your environment variables to Vercel project settings before deploying.

---

## 💡 Troubleshooting

### MongoDB Connection Error
- Check your `MONGODB_URI` is correct
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify username/password are URL-encoded

### API Keys Not Working
- Double-check keys are correctly copied to `.env.local`
- Restart dev server after adding environment variables
- Verify keys haven't expired

### Database Not Saving Data
- Ensure MongoDB connection is established
- Check browser console for errors
- Verify `userId` is being passed to API calls

---

## 👨‍💻 Tech Stack

- **Framework:** Next.js 14 (React + TypeScript)
- **Styling:** Tailwind CSS
- **Database:** MongoDB + Mongoose
- **AI Models:** Groq API + Google Gemini
- **State Management:** Zustand
- **Deployment:** Vercel

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Groq API Docs](https://console.groq.com/docs)
- [Google Generative AI Docs](https://ai.google.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📄 License

Built for Igebra.ai Hackathon 2026
