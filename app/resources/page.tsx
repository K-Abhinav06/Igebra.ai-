'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Resource {
  title: string;
  type: 'video' | 'article' | 'tutorial' | 'documentation' | 'practice';
  url: string;
  description: string;
  platform: string;
  difficulty: string;
  icon: string;
}

export default function ResourcesPage() {
  const [topic, setTopic] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setResources(data.resources || []);

      if (data.resources.length === 0) {
        setError('No resources found for this topic');
      }
    } catch (err) {
      setError('Failed to fetch resources');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      video: 'bg-red-100 text-red-700 border-red-300',
      article: 'bg-blue-100 text-blue-700 border-blue-300',
      tutorial: 'bg-green-100 text-green-700 border-green-300',
      documentation: 'bg-purple-100 text-purple-700 border-purple-300',
      practice: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl text-slate-900">EduAI Resources</span>
          </Link>
          <Link href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-900 transition-colors">
            ← Back Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">📚 Learning Resources Hub</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover curated YouTube videos, articles, tutorials, and practice platforms to accelerate your learning
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                🔍 What would you like to learn?
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Python, JavaScript, Machine Learning, Web Development..."
                  style={{
                    color: '#1e293b',
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                  }}
                  className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-colors"
                >
                  {isLoading ? '🔄 Searching...' : '🚀 Find Resources'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Resources Grid */}
        {resources.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Found {resources.length} Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all p-6 group"
                >
                  {/* Type Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(resource.type)} uppercase`}>
                      {resource.type}
                    </span>
                    <span className="text-2xl">{resource.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {resource.platform}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-semibold">
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Visit Resource</span>
                    <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && resources.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Start Learning Today</h3>
            <p className="text-slate-600">Search for any topic above to discover curated learning resources</p>
          </div>
        )}

        {/* Featured Topics */}
        {!isLoading && resources.length === 0 && !error && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">📌 Popular Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Python',
                'JavaScript',
                'Web Development',
                'Machine Learning',
                'Data Science',
                'React',
                'SQL',
                'Cloud Computing',
              ].map((popularTopic) => (
                <button
                  key={popularTopic}
                  onClick={() => {
                    setTopic(popularTopic);
                    // Trigger search
                    const form = document.querySelector('form') as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  className="p-4 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-slate-900 font-semibold"
                >
                  {popularTopic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
