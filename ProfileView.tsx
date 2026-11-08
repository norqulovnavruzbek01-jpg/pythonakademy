import React from 'react';
import { Trophy, Award, BookCheck, CheckCircle2, Zap, User, Star, LogOut } from 'lucide-react';

interface ProfileViewProps {
  xp: number;
  completedLessons: string[];
  completedProjects: string[];
  user: { firstName: string; lastName: string } | null;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ xp, completedLessons, completedProjects, user, onLogout }) => {
  const level = Math.floor(xp / 200) + 1;
  const progressPercent = Math.min(100, Math.round((xp % 200) / 200 * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-emerald-900/20 via-teal-900/10 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shrink-0">
            <User className="w-12 h-12" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5" /> Daraja {level} - Python O'quvchisi
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {user ? `${user.firstName} ${user.lastName}` : "Python O'quvchisi"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">PyMaster UZ akademiyasida muvaffaqiyatli o'qimoqdasiz.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="p-5 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 text-center min-w-[140px] shadow-sm">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{xp} XP</div>
            <div className="text-xs text-slate-500 mt-0.5">Umumiy Ball</div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Profildan chiqish
          </button>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-slate-900 dark:text-white">Keyingi Darajagacha:</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{xp % 200} / 200 XP</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{completedLessons.length} ta</div>
            <div className="text-xs text-slate-500">Tugatilgan darslar</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{completedProjects.length} ta</div>
            <div className="text-xs text-slate-500">Bajarilgan loyihalar</div>
          </div>
        </div>
      </div>

      {/* Achievements / Badges */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" /> Yutuqlar va Nishonlar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
            completedLessons.length >= 1 ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500/30 text-slate-900 dark:text-white' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">🚀</div>
            <div>
              <div className="font-bold text-sm">Birinchi Qadam</div>
              <div className="text-xs text-slate-500">1 ta dars tugatildi</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
            completedProjects.length >= 1 ? 'bg-teal-50/50 dark:bg-teal-950/30 border-teal-500/30 text-slate-900 dark:text-white' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">💻</div>
            <div>
              <div className="font-bold text-sm">Amaliyotchi</div>
              <div className="text-xs text-slate-500">1 ta loyiha bajarildi</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
            xp >= 500 ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-500/30 text-slate-900 dark:text-white' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">👑</div>
            <div>
              <div className="font-bold text-sm">Python Usta</div>
              <div className="text-xs text-slate-500">500+ XP to'plandi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
