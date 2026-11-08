import React, { useState } from 'react';
import { PROJECTS_DATA, Project } from '../data/coursesData';
import { Cpu, CheckCircle2, ChevronRight, ArrowLeft, Terminal, Copy, Check } from 'lucide-react';

interface ProjectsViewProps {
  onCompleteProject: (projectId: string, xpEarned: number) => void;
  completedProjects: string[];
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onCompleteProject, completedProjects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFinish = (project: Project) => {
    onCompleteProject(project.id, 150);
    alert(`Tabriklaymiz! "${project.title}" loyihasi yakunlandi va +150 XP qo'shildi!`);
    setSelectedProject(null);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selectedProject) {
    const isCompleted = completedProjects.includes(selectedProject.id);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <button
          onClick={() => { setSelectedProject(null); setShowSolution(false); }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Loyihalarga qaytish
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold">
                  {selectedProject.difficulty}
                </span>
                <span className="text-xs text-slate-500">· {selectedProject.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h2>
            </div>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Bajarilgan
              </span>
            )}
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {selectedProject.description}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Asosiy talablar:</h4>
            <ul className="space-y-2">
              {selectedProject.objectives.map((obj, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bajarish bosqichlari:</h4>
            <div className="space-y-2">
              {selectedProject.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Boshlang'ich Kod:</h4>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {showSolution ? "Boshlang'ich kodni ko'rsatish" : "Tayyor yechimni ko'rish"}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => handleCopy(showSolution ? (selectedProject.solutionCode || selectedProject.solution || '') : selectedProject.starterCode)}
                className="absolute top-3 right-3 p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Nusxalandi" : "Nusxalash"}
              </button>
              <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                <code>{showSolution ? (selectedProject.solutionCode || selectedProject.solution || '') : selectedProject.starterCode}</code>
              </pre>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => { setSelectedProject(null); setShowSolution(false); }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Orqaga qaytish
            </button>
            <button
              onClick={() => handleFinish(selectedProject)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Loyihani Topshirish (+150 XP)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Amaliy Loyihalar</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Python bilimingizni mustahkamlash uchun real loyihalar ustida ishlang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((proj) => {
          const isCompleted = completedProjects.includes(proj.id);

          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    proj.difficulty === "Oson" ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' :
                    'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                  }`}>
                    {proj.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">{proj.category}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {isCompleted ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Bajarilgan (+150 XP)
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-500">Loyihani boshlash</span>
                )}
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
