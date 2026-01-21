# 🎓 Welcome to EduAI!

## What You Have

A **complete, production-ready personalized education platform** powered by AI, built specifically for the Igebra.ai Hackathon.

---

## 🚀 Quick Start (Choose One)

### Option 1: Jump Right In (3 minutes)
```bash
cd "c:\Users\ASUS\OneDrive\Desktop\Igebra.ai Hackathon\Igebra.ai-Hackathon"
npm install
npm run dev
# Open http://localhost:3000
```

### Option 2: Learn First (5 minutes)
Read these in order:
1. **This file** (you're reading it!)
2. **QUICKSTART.md** - Setup guide
3. **README.md** - Full documentation
4. Then run: `npm install && npm run dev`

### Option 3: Deep Dive (15 minutes)
1. **PROJECT_SUMMARY.md** - See what was built
2. **DOCUMENTATION.md** - Understand the design
3. **SUBMISSION_CHECKLIST.md** - See evaluation alignment
4. Then explore the code and run it

---

## 📋 File Guide

### 📖 Documentation (Read These First)
| File | Purpose | Time |
|------|---------|------|
| **THIS FILE** | Welcome & overview | 2 min |
| **QUICKSTART.md** | 5-minute setup | 5 min |
| **README.md** | Complete docs | 10 min |
| **DOCUMENTATION.md** | Detailed guide | 15 min |
| **PROJECT_SUMMARY.md** | What was built | 5 min |
| **SUBMISSION_CHECKLIST.md** | Hackathon checklist | 10 min |

### 💻 Core Application Files
```
app/
├── page.tsx              # Homepage
├── features/page.tsx     # Features showcase
├── tutor/page.tsx        # AI tutor interface
├── api/
│   ├── tutoring/         # Tutoring API
│   └── quiz/             # Quiz generation
├── layout.tsx            # Root layout
└── globals.css           # Styles

lib/
├── config.ts             # Configuration
├── store.ts              # State management
├── ai-providers.ts       # AI integration
└── prompts.ts            # AI prompts
```

### ⚙️ Configuration Files
```
package.json             # Dependencies
tsconfig.json            # TypeScript
tailwind.config.ts       # Tailwind
postcss.config.js        # PostCSS
next.config.js           # Next.js
.env.example             # Environment template
.eslintrc.json           # Linting rules
.gitignore               # Git ignore
```

---

## 🎯 What This Project Does

### Problem It Solves
Education is typically "one-size-fits-all" but students learn differently, at different paces, with different interests. This creates inequality and frustration.

### Solution
**EduAI** provides personalized AI tutoring that:
- ✅ Adapts to learning level (beginner/intermediate/advanced)
- ✅ Generates personalized explanations
- ✅ Creates adaptive quizzes
- ✅ Works 24/7 at no cost
- ✅ Scales to millions of students

### How It Works
1. **User asks question** on any topic
2. **AI adapts response** to their level
3. **User gets instant answer** personalized to them
4. **Quiz tests** adaptive to their knowledge
5. **Progress tracked** for continuous improvement

---

## 🔑 Key Features

### ✅ AI Tutor
- Real-time chat with AI
- Learning level selector
- Topic-specific guidance
- Instant responses

### ✅ Quiz Generation
- AI creates custom questions
- Difficulty adaptation
- Instant feedback
- Explanations included

### ✅ Multi-Provider AI
- **Groq**: Fast, real-time
- **Gemini**: Free tier, versatile
- Choose or switch anytime

### ✅ Beautiful UI
- Modern gradient design
- Responsive (mobile/tablet/desktop)
- Smooth animations
- Professional appearance

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed (get from nodejs.org)
- API keys (see Step 1)

### Step 1: Get API Keys (2 min)
**Choose at least one:**

**Groq (Recommended for Speed)**
- Visit: https://console.groq.com
- Sign up/login
- Create API key
- Copy it

**Google Gemini (Free Tier)**
- Visit: https://makersuite.google.com/app/apikey
- Create new API key
- Copy it

### Step 2: Configure Environment (1 min)
```bash
# Navigate to project folder
cd "c:\Users\ASUS\OneDrive\Desktop\Igebra.ai Hackathon\Igebra.ai-Hackathon"

# Create environment file
copy .env.example .env.local

# Edit .env.local with your API keys
# Add GROQ_API_KEY and/or GOOGLE_GENERATIVE_AI_API_KEY
```

### Step 3: Install & Run (2 min)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Should show:
# > ready - started server on 0.0.0.0:3000
```

### Step 4: Use the App
Open your browser:
- **Homepage**: http://localhost:3000
- **Features**: http://localhost:3000/features
- **AI Tutor**: http://localhost:3000/tutor

---

## 🎮 How to Use

### On Homepage
1. See project overview
2. Choose AI provider (Groq or Gemini)
3. Click "Start Learning"

### In AI Tutor
1. Set your learning level
2. Enter topic (optional)
3. Ask any question
4. Get personalized response
5. Ask follow-up questions
6. Switch providers anytime

### Example Usage
```
Question: "Explain photosynthesis"
Level: "Beginner"
Topic: "Biology"

AI Response: "Photosynthesis is like a plant's way of making 
its own food using sunlight, water, and air..."
```

---

## 📱 Technology Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | Next.js 14 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **AI: Speed** | Groq API |
| **AI: Free Tier** | Google Gemini |
| **Deployment** | Vercel |

---

## 🚀 Next Steps

### To Continue Development:
```bash
# 1. Explore the code
# - Check app/page.tsx for homepage
# - Check app/tutor/page.tsx for tutor
# - Check app/api/* for backend

# 2. Modify as needed
# - Edit components
# - Add features
# - Customize styling

# 3. Test changes
npm run dev  # Already running, changes hot-reload

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

### To Deploy on Vercel:
```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repo
# 4. Add environment variables
# 5. Deploy!

# Your app will be live at:
# https://[project-name].vercel.app
```

---

## ❓ Troubleshooting

### "npm not found"
Install Node.js from https://nodejs.org

### "API returns error"
- Check API keys in `.env.local`
- Verify keys are valid
- Try different provider

### "Port 3000 in use"
```bash
npm run dev -- -p 3001
```

### "Styles not loading"
```bash
rm -r .next
npm run dev
```

More help: See **QUICKSTART.md** troubleshooting section

---

## 📊 Project Status

✅ **COMPLETE & READY**

- [x] All features implemented
- [x] Both AI providers integrated
- [x] Full documentation
- [x] Deployment-ready
- [x] Production-quality code
- [x] No hardcoded secrets
- [x] Type-safe throughout
- [x] Responsive design

---

## 🎓 For Hackathon Judges

### What to Evaluate
1. **UI/UX**: Beautiful gradient design, responsive, smooth animations
2. **Functionality**: AI tutor, quiz generation, provider switching all work
3. **Technical**: Next.js, TypeScript, Tailwind CSS, API routes
4. **AI**: Groq and Gemini both integrated and working
5. **Innovation**: Personalized learning at scale, solves real problem
6. **Documentation**: 1000+ lines across multiple guides
7. **Deployment**: Vercel-ready, environment-configured

### How to Test
1. Run: `npm install && npm run dev`
2. Visit: http://localhost:3000
3. Try homepage, features, tutor
4. Test different learning levels
5. Switch AI providers
6. Ask questions and get responses

### Success Indicators
✅ Homepage loads with features
✅ Can navigate to tutor page
✅ Can ask questions and get responses
✅ Can select different learning levels
✅ Can switch AI providers
✅ No console errors
✅ Responsive on different screen sizes

---

## 📞 Help & Support

### Documentation
1. **README.md** - Complete guide
2. **QUICKSTART.md** - Fast setup
3. **DOCUMENTATION.md** - Detailed docs
4. **PROJECT_SUMMARY.md** - Overview

### Code Comments
- Check function comments
- Review API route comments
- See component documentation

### Common Questions
- **How do I add authentication?** → See DOCUMENTATION.md Section 8
- **How do I connect a database?** → Structure supports MongoDB/PostgreSQL
- **How do I add more features?** → Code is well-organized for extension
- **How do I deploy?** → See QUICKSTART.md deployment section

---

## 🎯 What Happens Next

### Immediate (Now)
```bash
npm install
npm run dev
# Explore and test locally
```

### Short Term (This Week)
- Deploy to Vercel
- Share live link
- Get feedback
- Make improvements

### Medium Term (This Month)
- Add authentication
- Connect database
- Add more features
- Build community

### Long Term (Beyond)
- Scale to thousands
- Add advanced AI
- Build mobile app
- Create ecosystem

---

## 🌟 You're All Set!

Everything is ready to go. All you need to do is:

```bash
npm install
npm run dev
```

Then visit http://localhost:3000 and start exploring personalized AI-powered education!

---

## 📝 Important Files

**Start Here:**
- 📖 QUICKSTART.md
- 📖 README.md

**Learn About:**
- 📖 DOCUMENTATION.md
- 📖 PROJECT_SUMMARY.md

**For Hackathon:**
- 📖 SUBMISSION_CHECKLIST.md
- 📖 DOCUMENTATION.md (Evaluation Alignment)

**For Development:**
- 💻 Check `app/page.tsx` for homepage
- 💻 Check `app/tutor/page.tsx` for AI interface
- 💻 Check `app/api/` for backend

---

## 🎊 Thank You!

This project was built with ❤️ for the Igebra.ai Hackathon 2026.

**Theme**: Personalized Education - AI-Powered Learning and Teaching

**Goal**: Transform education through personalized AI-powered learning.

Now go build, deploy, and help students learn! 🚀

---

*Ready to get started?*

```bash
npm install && npm run dev
```

*Then visit: http://localhost:3000*

**Happy Learning! 🎓**
