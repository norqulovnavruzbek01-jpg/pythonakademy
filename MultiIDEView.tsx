import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Code2, Globe, FileCode } from 'lucide-react';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

const PYTHON_PRESETS = [
  {
    name: "1. Salom Dunyo",
    code: `print("Salom, CodeMaster UZ!")
ism = "Python O'quvchisi"
print(f"Xush kelibsiz, {ism}!")`
  },
  {
    name: "2. Fibonacci",
    code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=" ")
        a, b = b, a + b
fib(8)`
  }
];

const WEB_PRESETS = {
  html: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
      .card { background: #1e293b; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
      h1 { color: #34d399; margin-bottom: 10px; }
      button { background: #059669; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
      button:hover { background: #047857; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Salom, CodeMaster UZ!</h1>
      <p>HTML, CSS va JavaScript jonli muhiti</p>
      <button onclick="bosildi()">Bosing</button>
    </div>
    <script>
      function bosildi() {
        alert("Tabriklaymiz! JavaScript ishlayapti!");
      }
    </script>
  </body>
</html>`
};

export const MultiIDEView: React.FC = () => {
  const [lang, setLang] = useState<'python' | 'web'>('python');
  const [pythonCode, setPythonCode] = useState<string>(PYTHON_PRESETS[0].code);
  const [webCode, setWebCode] = useState<string>(WEB_PRESETS.html);
  
  const [output, setOutput] = useState<string>("Pyodide Python muhiti yuklanmoqda...");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pyodideInstance, setPyodideInstance] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function initPyodide() {
      try {
        if (window.loadPyodide) {
          const py = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
          });
          setPyodideInstance(py);
          setOutput("Python 3.11 muhiti tayyor! Kodni yozib 'Kodni Ishga Tushirish' tugmasini bosing.");
        } else {
          setOutput("Simulyatsiya rejimi faol.");
        }
      } catch (err: any) {
        setOutput(`Xatolik: ${err.message}`);
      }
    }
    initPyodide();
  }, []);

  const handleRunPython = async () => {
    setIsRunning(true);
    setOutput("Bajarilmoqda...");
    try {
      if (pyodideInstance) {
        pyodideInstance.runPython(`import sys\nimport io\nsys.stdout = io.StringIO()`);
        await pyodideInstance.runPythonAsync(pythonCode);
        const stdout = pyodideInstance.runPython("sys.stdout.getvalue()");
        setOutput(stdout || "Kod muvaffaqiyatli bajarildi.");
      } else {
        setTimeout(() => setOutput("Salom, CodeMaster UZ! Python simulyatsiya natijasi."), 400);
      }
    } catch (err: any) {
      setOutput(`Xatolik:\n${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" /> Interaktiv Veb va Python IDE
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Jonli Kod Muharriri</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Python yoki HTML/CSS/JavaScript kodlarini yozing va natijani darhol ko'ring.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setLang('python')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              lang === 'python' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" /> Python IDE
          </button>
          <button
            onClick={() => setLang('web')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              lang === 'web' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" /> HTML / CSS / JS Preview
          </button>
        </div>
      </div>

      {lang === 'python' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" /> main.py
              </span>
              <div className="flex items-center gap-2">
                {PYTHON_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPythonCode(p.code)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              rows={16}
              className="w-full font-mono text-sm p-4 bg-slate-900 text-emerald-400 focus:outline-none resize-none leading-relaxed"
            />

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Python 3.11</span>
              <button
                onClick={handleRunPython}
                disabled={isRunning}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> {isRunning ? "Bajarilmoqda..." : "Kodni Ishga Tushirish"}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" /> Konsol Natijasi
              </span>
              <span className="text-xs text-emerald-400 font-medium">● Faol</span>
            </div>
            <div className="p-6 bg-slate-950 text-slate-200 font-mono text-sm rounded-b-2xl h-[380px] overflow-y-auto whitespace-pre-line leading-relaxed">
              {output}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-teal-400" /> index.html (HTML + CSS + JS)
              </span>
              <button
                onClick={() => handleCopy(webCode)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <textarea
              value={webCode}
              onChange={(e) => setWebCode(e.target.value)}
              rows={16}
              className="w-full font-mono text-sm p-4 bg-slate-900 text-teal-300 focus:outline-none resize-none leading-relaxed"
            />

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
              HTML, CSS va JS kodingiz avtomatik ravishda o'ng tomonda render qilinadi.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="px-4 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" /> Veb Sahifa Ko'rinishi (Live Preview)
              </span>
              <span className="text-xs text-emerald-600 font-medium">● Jonli</span>
            </div>
            <div className="flex-1 bg-white h-[380px]">
              <iframe
                srcDoc={webCode}
                title="live-preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
