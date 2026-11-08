import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Code2 } from 'lucide-react';

// Declare pyodide on window
declare global {
  interface Window {
    loadPyodide: any;
  }
}

const PRESET_SNIPPETS = [
  {
    name: "1. Salom Dunyo",
    code: `print("Salom, PyMaster UZ!")
ism = input("Ismingiz nima? ") if False else "Python O'quvchisi"
print(f"Xush kelibsiz, {ism}!")`
  },
  {
    name: "2. Fibonacci Ketma-ketligi",
    code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=" ")
        a, b = b, a + b

print("Fibonacci (10 ta son):")
fibonacci(10)`
  },
  {
    name: "3. Tub Sonlarni Topish",
    code: `def tub_mi(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

sonlar = [x for x in range(1, 30) if tub_mi(x)]
print("1 dan 30 gacha tub sonlar:", sonlar)`
  },
  {
    name: "4. Lug'atlar va Ma'lumotlar",
    code: `talaba = {
    "ism": "Aziz",
    "yosh": 21,
    "kurs": "Python Pro",
    "baholar": [5, 4, 5, 5]
}

ortacha = sum(talaba["baholar"]) / len(talaba["baholar"])
print(f"Talaba: {talaba['ism']}")
print(f"O'rtacha bahosi: {ortacha}")`
  }
];

export const PythonIDEView: React.FC = () => {
  const [code, setCode] = useState<string>(PRESET_SNIPPETS[0].code);
  const [output, setOutput] = useState<string>("Pyodide Python muhiti yuklanmoqda...");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pyodideInstance, setPyodideInstance] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function initPyodide() {
      try {
        if (window.loadPyodide) {
          setOutput("Python muhiti ishga tushirilmoqda...");
          const py = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
          });
          setPyodideInstance(py);
          setOutput("Python 3.11 muhiti tayyor! Kodni yozib 'Kodni Ishga Tushirish' tugmasini bosing.");
        } else {
          setOutput("Pyodide skripti topilmadi. Simulyatsiya rejimi faol.");
        }
      } catch (err: any) {
        setOutput(`Python muhitini yuklashda xatolik: ${err.message}`);
      }
    }
    initPyodide();
  }, []);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Bajarilmoqda...");

    try {
      if (pyodideInstance) {
        // Capture stdout
        pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
        `);

        await pyodideInstance.runPythonAsync(code);

        const stdout = pyodideInstance.runPython("sys.stdout.getvalue()");
        setOutput(stdout || "Kod muvaffaqiyatli bajarildi (natija yo'q).");
      } else {
        // Fallback simulation
        setTimeout(() => {
          setOutput(`[Simulyatsiya Natijasi]:\nSalom, PyMaster UZ!\nXush kelibsiz, Python O'quvchisi!`);
        }, 500);
      }
    } catch (err: any) {
      setOutput(`Xatolik:\n${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" /> Brauzer Python IDE
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Jonli Python Muharriri</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Python kodlarini yozing, tahrirlang va brauzerda to'g'ridan-to'g'ri ishga tushiring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PRESET_SNIPPETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setCode(preset.code)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Pane */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-emerald-400" /> main.py
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Nusxalash"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCode("")}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Tozalash"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={18}
            className="w-full font-mono text-sm p-4 bg-slate-900 text-emerald-400 focus:outline-none resize-none leading-relaxed"
            placeholder="# Python kodingizni shu yerga yozing..."
          />

          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Python 3.11 (Pyodide WebAssembly)</span>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> {isRunning ? "Bajarilmoqda..." : "Kodni Ishga Tushirish"}
            </button>
          </div>
        </div>

        {/* Output Pane */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" /> Konsol Natijasi
            </span>
            <span className="text-xs text-emerald-400 font-medium">● Faol</span>
          </div>

          <div className="p-6 bg-slate-950 text-slate-200 font-mono text-sm rounded-b-2xl h-[420px] overflow-y-auto whitespace-pre-line leading-relaxed">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};
