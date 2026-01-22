# 📮 Postman API Testing Guide

## Setup Postman

1. **Download Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. **Open Postman** and create a new workspace
3. **Create a new Collection** called "EduAI APIs"

---

## 🔧 Environment Variables (Optional but Recommended)

In Postman, create an environment with these variables:

```
{
  "base_url": "http://localhost:3000",
  "userId": "user123",
  "groq_api_key": "your_groq_key",
  "google_api_key": "your_google_key"
}
```

Then use `{{base_url}}` in your URLs.

---

## 📌 API Endpoints Explained

### 1. 💬 **AI Tutoring - Chat with AI**

**Endpoint:** `POST http://localhost:3000/api/tutoring`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "message": "What is photosynthesis?",
  "level": "beginner",
  "topic": "Biology",
  "provider": "groq",
  "userId": "user123"
}
```

**Response:**
```json
{
  "response": "Photosynthesis is the process where plants convert sunlight into chemical energy..."
}
```

**Parameters:**
- `message` (required) - User's question
- `level` - "beginner" | "intermediate" | "advanced"
- `topic` - Subject area (optional)
- `provider` - "groq" | "gemini" (default: groq)
- `userId` - For saving to database (optional)

**Test Steps in Postman:**
1. Select `POST` method
2. Enter URL: `http://localhost:3000/api/tutoring`
3. Go to **Body** tab → Select **raw** → Select **JSON**
4. Paste the JSON body above
5. Click **Send**
6. See the AI response!

---

### 2. 🎯 **Quiz Generation - Create Quizzes**

**Endpoint:** `POST http://localhost:3000/api/quiz`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "topic": "Python Basics",
  "difficulty": "intermediate",
  "numQuestions": 5,
  "provider": "groq",
  "userId": "user123"
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "What does the 'len()' function do in Python?",
      "options": [
        "Returns the length of a string or list",
        "Deletes an object",
        "Creates a new list",
        "Converts to lowercase"
      ],
      "correct": 0,
      "explanation": "The len() function returns the number of items in an object..."
    }
  ]
}
```

**Parameters:**
- `topic` (required) - Subject to quiz on
- `difficulty` - "beginner" | "intermediate" | "advanced"
- `numQuestions` - Number of questions (default: 5)
- `provider` - "groq" | "gemini"
- `userId` - For saving to database (optional)

---

### 3. 📅 **Study Plan Generation**

**Endpoint:** `POST http://localhost:3000/api/study-plan`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "topic": "Web Development",
  "duration": "2-weeks",
  "level": "beginner",
  "provider": "groq",
  "userId": "user123"
}
```

**Response:**
```json
{
  "plan": "Week 1: HTML Basics\n- HTML structure and tags\n- Creating your first webpage\n- Semantic HTML\n..."
}
```

**Parameters:**
- `topic` (required) - What to learn
- `duration` - "1-week" | "2-weeks" | "1-month" | "3-months"
- `level` - "beginner" | "intermediate" | "advanced"
- `provider` - "groq" | "gemini"
- `userId` - For saving to database (optional)

---

### 4. 👤 **User Management - Create/Update User**

**Endpoint:** `POST http://localhost:3000/api/users`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "student@example.com",
  "name": "John Doe",
  "level": "intermediate",
  "preferredProvider": "groq",
  "topics": ["Python", "Web Development", "Data Science"]
}
```

**Response:**
```json
{
  "_id": "65d4e8f9c1a2b3e4f5g6h7i8",
  "email": "student@example.com",
  "name": "John Doe",
  "level": "intermediate",
  "preferredProvider": "groq",
  "topics": ["Python", "Web Development", "Data Science"],
  "createdAt": "2026-01-21T10:30:00.000Z",
  "updatedAt": "2026-01-21T10:30:00.000Z"
}
```

---

### 5. 📊 **Get User Learning History**

**Endpoint:** `GET http://localhost:3000/api/history?userId=user123&type=all`

**Parameters:**
- `userId` (required) - User ID
- `type` - "messages" | "quizzes" | "plans" | "all" (default: all)

**Response:**
```json
{
  "messages": [
    {
      "_id": "...",
      "userId": "user123",
      "role": "user",
      "content": "What is photosynthesis?",
      "topic": "Biology",
      "provider": "groq",
      "createdAt": "2026-01-21T10:30:00.000Z"
    }
  ],
  "quizzes": [],
  "studyPlans": []
}
```

---

### 6. 📈 **Get User Statistics**

**Endpoint:** `POST http://localhost:3000/api/history`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "userId": "user123"
}
```

**Response:**
```json
{
  "messageCount": 15,
  "quizCount": 3,
  "planCount": 2,
  "averageQuizScore": 85,
  "totalQuestionsAnswered": 25,
  "topicsStudied": ["Biology", "Physics", "Chemistry"]
}
```

---

## 🚀 Complete Postman Testing Workflow

### **Step 1: Create a User**
```
POST http://localhost:3000/api/users

{
  "email": "testuser@example.com",
  "name": "Test User",
  "level": "beginner",
  "preferredProvider": "groq",
  "topics": ["Python"]
}
```
Copy the `_id` from response - you'll use this as `userId`

### **Step 2: Chat with AI Tutor**
```
POST http://localhost:3000/api/tutoring

{
  "message": "Explain loops in Python",
  "level": "beginner",
  "topic": "Python",
  "provider": "groq",
  "userId": "YOUR_USER_ID_HERE"
}
```

### **Step 3: Generate a Quiz**
```
POST http://localhost:3000/api/quiz

{
  "topic": "Python",
  "difficulty": "beginner",
  "numQuestions": 3,
  "provider": "groq",
  "userId": "YOUR_USER_ID_HERE"
}
```

### **Step 4: Create Study Plan**
```
POST http://localhost:3000/api/study-plan

{
  "topic": "Python Basics",
  "duration": "1-week",
  "level": "beginner",
  "provider": "groq",
  "userId": "YOUR_USER_ID_HERE"
}
```

### **Step 5: Check Learning History**
```
GET http://localhost:3000/api/history?userId=YOUR_USER_ID_HERE&type=all
```

### **Step 6: Get Statistics**
```
POST http://localhost:3000/api/history

{
  "userId": "YOUR_USER_ID_HERE"
}
```

---

## ⚠️ Common Issues & Fixes

### **Issue 1: MongoDB Connection Error**
```
Error: Failed to create/update user
```
**Fix:** Add `MONGODB_URI` to `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduai
```

### **Issue 2: API Key Errors**
```
Error: Failed to generate quiz
```
**Fix:** Ensure API keys are in `.env.local`:
```
GROQ_API_KEY=your_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### **Issue 3: CORS Error**
If you get CORS errors, the issue is usually that:
- Dev server needs to be restarted after `.env.local` changes
- Make sure URL is exactly `http://localhost:3000`

---

## 📋 Postman Collection Template (JSON)

You can import this directly into Postman:

```json
{
  "info": {
    "name": "EduAI APIs",
    "description": "Collection for testing EduAI personalized education platform",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "url": {
          "raw": "http://localhost:3000/api/users",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users"]
        },
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\", \"name\": \"Test User\", \"level\": \"beginner\", \"preferredProvider\": \"groq\", \"topics\": [\"Python\"]}"
        }
      }
    },
    {
      "name": "Chat with Tutor",
      "request": {
        "method": "POST",
        "url": {
          "raw": "http://localhost:3000/api/tutoring",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "tutoring"]
        },
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"message\": \"Explain variables in Python\", \"level\": \"beginner\", \"topic\": \"Python\", \"provider\": \"groq\", \"userId\": \"user123\"}"
        }
      }
    },
    {
      "name": "Generate Quiz",
      "request": {
        "method": "POST",
        "url": {
          "raw": "http://localhost:3000/api/quiz",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "quiz"]
        },
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"topic\": \"Python\", \"difficulty\": \"beginner\", \"numQuestions\": 5, \"provider\": \"groq\", \"userId\": \"user123\"}"
        }
      }
    }
  ]
}
```

---

## ✅ Testing Checklist

- [ ] Dev server running on `http://localhost:3000`
- [ ] `.env.local` file created with API keys
- [ ] MongoDB URI configured
- [ ] Postman installed and collection created
- [ ] Test Create User endpoint
- [ ] Test Tutoring endpoint
- [ ] Test Quiz endpoint
- [ ] Test Study Plan endpoint
- [ ] Check database saved data
- [ ] Verify all error handling

---

## 🎉 Success Indicators

✅ User created successfully  
✅ AI returns response to tutoring message  
✅ Quiz generates with proper format  
✅ Study plan created  
✅ History endpoints return data  
✅ Statistics show correct counts

You're ready to test! 🚀
