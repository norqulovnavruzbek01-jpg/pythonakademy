import React from 'react';
import { Terminal, BookOpen, Code2, Cpu, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HomeHeroProps {
  setActiveTab: (tab: string) => void;
  completedCount: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ setActiveTab, completedCount }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 px-6 sm:px-12 shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            O'zbek Tilidagi Eng Ilg'or Python Akademiyasi
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-wrap balance text-white leading-tight">
            Python Dasturlashni <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Noldan Professionalgacha</span> O'rganing
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Interaktiv darslar, brauzerdagi jonli Python IDE, real amaliy loyihalar va sun'iy intellekt ustoz yordamida dasturlashni tez va oson o'zlashtiring.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('courses')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 group"
            >
              Kurslarni Boshlash
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('ide')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-teal-400" />
              Jonli Kod Muharriri
            </button>
          </div>

          {/* Key Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-800/80 mt-12">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">6 ta</div>
              <div className="text-xs text-slate-400 mt-1">Mukammal Modul</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-teal-400 tabular-nums">15+</div>
              <div className="text-xs text-slate-400 mt-1">Amaliy Loyihalar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums">24/7</div>
              <div className="text-xs text-slate-400 mt-1">AI Python Ustoz</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">100%</div>
              <div className="text-xs text-slate-400 mt-1">Interaktiv Amaliyot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Nima Uchun PyMaster UZ?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Dasturlashni o'rganishni oson va qiziqarli qiluvchi barcha vositalar bir joyda jamlangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => setActiveTab('courses')}
            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Bosqichma-bosqich Kurslar</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Asoslardan tortib OOP va ma'lumotlar bazasigacha bo'lgan chuqur o'quv dasturi. Har bir dars oxirida testlar va amaliy mashqlar.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Kurslarni ko'rish <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('ide')}
            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Brauzerdagi Jonli IDE</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Hech qanday dastur o'rnatmasdan brauzeringizning o'zida Python kodlarini yozing va natijasini bir soniyada konsolda ko'ring.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400">
              Kodni sinab ko'rish <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('ai-tutor')}
            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Python Ustoz</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Savollaringizga darhol javob oling, xato yozgan kodlaringizni tahlil qildiring va sun'iy intellektdan maslahat oling.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              AI bilan gaplashish <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Practical Projects Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-cyan-900/10 dark:from-emerald-950/30 dark:to-slate-900 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> Amaliy tajriba
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Haqiqiy Loyihalar Bilan Portfelingizni Boyiting
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Faqat nazariya emas! Parol generatori, To-Do menejer, valyuta konverteri va telegram botlar yaratish orqali amaliy ko'nikmalarni egallang.
            </p>
            <button
              onClick={() => setActiveTab('projects')}
              className="px-5 py-2.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Loyihalarni Ko'rish
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <Cpu className="w-6 h-6 text-emerald-600 mb-2" />
              <div className="font-bold text-slate-900 dark:text-white text-sm">Parol Generatori</div>
              <div className="text-xs text-slate-500 mt-1">Xavfsiz kalitlar</div>
            </div>
            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-teal-600 mb-2" />
              <div className="font-bold text-slate-900 dark:text-white text-sm">To-Do Menejer</div>
              <div className="text-xs text-slate-500 mt-1">Vazifalar bazasi</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
