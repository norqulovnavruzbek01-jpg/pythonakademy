import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { CoursesView } from './components/CoursesView';
import { PythonIDEView } from './components/PythonIDEView';
import { MultiIDEView } from './components/MultiIDEView';
import { ProjectsView } from './components/ProjectsView';
import { AITutorView } from './components/AITutorView';
import { ProfileView } from './components/ProfileView';
import { RegisterModal } from './components/RegisterModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(() => {
    const saved = localStorage.getItem('pymaster_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('pymaster_xp');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('pymaster_lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedProjects, setCompletedProjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('pymaster_projects');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pymaster_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pymaster_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pymaster_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('pymaster_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('pymaster_projects', JSON.stringify(completedProjects));
  }, [completedProjects]);

  const handleRegister = (firstName: string, lastName: string) => {
    setUser({ firstName, lastName });
  };

  const handleLogout = () => {
    setUser(null);
    setXp(0);
    setCompletedLessons([]);
    setCompletedProjects([]);
    localStorage.clear();
  };

  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setXp(prev => prev + xpEarned);
    }
  };

  const handleCompleteProject = (projectId: string, xpEarned: number) => {
    if (!completedProjects.includes(projectId)) {
      setCompletedProjects(prev => [...prev, projectId]);
      setXp(prev => prev + xpEarned);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {!user && <RegisterModal onRegister={handleRegister} />}

      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} xp={xp} user={user} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeHero setActiveTab={setActiveTab} completedCount={completedLessons.length} />
        )}
        {activeTab === 'courses' && (
          <CoursesView onCompleteLesson={handleCompleteLesson} completedLessons={completedLessons} />
        )}
        {activeTab === 'ide' && (
          <MultiIDEView />
        )}
        {activeTab === 'projects' && (
          <ProjectsView onCompleteProject={handleCompleteProject} completedProjects={completedProjects} />
        )}
        {(activeTab === 'ai-tutor' || activeTab === 'code-review') && (
          <AITutorView />
        )}
        {activeTab === 'profile' && (
          <ProfileView xp={xp} completedLessons={completedLessons} completedProjects={completedProjects} user={user} onLogout={handleLogout} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 CodeMaster UZ. Yaratuvchi: <span className="font-semibold text-slate-700 dark:text-slate-300">Norqulov Navruzbek</span>. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('courses')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Kurslar</button>
            <button onClick={() => setActiveTab('ide')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Jonli IDE</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Loyihalar</button>
            <button onClick={() => setActiveTab('ai-tutor')} className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Ustoz</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
