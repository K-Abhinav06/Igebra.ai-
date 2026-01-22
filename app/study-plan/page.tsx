'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudyPlannerPage() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('2-weeks');
  const [level, setLevel] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const response = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, duration, level }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPlan(data);
      }
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            AI Study Planner
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Get a personalized learning roadmap powered by AI
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Input Form */}
        <div className="glass-effect p-8 rounded-xl mb-8 animate-slideInRight">
          <div className="space-y-6">
            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                📚 What do you want to learn?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Python Programming, Machine Learning, Web Development..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && generatePlan()}
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  ⏱️ Learning Duration
                </label>
                <div className="space-y-2">
                  {['1-week', '2-weeks', '1-month', '3-months'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="duration"
                        value={opt}
                        checked={duration === opt}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors capitalize">
                        {opt.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Learning Level */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  🎯 Your Level
                </label>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="level"
                        value={opt}
                        checked={level === opt}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors capitalize">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generatePlan}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  Generating your plan...
                </>
              ) : (
                <>
                  ✨ Generate Study Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {plan && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="glass-effect p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                Your {duration.replace('-', ' ')} Learning Plan
              </h2>

              {/* Check if plan is array (structured) or string (raw text) */}
              {Array.isArray(plan.plan) ? (
                <div className="space-y-6">
                  {plan.plan.map((week: any, index: number) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                      {/* Week Header */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                        <h3 className="text-xl font-bold text-blue-400">
                          Week {week.week}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          week.completed
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {week.completed ? '✓ Completed' : '○ In Progress'}
                        </span>
                      </div>

                      {/* Week Topic */}
                      {week.topic && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Topic</p>
                          <p className="text-white text-lg mt-1">{week.topic}</p>
                        </div>
                      )}

                      {/* Learning Objectives */}
                      {week.learningObjectives && week.learningObjectives.length > 0 && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Learning Objectives</p>
                          <ul className="space-y-2">
                            {week.learningObjectives.map((obj: string, i: number) => (
                              <li key={i} className="text-gray-200 flex items-start gap-2">
                                <span className="text-blue-400 mt-1">▸</span>
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tasks */}
                      {week.tasks && week.tasks.length > 0 && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Tasks & Practice</p>
                          <ul className="space-y-2">
                            {week.tasks.map((task: string, i: number) => (
                              <li key={i} className="text-gray-200 flex items-start gap-2">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Resources */}
                      {week.resources && week.resources.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Resources</p>
                          <ul className="space-y-2">
                            {week.resources.map((resource: string, i: number) => (
                              <li key={i} className="text-gray-200 flex items-start gap-2">
                                <span className="text-green-400 mt-1">📌</span>
                                <span>{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 text-gray-300 whitespace-pre-wrap">
                  {plan.plan || plan.response || plan.rawText || 'Plan generated'}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/tutor"
                className="block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-center transition-all duration-300"
              >
                💬 Chat with AI Tutor
              </Link>
              <button
                onClick={() => setPlan(null)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all duration-300"
              >
                🔄 Create Another Plan
              </button>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-effect p-6 rounded-xl text-center animate-slideInRight">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold mb-2">Personalized</h3>
            <p className="text-sm text-gray-300">
              Plans tailored to your level and available time
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center animate-slideInRight animation-delay-100">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold mb-2">Structured</h3>
            <p className="text-sm text-gray-300">
              Week-by-week breakdown with clear milestones
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center animate-slideInRight animation-delay-200">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold mb-2">Actionable</h3>
            <p className="text-sm text-gray-300">
              Specific topics, quizzes, and practice areas
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
