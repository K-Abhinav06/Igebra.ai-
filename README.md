# EduAI - Personalized AI-Powered Learning Platform

## 🎓 Project Overview

**EduAI** is an innovative personalized education platform built for the **Igebra.ai Hackathon** (Personalized Education - AI-Powered Learning and Teaching). It leverages cutting-edge AI technology to deliver tailored learning experiences adapted to each student's unique learning style, pace, and interests.

### Key Differentiators
- **Adaptive AI Tutoring**: Real-time personalized explanations using Groq or Gemini AI
- **Multi-Provider Support**: Flexible AI backend switching between Groq and Google Gemini
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first, modern UI with smooth animations

---

## 🚀 Features

### Core Features
1. **AI-Powered Tutor** 🤖
   - Personalized explanations based on learning level (beginner/intermediate/advanced)
   - Topic-specific guidance
   - Adaptive teaching methods

2. **Adaptive Quizzes** 🎯
   - AI-generated questions tailored to difficulty level
   - Instant feedback with explanations
   - Progress tracking

3. **Learning Analytics** 📊
   - Real-time progress monitoring
   - Performance insights
   - Learning style detection

4. **Flexible AI Integration** 🔄
   - Switch between Groq API (high-speed) and Google Gemini (free tier)
   - Seamless API abstraction

5. **Responsive UI** 🎨
   - Beautiful gradient design
   - Smooth animations
   - Mobile-optimized

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 14+ |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI State** | Zustand |
| **AI SDKs** | Groq SDK, Google Generative AI |
| **AI Runtime** | Vercel AI SDK (extensible) |
| **Deployment** | Vercel |

---

## 📋 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API Keys (at least one of):
  - Groq API Key: [Get from Groq Console](https://console.groq.com)
  - Google Gemini API Key: [Get from Google AI Studio](https://makersuite.google.com/app/apikey)

### 1. Clone Repository
```bash
cd "c:\Users\ASUS\OneDrive\Desktop\Igebra.ai Hackathon\Igebra.ai-Hackathon"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.local` file:
```env
# Groq API
GROQ_API_KEY=your_groq_api_key_here

# Google Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
EduAI/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage with feature showcase
│   ├── tutor/
│   │   └── page.tsx            # AI Tutor interface
│   ├── api/
│   │   ├── tutoring/
│   │   │   └── route.ts        # Tutoring API endpoint
│   │   └── quiz/
│   │       └── route.ts        # Quiz generation API endpoint
│   └── globals.css             # Global styles
├── lib/
│   ├── config.ts               # Configuration constants
│   ├── store.ts                # Zustand state management
│   └── ai-providers.ts         # AI SDK integration
├── public/                      # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
└── next.config.js              # Next.js config
```

---

## 🎯 Key Components

### 1. Homepage (`app/page.tsx`)
- Landing page with feature overview
- AI provider selection
- Call-to-action buttons
- Responsive grid layout

### 2. AI Tutor (`app/tutor/page.tsx`)
- Real-time chat interface
- Learning level selector
- Topic input
- Message history
- Provider switcher

### 3. API Routes

#### Tutoring API (`/api/tutoring`)
```typescript
POST /api/tutoring
{
  "message": "Explain quantum computing",
  "level": "beginner",
  "topic": "Physics",
  "provider": "groq"
}
```

#### Quiz API (`/api/quiz`)
```typescript
POST /api/quiz
{
  "topic": "Biology",
  "difficulty": "intermediate",
  "numQuestions": 5,
  "provider": "gemini"
}
```

---

## 🔌 AI Provider Integration

### Groq API
- **Advantage**: Ultra-fast inference (50+ tokens/sec)
- **Cost**: Free tier available
- **Model**: Mixtral-8x7b-32768

```typescript
import { Groq } from 'groq-sdk';

const response = await groqClient.chat.completions.create({
  model: 'mixtral-8x7b-32768',
  messages: [{ role: 'user', content: 'Your question' }],
});
```

### Google Gemini
- **Advantage**: Free tier, multimodal capabilities
- **Cost**: Free for development
- **Model**: Gemini-pro

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const model = geminiClient.getGenerativeModel({
  model: 'gemini-pro',
});
const result = await model.generateContent(prompt);
```

---

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Gradient blues, purples, and slates
- **Typography**: Responsive sizing, clear hierarchy
- **Components**: Reusable button, card, and layout components
- **Animations**: Smooth transitions and hover effects

### Key UI Elements
```css
.gradient-text      /* Text gradient effect */
.card-hover         /* Card elevation on hover */
.btn-primary        /* Primary action button */
.btn-secondary      /* Secondary action button */
```

---

## 📊 State Management

**Zustand Store** (`lib/store.ts`):
```typescript
interface AIStore {
  messages: Message[];
  studentProfile: StudentProfile | null;
  apiProvider: 'groq' | 'gemini';
  addMessage: (message: Message) => void;
  setStudentProfile: (profile: StudentProfile) => void;
  setApiProvider: (provider: 'groq' | 'gemini') => void;
}
```

---

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel

1. **Connect GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/EduAI.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [Vercel](https://vercel.com/import)
   - Select your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables on Vercel**
   - `GROQ_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`

---

## 🧪 Testing

### API Testing with cURL
```bash
# Test Tutoring API
curl -X POST http://localhost:3000/api/tutoring \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is photosynthesis?",
    "level": "beginner",
    "topic": "Biology",
    "provider": "groq"
  }'

# Test Quiz API
curl -X POST http://localhost:3000/api/quiz \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Chemistry",
    "difficulty": "intermediate",
    "numQuestions": 5,
    "provider": "gemini"
  }'
```

---

## 📈 Future Enhancements

### Phase 2
- [ ] User authentication (NextAuth.js)
- [ ] Learning path creation
- [ ] Progress analytics dashboard
- [ ] Spaced repetition system
- [ ] Video content integration
- [ ] Real-time collaboration

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Gamification system
- [ ] Peer learning features
- [ ] Instructor dashboard
- [ ] Multi-language support
- [ ] Advanced analytics

---

## 🎓 Evaluation Criteria Alignment

✅ **User Interface (UI)**: Modern, gradient-based design with smooth animations
✅ **Functionality & Demo**: Fully working AI tutor and quiz generation
✅ **Technical Implementation**: Next.js, TypeScript, Tailwind, API routes
✅ **AI Usage (Mandatory)**: Groq + Gemini integration with provider switching
✅ **Innovation & Impact**: Personalized, adaptive learning for educational transformation

---

## 📝 Example Usage

### Starting the Tutor
1. Visit home page
2. Select AI provider (Groq or Gemini)
3. Click "Start Learning"
4. Set learning level and topic
5. Ask questions and get personalized responses

### Generating a Quiz
```typescript
const response = await fetch('/api/quiz', {
  method: 'POST',
  body: JSON.stringify({
    topic: 'Machine Learning',
    difficulty: 'advanced',
    numQuestions: 10,
    provider: 'groq'
  })
});
const { questions } = await response.json();
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and create a Pull Request

---

## 📄 License

MIT License - Feel free to use for educational purposes.

---

## 👨‍💻 Built For

**Igebra.ai Hackathon 2026**
*Personalized Education - AI-Powered Learning and Teaching*

---

## 📞 Support

For issues or questions:
1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review API documentation
3. Test with different providers
4. Check environment variables

---

## 🎯 Next Steps

1. **Setup Environment**: Configure API keys
2. **Run Locally**: `npm run dev`
3. **Explore Features**: Try tutor and quiz generation
4. **Deploy**: Push to Vercel
5. **Iterate**: Add more features and AI capabilities

**Happy Learning! 🚀**
