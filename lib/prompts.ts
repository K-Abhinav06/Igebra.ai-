/**
 * AI Prompting Utilities
 * Helper functions for creating effective prompts for tutoring and assessment
 */

export interface LearningContext {
  level: 'beginner' | 'intermediate' | 'advanced';
  style?: 'visual' | 'auditory' | 'kinesthetic' | 'reading-writing';
  topic?: string;
  previousAnswers?: string[];
}

/**
 * Create a system prompt for tutoring based on learning context
 */
export function createTutoringSystemPrompt(context: LearningContext): string {
  const levelDescriptions = {
    beginner: 'beginner level with simple, clear language using everyday analogies',
    intermediate: 'intermediate level with technical terms but clear explanations',
    advanced: 'advanced level with sophisticated concepts and research references',
  };

  const styleGuides = {
    visual: 'Use diagrams, visual analogies, and spatial descriptions.',
    auditory: 'Use conversational tone, rhetorical questions, and rhythm.',
    kinesthetic: 'Use interactive examples, step-by-step processes, and hands-on activities.',
    'reading-writing': 'Provide detailed explanations, structured notes, and written resources.',
  };

  let prompt = `You are an expert AI tutor specializing in personalized education.

Teaching Level: ${levelDescriptions[context.level]}
${context.topic ? `Topic of Expertise: ${context.topic}` : ''}
${context.style ? `Learning Style: ${styleGuides[context.style]}` : ''}

Guidelines:
- Adapt complexity to the student's level
- Use examples relevant to the student's interests
- Check understanding frequently
- Break down complex concepts into steps
- Encourage critical thinking
- Be patient and supportive`;

  return prompt;
}

/**
 * Create a prompt for generating adaptive quizzes
 */
export function createQuizGenerationPrompt(
  topic: string,
  difficulty: string,
  numQuestions: number = 5
): string {
  return `Generate exactly ${numQuestions} multiple-choice quiz questions about "${topic}" at ${difficulty} level.

Format: Return ONLY valid JSON array with this exact structure:
[
  {
    "question": "Clear question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why this option is correct and why others are wrong"
  }
]

Requirements:
- Options should be plausible but clearly different
- Avoid trick questions
- Include one explanation per question
- Correct answer index should vary
- Return ONLY JSON, no markdown or extra text`;
}

/**
 * Create a prompt for concept explanation
 */
export function createConceptExplanationPrompt(
  concept: string,
  context: LearningContext
): string {
  return `Explain the concept of "${concept}" in a way that is appropriate for a ${context.level} learner${
    context.style ? ` who prefers ${context.style} learning` : ''
  }.

Include:
1. Simple definition
2. Real-world example
3. Why it matters
4. Common misconceptions to avoid${context.level === 'advanced' ? '\n5. Advanced applications' : ''}

Keep the explanation clear and engaging.`;
}

/**
 * Create a prompt for step-by-step problem solving
 */
export function createProblemSolvingPrompt(
  problem: string,
  context: LearningContext
): string {
  return `Help solve this problem: "${problem}"

For a ${context.level} learner${context.topic ? ` studying ${context.topic}` : ''}:

1. Break down the problem
2. Identify key concepts needed
3. Show step-by-step solution
4. Verify the answer
5. Explain the reasoning

Learning level guidance:
${
  context.level === 'beginner'
    ? '- Use basic terminology\n- Show every small step\n- Include visual descriptions'
    : context.level === 'intermediate'
      ? '- Use standard terminology\n- Show key steps\n- Assume basic knowledge'
      : '- Use technical terminology\n- Show strategic steps\n- Include optimization notes'
}`;
}

/**
 * Create a prompt for assessment feedback
 */
export function createAssessmentFeedbackPrompt(
  studentAnswer: string,
  correctAnswer: string,
  topic: string
): string {
  return `Provide constructive feedback for a student's answer.

Topic: ${topic}
Student's Answer: "${studentAnswer}"
Correct Answer: "${correctAnswer}"

Feedback should:
1. Acknowledge what the student got right
2. Explain what was incorrect
3. Guide toward the correct understanding
4. Suggest how to remember this better
5. Provide a related follow-up question

Be encouraging and supportive.`;
}

/**
 * Create a prompt for learning path recommendations
 */
export function createLearningPathPrompt(
  learnerGoal: string,
  currentLevel: string,
  context: LearningContext
): string {
  return `Create a personalized learning path for a ${currentLevel} learner with the goal: "${learnerGoal}"

Learning style: ${context.style || 'not specified'}
${context.previousAnswers ? `Previous topics studied: ${context.previousAnswers.join(', ')}` : ''}

Provide:
1. 5-7 key milestones
2. Prerequisite knowledge needed
3. Suggested learning order
4. Estimated time for each phase
5. Resources or practice areas
6. How to track progress

Format as a clear, actionable plan.`;
}

/**
 * Sanitize and validate user input before sending to AI
 */
export function sanitizeUserInput(input: string): string {
  return input
    .trim()
    .slice(0, 5000) // Limit length
    .replace(/[<>]/g, '') // Remove potential HTML/script tags
    .replace(/\n\n\n+/g, '\n\n'); // Limit newlines
}

/**
 * Extract JSON from potentially imperfect AI responses
 */
export function extractJSON(text: string): any {
  try {
    // Try direct parsing first
    return JSON.parse(text);
  } catch {
    // Try to find JSON in text
    const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Format AI response for better readability
 */
export function formatAIResponse(response: string): string {
  // Add line breaks after sentences for better readability
  return response
    .replace(/\. ([A-Z])/g, '.\n\n$1')
    .replace(/\n\n\n+/g, '\n\n');
}

export default {
  createTutoringSystemPrompt,
  createQuizGenerationPrompt,
  createConceptExplanationPrompt,
  createProblemSolvingPrompt,
  createAssessmentFeedbackPrompt,
  createLearningPathPrompt,
  sanitizeUserInput,
  extractJSON,
  formatAIResponse,
};
