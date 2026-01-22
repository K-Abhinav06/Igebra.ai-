# EduAI - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get API Keys (2 min)

#### Option A: Groq API (Recommended for Speed)
1. Go to https://console.groq.com
2. Sign up/login
3. Create API key
4. Copy the key

#### Option B: Google Gemini (Free Tier)
1. Go to https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy the key

### Step 2: Configure Environment (1 min)
```bash
# Navigate to project folder
cd "c:\Users\ASUS\OneDrive\Desktop\Igebra.ai Hackathon\Igebra.ai-Hackathon"

# Create .env.local file
copy .env.example .env.local

# Edit .env.local with your API keys
# Add your GROQ_API_KEY and/or GOOGLE_GENERATIVE_AI_API_KEY
```

### Step 3: Install Dependencies (1 min)
```bash
npm install
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

### Step 5: Visit Application (instant)
Open your browser:
- **Homepage**: http://localhost:3000
- **Features**: http://localhost:3000/features
- **Tutor**: http://localhost:3000/tutor

---

## 🎯 Key Features to Try

### 1. Homepage
- See project overview
- Select AI provider (Groq or Gemini)
- Browse features

### 2. AI Tutor
- Ask questions on any topic
- Select learning level
- Get personalized explanations
- Real-time responses

### 3. Features Page
- See all capabilities
- Technology stack overview
- Detailed feature breakdown

---

## 📝 Project Structure

```
EduAI/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── features/          # Features showcase
│   ├── tutor/             # AI tutor interface
│   ├── api/               # Backend routes
│   │   ├── tutoring/      # Tutoring endpoint
│   │   └── quiz/          # Quiz generation endpoint
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/                    # Utility functions
│   ├── config.ts          # Configuration
│   ├── store.ts           # State management (Zustand)
│   ├── ai-providers.ts    # AI integrations
│   └── prompts.ts         # AI prompt templates
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind configuration
├── next.config.js         # Next.js config
├── README.md              # Full documentation
└── DOCUMENTATION.md       # Detailed project docs
```

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 🌐 Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial EduAI commit"
git push origin main
```

### 2. Deploy on Vercel
1. Visit https://vercel.com/import
2. Select your GitHub repository
3. Add environment variables:
   - `GROQ_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
4. Deploy

### 3. Access Live App
```
https://your-project.vercel.app
```

---

## 📚 API Documentation

### Tutoring Endpoint
```bash
POST http://localhost:3000/api/tutoring

Request:
{
  "message": "Explain quantum physics",
  "level": "beginner",
  "topic": "Physics",
  "provider": "groq"
}

Response:
{
  "response": "Quantum physics is... [AI response]"
}
```

### Quiz Endpoint
```bash
POST http://localhost:3000/api/quiz

Request:
{
  "topic": "Biology",
  "difficulty": "intermediate",
  "numQuestions": 5,
  "provider": "gemini"
}

Response:
{
  "questions": [
    {
      "question": "...",
      "options": [...],
      "correct": 0,
      "explanation": "..."
    }
  ]
}
```

---

## 🛠️ Troubleshooting

### Issue: "npm not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: API returns error
**Solution**: 
1. Check API key is set in `.env.local`
2. Verify API key is valid
3. Check internet connection
4. Try different AI provider

### Issue: Port 3000 already in use
**Solution**:
```bash
# Run on different port
npm run dev -- -p 3001
```

### Issue: Styling not loading
**Solution**:
```bash
# Clear cache and rebuild
rm -r .next
npm run dev
```

---

## 💡 Tips for Best Results

### For AI Provider Selection
- **Groq**: Faster responses (50+ tokens/sec), ideal for real-time chat
- **Gemini**: Free tier available, multimodal support

### For Better Responses
1. Be specific in questions
2. Provide context (learning level, topic)
3. Ask follow-up questions for clarification
4. Experiment with different learning levels

### For Quiz Generation
1. Start with intermediate difficulty
2. Increase difficulty for advanced students
3. Use 5-10 questions per quiz
4. Review explanations to understand topics

---

## 📊 Next Steps

### For Development
1. [ ] Set up local environment
2. [ ] Test AI endpoints
3. [ ] Explore code structure
4. [ ] Modify prompts for your needs
5. [ ] Add authentication
6. [ ] Connect to database

### For Deployment
1. [ ] Push to GitHub
2. [ ] Set up Vercel account
3. [ ] Connect repository
4. [ ] Add environment variables
5. [ ] Deploy
6. [ ] Share live link

### For Enhancement
1. [ ] Add user authentication
2. [ ] Create learning profiles
3. [ ] Build analytics dashboard
4. [ ] Implement spaced repetition
5. [ ] Add more AI models
6. [ ] Create mobile app

---

## 📞 Support Resources

- **GitHub Issues**: Report bugs or request features
- **Documentation**: See README.md and DOCUMENTATION.md
- **API Docs**: 
  - Groq: https://console.groq.com/docs
  - Gemini: https://ai.google.dev/docs

---

## 🎓 Project Structure for Hackathon Submission

Your submission should include:

### 1. GitHub Repository ✅
- Clean, well-organized code
- Comprehensive README ✅
- .env.example file ✅
- Proper .gitignore ✅

### 2. Live Demo Link
```
Deploy to Vercel and share URL
```

### 3. Documentation
- Project overview ✅ (DOCUMENTATION.md)
- Setup instructions ✅ (README.md)
- Feature descriptions ✅
- Technology choices ✅

### 4. Working Features
- Homepage ✅
- AI Tutor ✅
- Quiz Generation ✅
- Provider Switching ✅

---

## 🎯 Hackathon Evaluation Checklist

- ✅ **Project Description**: Explained (DOCUMENTATION.md)
- ✅ **Purpose**: Solves education inequality
- ✅ **Scope**: Scalable, multiple use cases
- ✅ **Features**: AI tutoring, quizzes, analytics-ready
- ✅ **GitHub README**: Comprehensive (README.md)
- ✅ **Live Demo**: Deploy to Vercel
- ✅ **UI/UX**: Modern, responsive design
- ✅ **Functionality**: All features working
- ✅ **Technical Stack**: Next.js, TypeScript, Tailwind
- ✅ **AI Integration**: Groq & Gemini (mandatory)
- ✅ **Innovation**: Adaptive learning at scale

---

## 🚀 Ready to Launch!

You now have a production-ready personalized education AI platform. 

**Next Action**: 
1. Install dependencies: `npm install`
2. Add API keys to `.env.local`
3. Run: `npm run dev`
4. Visit: http://localhost:3000
5. Start learning! 🎓

---

*Built for Igebra.ai Hackathon 2026*
*Personalized Education - AI-Powered Learning and Teaching*
