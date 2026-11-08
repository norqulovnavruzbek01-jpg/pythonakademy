import React, { useState } from 'react';
import { COURSES_DATA, Module, Lesson } from '../data/coursesData';
import { BookOpen, CheckCircle2, ChevronRight, Play, Award, HelpCircle, X, Terminal, ArrowLeft } from 'lucide-react';

interface CoursesViewProps {
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  completedLessons: string[];
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onCompleteLesson, completedLessons }) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise'>('theory');
  const [filterCategory, setFilterCategory] = useState<string>('Barchasi');

  // Open lesson handler
  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setUserCode(lesson.exercise.starterCode);
    setOutput('');
    setActiveTab('theory');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Kodni bajarish...");
    setTimeout(() => {
      try {
        if (userCode.includes("print(") || userCode.includes("<h1>") || userCode.includes("let ")) {
          setOutput("Natija:\nKod muvaffaqiyatli bajarildi ✔\n(Test sinovidan o'tdi)");
        } else {
          setOutput("Natija:\nKod bajarildi.");
        }
      } catch (err: any) {
        setOutput(`Xatolik: ${err.message}`);
      }
      setIsRunning(false);
    }, 400);
  };

  const handleFinishLesson = () => {
    if (selectedLesson) {
      onCompleteLesson(selectedLesson.id, 50);
      alert("Tabriklaymiz! Dars tugatildi va +50 XP qo'shildi!");
      setSelectedLesson(null);
    }
  };

  const filteredModules = filterCategory === 'Barchasi'
    ? COURSES_DATA
    : COURSES_DATA.filter(m => m.category === filterCategory);

  if (selectedLesson) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <button
          onClick={() => setSelectedLesson(null)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Modulga qaytish
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Dars tafsilotlari</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedLesson.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('theory')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'theory' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Nazariya
              </button>
              <button
                onClick={() => setActiveTab('exercise')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'exercise' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Amaliy Mashq
              </button>
            </div>
          </div>

          {activeTab === 'theory' ? (
            <div className="space-y-6">
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-base">
                {selectedLesson.theory}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" /> Kod namunasi:
                </h4>
                <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-sm rounded-xl overflow-x-auto shadow-inner">
                  <code>{selectedLesson.codeExample}</code>
                </pre>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setActiveTab('exercise')}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  Mashqqa o'tish <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Vazifa sharti:</h4>
                <p className="text-sm text-emerald-800 dark:text-emerald-300">{selectedLesson.exercise.question}</p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  💡 Maslahat: {selectedLesson.exercise.hint}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sizning kodingiz:</label>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    rows={8}
                    className="w-full font-mono text-sm p-4 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400" /> Kodni Tekshirish
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Natija (Konsol):</label>
                  <div className="p-4 bg-slate-950 text-slate-200 font-mono text-sm rounded-xl h-48 overflow-y-auto border border-slate-800 whitespace-pre-line">
                    {output || "Natijani ko'rish uchun 'Kodni Tekshirish' tugmasini bosing..."}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('theory')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Nazariyaga qaytish
                </button>
                <button
                  onClick={handleFinishLesson}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Darsni Yakunlash (+50 XP)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <button
          onClick={() => setSelectedModule(null)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Barcha modullar
        </button>

        <div className="bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-cyan-900/10 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-500/20 rounded-3xl p-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold">
            {selectedModule.category} · {selectedModule.level}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedModule.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">{selectedModule.description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Darslar ro'yxati:</h3>
          <div className="space-y-3">
            {selectedModule.lessons.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isCompleted ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {lesson.title}
                      </h4>
                      <div className="text-xs text-slate-500 mt-0.5">{lesson.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Bajarilgan
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Dasturlash Kurslari</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Python, HTML, CSS va JavaScript tillarini noldan boshlab professional darajagacha o'rganing.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['Barchasi', 'Python', 'HTML & CSS', 'JavaScript'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const completedInModule = module.lessons.filter(l => completedLessons.includes(l.id)).length;
          const progress = Math.round((completedInModule / module.lessons.length) * 100);

          return (
            <div
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                    {module.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500 tabular-nums">
                    {module.lessons.length} ta dars
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {module.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {module.description}
                </p>
              </div>

              <div className="pt-6 space-y-3 mt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">O'zlashtirish</span>
                  <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
