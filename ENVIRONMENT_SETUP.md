# 🔧 Environment Variables Setup Guide

This guide walks you through setting up all required environment variables for EduAI.

## 📋 Quick Reference

| Variable | Required | Type | Example |
|----------|----------|------|---------|
| `MONGODB_URI` | ✅ | string | `mongodb+srv://...` |
| `GROQ_API_KEY` | ✅ | string | `gsk_...` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | ✅ | string | `AIza...` |
| `NEXT_PUBLIC_APP_NAME` | ⚠️ | string | `EduAI` |
| `NEXT_PUBLIC_APP_URL` | ⚠️ | string | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ❌ | string | Random 32-char string |
| `NEXTAUTH_URL` | ❌ | string | `http://localhost:3000` |

**Legend**: ✅ = Required, ⚠️ = Recommended, ❌ = Optional

---

## 🚀 Step-by-Step Setup

### 1. MongoDB Setup

#### A. Create MongoDB Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** (or Log In if you have an account)
3. Fill in your email, password, and name
4. Accept terms and click **Create Account**

#### B. Create a Cluster

1. On the welcome screen, click **Create a Deployment**
2. Choose **M0 Free Tier** for free hosting
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click **Create Deployment**
6. Wait 5-10 minutes for the cluster to be ready

#### C. Get Connection String

1. Click **Connect** on your cluster
2. Choose **Drivers** connection method
3. Select **Node.js** and version **5.x or later**
4. Copy the connection string

#### D. Set Database Credentials

1. In the connection string, replace:
   - `<username>` with your MongoDB username
   - `<password>` with your MongoDB password
   - `<cluster-name>` with your cluster name (from the URI)

Example after replacement:
```
mongodb+srv://john_doe:SecurePassword123@cluster0.mongodb.net/eduai?retryWrites=true&w=majority
```

#### E. Whitelist Your IP

1. Go to **Network Access** in MongoDB Atlas
2. Click **Add IP Address**
3. Choose **Allow access from anywhere** (0.0.0.0/0) for development
4. For production, add your server's IP address
5. Click **Confirm**

---

### 2. Groq API Setup

#### A. Create Groq Account

1. Visit [console.groq.com](https://console.groq.com)
2. Click **Sign Up**
3. Fill in your details and verify your email
4. Complete profile setup

#### B. Create API Key

1. Go to **API Keys** section (usually in settings)
2. Click **Create New API Key** or **Generate API Key**
3. Name it (e.g., "EduAI Development")
4. Copy the entire key (starts with `gsk_`)

#### C. Store the Key

Add to your `.env.local`:
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Important**: Keep this key private! Never share or commit it to git.

---

### 3. Google Generative AI (Gemini) Setup

#### A. Create Google Cloud Account

1. Go to [makersuite.google.com](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Select your project (create new if needed)
4. Click **Create API Key in new project**

#### B. Get Your API Key

1. A dialog will show your API key
2. Copy the entire key (starts with `AIza`)
3. Save it securely

#### C. Store the Key

Add to your `.env.local`:
```env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Important**: Keep this key private! Never share or commit it to git.

#### D. Enable Required APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Search for **Generative Language API**
3. Click **Enable**
4. The API will be automatically enabled for your project

---

### 4. Application Configuration

Set these in your `.env.local`:

```env
# Application name (displayed in UI)
NEXT_PUBLIC_APP_NAME=EduAI

# Your application URL
# For local development: http://localhost:3000
# For production: https://yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 5. Authentication Setup (Optional but Recommended)

#### A. Generate Secret

**Windows (PowerShell):**
```powershell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**macOS/Linux:**
```bash
openssl rand -base64 32
```

#### B. Add to `.env.local`

```env
NEXTAUTH_SECRET=<your_generated_secret_here>
NEXTAUTH_URL=http://localhost:3000
```

---

## 📝 Complete `.env.local` Example

Here's a complete working example:

```env
# Database
MONGODB_URI=mongodb+srv://john_doe:MySecurePassword@cluster0.mongodb.net/eduai?retryWrites=true&w=majority

# AI Keys
GROQ_API_KEY=gsk_cZj5nL9xKm2pQ8vR3sW4tY5uZ
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyBHA-aJgKAFLmzMgbpSSjRHKYF_KVLCv4g

# Application
NEXT_PUBLIC_APP_NAME=EduAI
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth (Optional)
NEXTAUTH_SECRET=Lr8BpH3jKx9nM2dW5qT7vZ1cR6sY0uF4gJ3mN8pQ
NEXTAUTH_URL=http://localhost:3000
```

---

## ✅ Verification Checklist

After setting up all variables:

- [ ] `.env.local` file exists in the root directory
- [ ] All required variables are filled in (no `your_...` placeholders)
- [ ] `.env.local` is in `.gitignore`
- [ ] MongoDB connection string is valid
- [ ] Groq API key is valid
- [ ] Google API key is valid
- [ ] MongoDB IP whitelist includes your current IP
- [ ] No typos in variable names

---

## 🧪 Testing Your Configuration

### Test MongoDB Connection

```bash
npm run dev
```

Look for console messages confirming MongoDB connection.

### Test API Keys

1. Start the development server: `npm run dev`
2. Go to http://localhost:3000
3. Try the tutoring or quiz features
4. Check browser console for errors

If you see API errors:
- Verify all keys are copied correctly (no extra spaces)
- Check API key is active in respective dashboards
- Verify rate limits haven't been exceeded

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (Network Access)
- Ensure cluster is running (not paused)
- Verify username/password credentials
- Wait a few minutes after creating cluster

### Groq API Key Invalid

**Error**: `401 Unauthorized` or `Invalid API Key`

**Solutions**:
- Copy key again without extra spaces
- Verify key hasn't been revoked in Groq dashboard
- Check for typos
- Generate a new key if needed

### Google API Key Limits Exceeded

**Error**: `RESOURCE_EXHAUSTED: The resource has been exhausted`

**Solutions**:
- Check usage in [Google Cloud Console](https://console.cloud.google.com)
- Apply for higher quota if needed
- Wait for usage to reset (if on free tier)
- Consider upgrading to paid plan

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Groq API Documentation](https://console.groq.com/docs)
- [Google Generative AI Docs](https://ai.google.dev/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## 🔒 Security Best Practices

1. **Never commit `.env.local` to git** - It's in `.gitignore` for a reason
2. **Never share API keys** - Treat them like passwords
3. **Rotate keys regularly** - For production deployments
4. **Use different keys for dev/prod** - Don't reuse keys across environments
5. **Monitor API usage** - Watch for suspicious activity
6. **Keep secrets out of logs** - Don't log sensitive data

---

## ❓ Need Help?

- Check the main [README.md](./README.md)
- Review [API Documentation](./README.md#-api-documentation)
- Create an [issue on GitHub](https://github.com/K-Abhinav06/Igebra.ai-/issues)
- Check existing documentation files in the project

---

**Last Updated**: January 2026

