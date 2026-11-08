import React from 'react';
import { Terminal, BookOpen, Code2, Cpu, Sparkles, User, Trophy, LogOut } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xp: number;
  user: { firstName: string; lastName: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, xp, user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              PyMaster <span className="text-emerald-600 dark:text-emerald-400">UZ</span>
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Python Akademiyasi
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'home'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Bosh sahifa
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'courses'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Kurslar
          </button>
          <button
            onClick={() => setActiveTab('ide')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'ide'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-4 h-4 text-teal-600" />
            Jonli IDE
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-600" />
            Amaliy Loyihalar
          </button>
          <button
            onClick={() => setActiveTab('ai-tutor')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'ai-tutor' || activeTab === 'code-review'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI Ustoz
          </button>
        </nav>

        {/* Zone 3: Primary Action & XP Badge & User */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
          >
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
              {xp} XP
            </span>
          </div>

          {user && (
            <div 
              onClick={() => setActiveTab('profile')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>{user.firstName} {user.lastName}</span>
            </div>
          )}

          <button
            onClick={() => setActiveTab('courses')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shadow-sm"
          >
            O'qish
          </button>
        </div>

      </div>
    </header>
  );
};
