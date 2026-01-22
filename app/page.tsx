'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

export default function Home() {
  const [apiProvider, setApiProvider] = useState<'groq' | 'gemini'>('groq');
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }

    // Check if provider preference is saved
    const savedProvider = localStorage.getItem('apiProvider');
    if (savedProvider) {
      setApiProvider(savedProvider as 'groq' | 'gemini');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProvider = e.target.value as 'groq' | 'gemini';
    setApiProvider(newProvider);
    localStorage.setItem('apiProvider', newProvider);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header with Auth */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl text-slate-900">EduAI</span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <>
                <span className="text-sm text-slate-700">
                  👤 {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <span className="text-purple-300 text-sm font-semibold">✨ AI-Powered Learning</span>
              </div>
              
              <h2 className="text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text animate-gradient">Personalized</span> Learning Powered by{' '}
                <span className="gradient-text animate-gradient">AI</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your education with adaptive AI tutoring. Learn at your pace, your style, your level. 
                Get instant personalized explanations, adaptive quizzes, and real-time feedback.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/tutor" className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
                <Link href="/study-plan" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-semibold transition-all duration-300">
                  Create Study Plan
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '50K+', label: 'Active Students' },
                  { value: '10K+', label: 'Lessons' },
                  { value: '98%', label: 'Satisfaction' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center fade-in-delay">
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Provider Selection */}
            <div className="fade-in-delay">
              <div className="card-glow p-8 h-full flex flex-col">
                <h3 className="text-3xl font-bold mb-8">Choose Your AI Engine</h3>
                <div className="space-y-4 flex-1">
                  {[
                    {
                      id: 'groq',
                      name: 'Groq API',
                      description: 'Ultra-fast inference (⚡ Recommended)',
                      icon: '⚡',
                      color: 'from-blue-600 to-blue-400',
                    },
                    {
                      id: 'gemini',
                      name: 'Google Gemini',
                      description: 'Free & powerful AI model',
                      icon: '🤖',
                      color: 'from-purple-600 to-purple-400',
                    },
                  ].map((provider) => (
                    <label
                      key={provider.id}
                      className={`flex items-center p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 glass-effect-dark group hover:border-purple-500/50 ${
                        apiProvider === provider.id 
                          ? 'border-purple-500 bg-purple-500/15 shadow-lg shadow-purple-500/20' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <input
                          type="radio"
                          name="provider"
                          value={provider.id}
                          checked={apiProvider === provider.id}
                          onChange={handleProviderChange}
                          className="w-6 h-6 cursor-pointer accent-blue-500"
                        />
                        {apiProvider === provider.id && (
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${provider.color} opacity-20 animate-pulse`}></div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{provider.icon}</span>
                          <p className="font-bold text-lg text-white">{provider.name}</p>
                        </div>
                        <p className="text-sm text-gray-400">{provider.description}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${provider.color} group-hover:scale-150 transition-transform flex-shrink-0`}></div>
                    </label>
                  ))}
                </div>
                <Link
                  href="/tutor"
                  className="btn-primary w-full mt-8 justify-center"
                >
                  Start with {apiProvider === 'groq' ? 'Groq' : 'Gemini'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4 gradient-text">Why Choose EduAI?</h3>
            <p className="text-xl text-gray-400">Everything you need for personalized learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI Tutor',
                description: 'Get instant answers to any question with personalized explanations adapted to your level.',
              },
              {
                icon: '📊',
                title: 'Smart Analytics',
                description: 'Track your progress with detailed insights into your learning patterns and strengths.',
              },
              {
                icon: '🎯',
                title: 'Adaptive Quizzes',
                description: 'Quizzes that adjust difficulty based on your performance for optimal learning.',
              },
              {
                icon: '⚡',
                title: 'Real-time',
                description: 'Get instant feedback and explanations without any waiting time.',
              },
              {
                icon: '🌍',
                title: '24/7 Available',
                description: 'Learn anytime, anywhere with our always-on AI tutoring system.',
              },
              {
                icon: '💡',
                title: 'Multiple Styles',
                description: 'Explanations tailored to your learning style - visual, auditory, kinesthetic, or text-based.',
              },
              {
                icon: '📚',
                title: 'Resources Hub',
                description: 'Curated YouTube videos, articles, tutorials, and practice platforms for deeper learning.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="fade-in-delay card-glow p-8 group">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="card-glow p-12 text-center">
            <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students getting personalized AI-powered education today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/tutor" className="btn-primary">
                Start Learning Free
              </Link>
              <Link href="/resources" className="btn-secondary">
                📚 Explore Resources
              </Link>
              <Link href="/features" className="btn-secondary">
                Explore Features
              </Link>
              <Link href="/tech-stack" className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition-all duration-300">
                View Tech Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'FAQ'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
              { title: 'Follow', links: ['Twitter', 'LinkedIn', 'GitHub'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-gray-400 hover:text-gray-300">
                  {col.links.map((link, i) => (
                    <li key={i} className="cursor-pointer hover:text-white transition-colors">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2026 EduAI. Personalized Education Powered by AI.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
