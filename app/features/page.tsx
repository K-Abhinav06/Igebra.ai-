'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      title: 'AI-Powered Tutor',
      description: 'Get real-time personalized tutoring from advanced AI models.',
      icon: '🤖',
      details: [
        'Real-time explanations tailored to your level',
        'Multi-language support for diverse learners',
        'Context-aware responses based on topic',
        'Follow-up question handling',
      ],
      color: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Adaptive Quizzes',
      description: 'Quizzes that adapt difficulty based on your performance.',
      icon: '🎯',
      details: [
        'Difficulty scaling based on performance',
        'Instant feedback with explanations',
        'Progress tracking and analytics',
        'Customizable question count',
      ],
      color: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Learning Analytics',
      description: 'Track your progress with detailed insights.',
      icon: '📊',
      details: [
        'Real-time performance metrics',
        'Learning pattern analysis',
        'Strength and weakness identification',
        'Personalized recommendations',
      ],
      color: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Multi-Provider AI',
      description: 'Choose between Groq for speed or Gemini for versatility.',
      icon: '🔄',
      details: [
        'Groq: Ultra-fast inference (50+ tokens/sec)',
        'Gemini: Free tier with advanced capabilities',
        'Seamless provider switching',
        'No API key required for demo',
      ],
      color: 'from-orange-600 to-red-600',
    },
    {
      title: 'Responsive Design',
      description: 'Access your learning on any device.',
      icon: '📱',
      details: [
        'Mobile-optimized interface',
        'Dark mode support',
        'Smooth animations & transitions',
        'Accessibility first approach',
      ],
      color: 'from-indigo-600 to-blue-600',
    },
    {
      title: 'Content Personalization',
      description: 'Learning materials adapt to your style.',
      icon: '🎨',
      details: [
        'Learning style detection',
        'Interest-based recommendations',
        'Pace adaptation',
        'Customizable experience',
      ],
      color: 'from-pink-600 to-rose-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl gradient-text">EduAI</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="btn-secondary hidden sm:block">
              Home
            </Link>
            <Link href="/tutor" className="btn-primary">
              Start Learning
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 gradient-text">
            Powerful Features for Every Learner
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience personalized education powered by cutting-edge AI technology
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedFeature(idx)}
                  className={`card-glow p-6 cursor-pointer transition-all duration-300 ${
                    selectedFeature === idx
                      ? 'border-purple-500 bg-purple-500/20 scale-105'
                      : 'border-white/10 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="card-glow p-8 h-fit sticky top-32">
              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${features[selectedFeature].color} mb-6`}>
                <span className="font-semibold">Feature Details</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-4">{features[selectedFeature].title}</h2>
              <p className="text-gray-300 mb-8">{features[selectedFeature].description}</p>
              
              <div className="space-y-3 mb-8">
                {features[selectedFeature].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>

              <Link href="/tutor" className="btn-primary w-full justify-center">
                Try This Feature
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Built with Modern Technology</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Next.js', icon: '⚡', desc: 'Full-stack framework' },
              { name: 'TypeScript', icon: '📘', desc: 'Type safety' },
              { name: 'Tailwind', icon: '🎨', desc: 'Styling' },
              { name: 'Groq API', icon: '🚀', desc: 'Fast inference' },
              { name: 'Gemini AI', icon: '🤖', desc: 'Powerful AI' },
              { name: 'Vercel', icon: '▲', desc: 'Deployment' },
            ].map((tech, idx) => (
              <div key={idx} className="card-glow p-6 text-center hover:scale-110 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="font-semibold mb-1">{tech.name}</p>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto card-glow p-12 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Learning?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Start your personalized learning journey with AI today
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/tutor" className="btn-primary">
              Launch AI Tutor
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 EduAI. Personalized Education Powered by AI.</p>
        </div>
      </footer>
    </main>
  );
}
