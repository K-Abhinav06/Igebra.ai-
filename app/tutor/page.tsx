'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TextInput } from '@/app/components/TextInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiProvider, setApiProvider] = useState<'groq' | 'gemini'>('groq');
  const [level, setLevel] = useState('intermediate');
  const [topic, setTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          level,
          topic,
          provider: apiProvider,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I could not generate a response.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Error: Could not connect to the AI service. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
    }
  };

  const getLevelColor = (selectedLevel: string) => {
    switch (selectedLevel) {
      case 'beginner':
        return 'from-green-500 to-green-600';
      case 'intermediate':
        return 'from-blue-500 to-blue-600';
      case 'advanced':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <style>{`
        * input[type="text"] {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-size: 16px !important;
          background-color: #ffffff !important;
          background-image: none !important;
          text-shadow: none !important;
          text-decoration: none !important;
          -webkit-appearance: none !important;
        }
        input[type="text"]::selection {
          background-color: #3b82f6 !important;
          color: #000000 !important;
        }
        input[type="text"]::-webkit-outer-spin-button,
        input[type="text"]::-webkit-inner-spin-button {
          display: none !important;
        }
        input[type="text"]::-webkit-autofill,
        input[type="text"]::-webkit-autofill:hover,
        input[type="text"]::-webkit-autofill:focus,
        input[type="text"]::-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #000000 !important;
        }
      `}</style>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl text-slate-900">EduAI Tutor</span>
          </Link>
          <Link href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-900 transition-colors">
            ← Back Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6 text-slate-900">⚙️ Settings</h3>

              {/* AI Provider */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  🤖 AI Provider
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'groq', label: 'Groq (Fast ⚡)', desc: 'Quick responses' },
                    { value: 'gemini', label: 'Gemini (Smart)', desc: 'Advanced reasoning' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer hover:bg-slate-50 p-2 rounded border border-transparent hover:border-slate-200">
                      <input
                        type="radio"
                        name="provider"
                        value={option.value}
                        checked={apiProvider === (option.value as 'groq' | 'gemini')}
                        onChange={(e) => setApiProvider(e.target.value as 'groq' | 'gemini')}
                        className="w-4 h-4"
                      />
                      <div className="ml-2">
                        <span className="text-sm font-medium text-slate-700">{option.label}</span>
                        <p className="text-xs text-slate-500">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Learning Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  📚 Learning Level
                </label>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map((lv) => (
                    <button
                      key={lv}
                      onClick={() => setLevel(lv)}
                      className={`w-full px-3 py-2 rounded-lg font-medium text-white transition-all ${
                        level === lv
                          ? `bg-gradient-to-r ${getLevelColor(lv)} shadow-lg scale-105`
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    >
                      {lv.charAt(0).toUpperCase() + lv.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  📖 Topic (Optional)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Python, Math..."
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    color: '#000 !important',
                    WebkitTextFillColor: '#000 !important',
                    backgroundColor: '#fff !important',
                    padding: '8px 12px',
                    borderWidth: '2px',
                    borderColor: '#7c3aed',
                    borderStyle: 'solid',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '16px !important',
                    fontWeight: 'bold !important',
                    lineHeight: '1.5 !important',
                  } as any}
                />
              </div>

              {/* Stats */}
              {messages.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700 mb-2">
                    <span className="font-semibold">💬 Messages:</span> {messages.length}
                  </p>
                  <p className="text-sm text-slate-700 mb-3">
                    <span className="font-semibold">📊 Questions:</span> {Math.ceil(messages.length / 2)}
                  </p>
                  <button
                    onClick={clearChat}
                    className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    🗑️ Clear Chat
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-slate-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💡</div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Learn?</h2>
                      <p className="text-slate-600 mb-4">Ask me anything about {topic || 'any topic'}</p>
                      <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-slate-700">
                          💡 <span className="font-semibold">Tip:</span> Be specific with your questions for better explanations
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      >
                        <div
                          className={`max-w-md px-4 py-3 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-md'
                              : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200 shadow-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg rounded-bl-none border border-slate-200">
                          <div className="flex gap-2">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                              ●
                            </span>
                            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                              ●
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 bg-white rounded-b-xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your question..."
                    disabled={isLoading}
                    autoComplete="off"
                    spellCheck="false"
                    style={{
                      color: '#000 !important',
                      WebkitTextFillColor: '#000 !important',
                      backgroundColor: '#fff !important',
                      padding: '10px 14px',
                      borderWidth: '2px',
                      borderColor: '#3b82f6',
                      borderStyle: 'solid',
                      borderRadius: '8px',
                      flex: 1,
                      fontSize: '16px !important',
                      fontWeight: 'bold !important',
                      lineHeight: '1.5 !important',
                      letterSpacing: 'normal !important',
                    } as any}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white rounded-lg font-semibold transition-all disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? '⏳' : '📤'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
