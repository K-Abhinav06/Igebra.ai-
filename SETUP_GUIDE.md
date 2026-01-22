# 🔧 Complete Setup Guide

A comprehensive guide to get EduAI running on your machine in minutes.

## ⚡ TL;DR - Super Quick Start

```bash
git clone https://github.com/K-Abhinav06/Igebra.ai-.git
cd Igebra.ai-Hackathon
npm install
cp .env.local.example .env.local
# Edit .env.local with your API keys
npm run dev
# Visit http://localhost:3000
```

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ **Node.js 18.17.0+** - [Download](https://nodejs.org/)
- ✅ **npm 9.0.0+** - Comes with Node.js
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **A text editor** - VS Code, WebStorm, etc.
- ✅ **Internet connection** - For API calls
- ⏱️ **5-10 minutes** - For setup
- 🔑 **3 API Keys** - See below

### Required API Keys (Free Tier Available)

1. **MongoDB** (Database)
   - [Sign up free](https://www.mongodb.com/cloud/atlas)
   - Free tier: 512 MB storage

2. **Groq** (Fast AI)
   - [Sign up free](https://console.groq.com)
   - Free tier: Limited requests/day

3. **Google Generative AI** (Advanced AI)
   - [Sign up free](https://makersuite.google.com/app/apikey)
   - Free tier: Limited requests/day

---

## 🛠️ Installation Steps

### Step 1: Clone Repository

```bash
# Open terminal/PowerShell
git clone https://github.com/K-Abhinav06/Igebra.ai-.git
cd Igebra.ai-Hackathon
```

### Step 2: Install Dependencies

```bash
npm install
```

This will download all required packages. May take 2-3 minutes.

### Step 3: Create Environment File

```bash
# Copy the template
cp .env.local.example .env.local

# Open .env.local in your editor and fill in values
# See next section for how to get each value
```

### Step 4: Configure API Keys

Open `.env.local` and fill in these values:

#### A. MongoDB URI
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduai?retryWrites=true&w=majority
```

**How to get**:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account → Create cluster → Connect
3. Copy connection string and replace username/password

#### B. Groq API Key
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

**How to get**:
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up → API Keys → Create Key
3. Copy the key

#### C. Google Generative AI Key
```env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get**:
1. Go to [makersuite.google.com](https://makersuite.google.com/app/apikey)
2. Create API Key → Copy it

#### D. App Configuration
```env
NEXT_PUBLIC_APP_NAME=EduAI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Keep these as-is for local development.

### Step 5: Start Development Server

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Environments: .env.local
```

### Step 6: Open in Browser

Visit: **http://localhost:3000**

You should see the EduAI homepage! 🎉

---

## ✅ Verify Everything Works

### Check 1: Homepage Loads
- [ ] Homepage displays without errors
- [ ] Navigation bar visible
- [ ] All buttons clickable

### Check 2: API Connectivity
- [ ] Try "Tutoring" feature
- [ ] Try "Quiz" feature
- [ ] Check browser console (F12) for errors

### Check 3: Database Connection
- [ ] Look for "Connected to MongoDB" in terminal
- [ ] No database connection errors

### Test Completion ✅
If all checks pass, you're ready to use EduAI!

---

## 📁 Project Structure

```
Igebra.ai-Hackathon/
├── app/
│   ├── api/              ← API endpoints
│   ├── components/       ← React components
│   ├── (features)/       ← Feature pages
│   └── page.tsx          ← Home page
├── lib/
│   ├── ai-providers.ts   ← AI integrations
│   ├── db.ts             ← Database
│   └── models.ts         ← Data models
├── .env.local            ← Your secrets (never commit!)
├── .env.local.example    ← Template
└── package.json
```

---

## 🚀 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check for code errors
npm run lint

# View all scripts
npm run
```

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: ".env.local not found"
**Solution**:
```bash
cp .env.local.example .env.local
# Then edit and fill in values
```

### Issue: "MONGODB_URI is not set"
**Solution**: Check if your `.env.local` has the correct variable name

### Issue: "API Key is invalid"
**Solution**: 
- Copy the key again carefully (no spaces)
- Verify it's active in the provider's dashboard
- Try generating a new key

### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: "Module not found"
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. **Explore Features**
   - Test Quiz generation
   - Try Tutoring
   - Generate Study Plans

2. **Review Code**
   - Check `/app/api/` for endpoints
   - Look at `/lib/` for utilities
   - Explore `/app/components/` for UI

3. **Read Documentation**
   - [README.md](./README.md) - Full guide
   - [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Detailed env setup
   - [API Documentation](./README.md#-api-documentation) - API endpoints

4. **Deploy (Later)**
   - See README.md deployment section
   - Configure production environment
   - Deploy to Vercel, Netlify, etc.

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💡 Pro Tips

✨ **Enable Debug Mode** (optional)
```env
DEBUG=true
LOG_LEVEL=debug
```

⚡ **Increase Token Limits** (for longer responses)
```env
MAX_AI_TOKENS=4000
```

🔐 **Security**: Never commit `.env.local`
- It's already in `.gitignore`
- Keep API keys private

---

## ❓ Need Help?

1. **Check Terminal**: Look for error messages
2. **Check Browser Console**: Press F12 for DevTools
3. **Read Docs**: Start with README.md
4. **Google Error**: Copy-paste error into search
5. **Create Issue**: [GitHub Issues](https://github.com/K-Abhinav06/Igebra.ai-/issues)

---

## 🎯 Success Indicators

✅ You're good to go when:

- Server starts without errors
- Homepage loads in browser
- No errors in browser console (F12)
- API calls return data
- No "undefined" values in UI

---

## 🎉 You're All Set!

Congratulations! You now have a fully functional AI-powered learning platform.

**Next**: Explore features, read the docs, or customize the code!

---

For detailed information on any topic, refer to:
- **Full Documentation**: [README.md](./README.md)
- **Environment Setup**: [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **Project Details**: [DOCUMENTATION.md](./DOCUMENTATION.md)

Happy Learning! 🚀
