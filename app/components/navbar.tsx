'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎓</span>
          </div>
          <h1 className="text-xl font-bold gradient-text">EduAI</h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            <Link
              href="/tutor"
              className={`text-sm font-semibold transition-colors ${
                isActive('/tutor')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              💬 Tutor
            </Link>
            <Link
              href="/study-plan"
              className={`text-sm font-semibold transition-colors ${
                isActive('/study-plan')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📅 Study Plan
            </Link>
            <Link
              href="/resources"
              className={`text-sm font-semibold transition-colors ${
                isActive('/resources')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📚 Resources
            </Link>
            <Link
              href="/features"
              className={`text-sm font-semibold transition-colors ${
                isActive('/features')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ✨ Features
            </Link>
            <Link
              href="/tech-stack"
              className={`text-sm font-semibold transition-colors ${
                isActive('/tech-stack')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ⚙️ Tech Stack
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex gap-2">
            <Link href="/tutor" className="text-sm font-semibold px-3 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors">
              Tutor
            </Link>
            <Link href="/study-plan" className="text-sm font-semibold px-3 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors">
              Plan
            </Link>
            <Link href="/resources" className="text-sm font-semibold px-3 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
