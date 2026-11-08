import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Code2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AITutorView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'review'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Salom! Men PyMaster UZ sun'iy intellekt Python ustoziman. Python dasturlash bo'yicha istalgan savolingizni bering yoki tushunmagan joyingizni so'rang!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Code Review state
  const [codeToReview, setCodeToReview] = useState<string>('def salom(ism):\n    print(f"Salom {ism}")\n\nsalom("Aziz")');
  const [taskDesc, setTaskDesc] = useState<string>('Ism qabul qilib salomlashuvchi funksiya');
  const [reviewResult, setReviewResult] = useState<string>('');
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Kechirasiz, javob olishda xatolik yuz berdi." }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Tarmoq xatoligi: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeReview = async () => {
    if (!codeToReview.trim() || isReviewing) return;
    setIsReviewing(true);
    setReviewResult("AI kodni tahlil qilmoqda...");

    try {
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToReview, taskDescription: taskDesc })
      });
      const data = await res.json();
      if (data.review) {
        setReviewResult(data.review);
      } else {
        setReviewResult("Tahlil natijasi olinmadi.");
      }
    } catch (err: any) {
      setReviewResult(`Xatolik: ${err.message}`);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Ustoz va Tahlil
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Sun'iy Intellekt Yordamchisi</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Python savollaringizga AI ustozdan javob oling yoki kodingizni tekshirib bering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'chat' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            AI Python Ustoz (Chat)
          </button>
          <button
            onClick={() => setActiveSubTab('review')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'review' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            AI Kod Tahlili (Review)
          </button>
        </div>
      </div>

      {activeSubTab === 'chat' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col h-[600px]">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white shadow-md'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none whitespace-pre-line'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm rounded-2xl">
                  AI ustoz o'ylamoqda...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Python bo'yicha savol bering (masalan: 'For sikli qanday ishlaydi?')..."
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
            >
              <Send className="w-4 h-4" /> Yuborish
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-500" /> Kodingizni Kiriting
            </h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Vazifa tavsifi:</label>
              <input
                type="text"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Python kodi:</label>
              <textarea
                value={codeToReview}
                onChange={(e) => setCodeToReview(e.target.value)}
                rows={12}
                className="w-full font-mono text-xs p-4 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleCodeReview}
              disabled={isReviewing}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> {isReviewing ? "Tahlil qilinmoqda..." : "AI Kod Tahlilini Boshlash"}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> AI Tahlil va Tavsiyalar
            </h3>

            <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-line overflow-y-auto leading-relaxed">
              {reviewResult || "Kodni kiritib 'AI Kod Tahlilini Boshlash' tugmasini bosing..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
