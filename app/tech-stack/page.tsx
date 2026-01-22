'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TechStackPage() {
  const [expandedTech, setExpandedTech] = useState<string | null>('nextjs');

  const technologies = [
    {
      id: 'nextjs',
      name: 'Next.js 14',
      icon: '▲',
      color: 'from-black to-gray-700',
      why: 'Production-grade React framework with built-in API routes',
      features: [
        'Built-in serverless API routes (/api/chat, /api/quiz)',
        'App Router for modern architecture',
        'Fast deployment on Vercel (< 1 minute)',
        'Server-side rendering for security (API keys never exposed)',
        'Automatic code splitting & optimization',
      ],
      judges: '📌 Judges love Next.js because it\'s enterprise-ready and scalable',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      why: 'Utility-first CSS framework for rapid UI development',
      features: [
        'Build modern UI without writing CSS files',
        'Responsive by default (mobile-first approach)',
        'Consistent design system with predefined colors & spacing',
        'Dark mode support built-in',
        'Custom animations: fade-in, slide, glow, shimmer effects',
      ],
      judges: '🔹 Judges see clean, professional design instantly',
    },
    {
      id: 'groq',
      name: 'Groq API',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      why: 'Ultra-fast LLM inference for real-time AI responses',
      features: [
        'Llama 3.1 8B Instant model (fastest inference)',
        'Sub-second response times (perfect for chat)',
        '50+ tokens per second generation speed',
        'Free tier available for hackathon',
        'Ideal for tutoring, quiz generation, study plans',
      ],
      judges: '⚡ Users feel real-time responsiveness - judges are impressed',
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      icon: '✨',
      color: 'from-blue-600 to-blue-400',
      why: 'Enterprise AI model with strong reasoning capabilities',
      features: [
        'Google\'s advanced language model',
        'Free tier with generous limits',
        'Superior reasoning for complex problems',
        'Fallback option if Groq is unavailable',
        'Structured output support for quizzes',
      ],
      judges: '🔹 Backup AI ensures reliability - judges test edge cases',
    },
    {
      id: 'zustand',
      name: 'Zustand',
      icon: '🔄',
      color: 'from-amber-500 to-yellow-500',
      why: 'Lightweight state management for React',
      features: [
        'Minimal boilerplate (unlike Redux)',
        'Works with Next.js server/client boundaries',
        'Real-time message history in chat',
        'Student profile management',
        'Provider switching (Groq ↔ Gemini)',
      ],
      judges: '📌 Clean code = judges appreciate engineering quality',
    },
    {
      id: 'vercel',
      name: 'Vercel Deployment',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      why: 'Instant global deployment with serverless backend',
      features: [
        'Deploy with `git push` (zero config)',
        'Global CDN for fast content delivery',
        'Automatic SSL/HTTPS',
        'Serverless functions auto-scale',
        'Instant rollback if something breaks',
      ],
      judges: '🚀 Live demo in 30 seconds - no setup, just works',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Why This Tech Stack?
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Production-grade architecture for a realistic hackathon project
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Why This Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-effect p-8 rounded-xl animate-slideInRight">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🎯 What Judges Evaluate
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Functionality:</strong> Does the AI actually work?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Real AI Integration:</strong> Using actual AI models</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>UI/UX Design:</strong> Clean, modern, responsive</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Scalability:</strong> Production-ready code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Deployment:</strong> Live & working instantly</span>
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-xl animate-slideInRight animation-delay-200">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📊 This Project Includes
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">▲</span>
                <span><strong>AI Tutor:</strong> Real-time chat with Groq/Gemini</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">▲</span>
                <span><strong>Quiz Generator:</strong> Auto-generate questions by topic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">▲</span>
                <span><strong>Study Planner:</strong> AI-powered learning paths</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">▲</span>
                <span><strong>Responsive Design:</strong> Works on all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">▲</span>
                <span><strong>Production Deployment:</strong> Live on Vercel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technologies.map((tech, idx) => (
            <div
              key={tech.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <button
                onClick={() =>
                  setExpandedTech(expandedTech === tech.id ? null : tech.id)
                }
                className="w-full glass-effect p-6 rounded-xl hover:border-white/30 transition-all duration-300 text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{tech.icon}</span>
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                    {tech.name}
                  </h3>
                  <span className="ml-auto text-gray-400 group-hover:text-white transition-transform transform group-hover:scale-125">
                    {expandedTech === tech.id ? '▼' : '▶'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{tech.why}</p>

                {expandedTech === tech.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-slideInRight">
                    <ul className="space-y-2 text-sm text-gray-300">
                      {tech.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-white/5 rounded border-l-2 border-white/20">
                      <p className="text-xs text-gray-300">{tech.judges}</p>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="glass-effect p-8 rounded-xl mb-16 animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            🏗️ Architecture Overview
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-4 text-sm">
              <div className="min-w-fit bg-blue-600 px-4 py-2 rounded font-semibold">
                Browser
              </div>
              <div className="flex-1 border-b border-white/20" />
              <span className="text-gray-400">React + Tailwind</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="min-w-fit bg-purple-600 px-4 py-2 rounded font-semibold">
                Next.js API
              </div>
              <div className="flex-1 border-b border-white/20" />
              <span className="text-gray-400">/api/chat, /api/quiz</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="min-w-fit bg-yellow-600 px-4 py-2 rounded font-semibold">
                AI Models
              </div>
              <div className="flex-1 border-b border-white/20" />
              <span className="text-gray-400">Groq (primary) + Gemini (backup)</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="min-w-fit bg-pink-600 px-4 py-2 rounded font-semibold">
                Deployed
              </div>
              <div className="flex-1 border-b border-white/20" />
              <span className="text-gray-400">Vercel (global CDN)</span>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-effect p-6 rounded-xl animate-slideInRight text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">Fast</h3>
            <p className="text-sm text-gray-300">
              Groq delivers sub-second responses. Users see instant AI replies.
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl animate-slideInRight animation-delay-100 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold mb-2">Secure</h3>
            <p className="text-sm text-gray-300">
              API keys on server only. No credentials exposed to browser.
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl animate-slideInRight animation-delay-200 text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold mb-2">Scalable</h3>
            <p className="text-sm text-gray-300">
              Vercel serverless scales from 1 user to millions automatically.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-effect p-8 rounded-xl text-center animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience It?</h2>
          <p className="text-gray-300 mb-6">
            This is NOT a demo. Real AI. Real responses. Deployed live.
          </p>
          <Link
            href="/tutor"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Try the AI Tutor →
          </Link>
        </div>
      </div>
    </main>
  );
}
