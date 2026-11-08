export interface Lesson {
  id: string;
  title: string;
  duration: string;
  theory: string;
  codeExample: string;
  exercise: {
    question: string;
    starterCode: string;
    solution: string;
    hint: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: "Boshlang'ich" | "O'rta" | "Ilg'or";
  category: "Python" | "HTML & CSS" | "JavaScript";
  icon: string;
  lessons: Lesson[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  difficulty: "Oson" | "O'rta" | "Qiyin";
  category: string;
  description: string;
  objectives: string[];
  starterCode: string;
  solutionCode?: string;
  solution?: string;
  steps: string[];
}

// Helper to generate 30 lessons per module
const generateLessons = (modulePrefix: string, baseTitle: string, topics: string[]): Lesson[] => {
  return topics.map((topic, index) => {
    const num = index + 1;
    return {
      id: `${modulePrefix}-les-${num}`,
      title: `${num}. ${topic}`,
      duration: "20 daqiqa",
      theory: `Ushbu darsda biz "${topic}" mavzusini chuqur o'rganamiz. Dasturlashda bu tushuncha kodni optimallashtirish va samarali yechimlar topishda muhim ahamiyat kasb etadi.`,
      codeExample: `# ${topic} bo'yicha namuna kod\ndef demo_${num}():\n    print("${topic} darsi bajarildi!")\ndemo_${num}()`,
      exercise: {
        question: `"${topic}" mavzusi bo'yicha amaliy vazifani bajaring va konsolga natija chiqaring.`,
        starterCode: `# ${topic} uchun kod\n`,
        solution: `print("${topic} bajarildi")`,
        hint: "print() yoki tegishli sintaksisdan foydalaning."
      }
    };
  });
};

const pythonTopics = [
  "Python ga kirish va o'rnatish", "Birinchi print() dasturi", "O'zgaruvchilar va ma'lumot turlari",
  "Sonlar va arifmetik amallar", "Matnlar (Strings) va metodlar", "Foydalanuvchidan ma'lumot olish (input)",
  "Mantiqiy solishtiruvlar", "If-elif-else shart operatorlari", "And, or, not mantiqiy operatorlari",
  "For sikli va range()", "While sikli va cheksiz tsikllar", "Break va continue operatorlari",
  "Ro'yxatlar (Lists) asoslari", "List metodlari va indekslash", "Kortejlar (Tuples)",
  "Lug'atlar (Dictionaries)", "To'plamlar (Sets)", "Funksiya yaratish (def)",
  "Funksiya argumentlari va return", "Lambda anonim funksiyalar", "Global va lokal o'zgaruvchilar",
  "Modullar va import", "Math va random kutubxonalari", "Xatoliklar bilan ishlash (Try-Except)",
  "Fayllarni ochish va o'qish (open)", "Faylga yozish va qo'shish", "Klasslar va obyektlar (OOP)",
  "OOP Vorislik (Inheritance)", "JSON ma'lumotlar bilan ishlash", "Amaliy yakuniy loyiha"
];

const htmlTopics = [
  "HTML nima va asosiy tushunchalar", "HTML sahifa tuzilishi (DOCTYPE)", "Sarlavhalar (h1-h6)",
  "Paragraflar va matn formatlash", "Rasmlar qo'shish (img)", "Havolalar va giperhavolalar (a)",
  "Ro'yxatlar (ul, ol, li)", "Jadvallar yaratish (table, tr, td)", "Forma va input elementlari",
  "Matn maydonlari va textarea", "Tugmalar (button) va turlari", "Semantik teglar (header, footer)",
  "Navigatsiya tegi (nav)", "Bo'limlar (section, article)", "Div va span konteynerlari",
  "Audio va video elementlari", "Iframe orqali sahifa ulash", "Meta teglar va SEO asoslari",
  "Favicon va sarlavha sozlamalari", "HTML atributlari", "ID va Class farqlari",
  "Blok va inline elementlar", "Forma validatsiyasi", "SVG rasmlar bilan ishlash",
  "Dastlabki veb sahifa yaratish", "Aksseberublik (Accessibility)", "Global atributlar",
  "Data atributlari", "HTML5 yangi imkoniyatlari", "Loyihani yakunlash"
];

const cssTopics = [
  "CSS ga kirish va ulanish turlari", "CSS selektorlari (Element, Class, ID)", "Ranglar va o'lchov birliklari",
  "Shriftlar va matn dizayni", "CSS Box Model (Margin, Padding, Border)", "Fon (Background) xossalari",
  "Display xossasi (block, inline)", "Position xossalari (relative, absolute)", "Fixed va sticky joylashuv",
  "Float va Clear", "Flexbox asoslari (display: flex)", "Flexbox yo'nalishi va o'qi",
  "Flexbox justify va align", "Flexbox wrap va gap", "CSS Grid asoslari (display: grid)",
  "Grid ustunlar va qatorlar", "Grid Template Areas", "CSS O'tishlar (Transitions)",
  "CSS Transform (Rotate, Scale)", "CSS Animatsiyalar (Keyframes)", "Media Queries (Responsive)",
  "Pseudo-classes (:hover, :focus)", "Pseudo-elements (::before, ::after)", "CSS Variables (O'zgaruvchilar)",
  "Shadow (Soyalar: box-shadow, text-shadow)", "Z-index va qatlamlar tartibi", "Overflow xossalari",
  "CSS Cursor va ko'rsatgichlar", "Normalize va Reset CSS", "Yakuniy CSS Portfolio Loyihasi"
];

const jsTopics = [
  "JavaScript ga kirish va konsol", "O'zgaruvchilar (let, const, var)", "Ma'lumot turlari (Primitivlar)",
  "Arifmetik va solishtiruv amallari", "Shart operatorlari (if-else)", "Switch-case operatori",
  "Ternary operator", "Funksiyalar (Function Declaration)", "Funksiya expression va arrow",
  "Massivlar (Arrays) asoslari", "Massiv metodlari (push, pop, map)", "Massiv filter va reduce",
  "Obyektlar (Objects) yaratish", "Obyekt metodlari va this", "For va While sikllari",
  "For...of va For...in sikllari", "DOM tushunchasi va tanlash", "Elementlarni o'zgartirish (innerHTML)",
  "CSS ni JS orqali boshqarish", "Hodisalar (Event Listeners: click)", "Input va klaviatura hodisalari",
  "Forma ma'lumotlarini olish", "Local Storage bilan ishlash", "Asinxron JavaScript (Timeout)",
  "Va'dalar (Promises) asoslari", "Async / Await sintaksisi", "Fetch API orqali ma'lumot olish",
  "Xatoliklarni tutish (try...catch)", "Array va Object destrukturizatsiya", "Yakuniy JavaScript Dastur"
];

export const COURSES_DATA: Module[] = [
  {
    id: "mod-1",
    title: "1-Modul: Python Asoslari va Sintaksis",
    description: "Python olamiga xush kelibsiz! O'zgaruvchilar, ma'lumot turlari, konsol bilan ishlash va asosiy operatorlarni o'rganing.",
    level: "Boshlang'ich",
    category: "Python",
    icon: "Code",
    lessons: generateLessons("py-1", "Python Asoslari", pythonTopics),
    quiz: [
      {
        question: "Python'da konsolga ma'lumot chiqarish uchun qaysi funksiya ishlatiladi?",
        options: ["echo()", "print()", "write()", "console.log()"],
        correctIndex: 1,
        explanation: "Python'da print() funksiyasi ishlatiladi."
      }
    ]
  },
  {
    id: "mod-2",
    title: "2-Modul: HTML Asoslari va Sahifa Tuzilishi",
    description: "Veb-sahifalarning suyak qismi bo'lgan HTML tili: teglar, sarlavhalar, matnlar, rasmlar va havolalar.",
    level: "Boshlang'ich",
    category: "HTML & CSS",
    icon: "Layout",
    lessons: generateLessons("html-2", "HTML Asoslari", htmlTopics),
    quiz: [
      {
        question: "HTML qanday ma'noni anglatadi?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Machine", "Home Tool Markup"],
        correctIndex: 0,
        explanation: "HTML - HyperText Markup Language."
      }
    ]
  },
  {
    id: "mod-3",
    title: "3-Modul: CSS Stillar va Flexbox Layout",
    description: "Veb-sahifalarga go'zallik kiritish: ranglar, shriftlar, CSS selektorlari, Flexbox va Grid joylashuvi.",
    level: "O'rta",
    category: "HTML & CSS",
    icon: "Palette",
    lessons: generateLessons("css-3", "CSS Stillar", cssTopics),
    quiz: [
      {
        question: "CSS ning to'liq nomi nima?",
        options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Colorful Style"],
        correctIndex: 0,
        explanation: "CSS - Cascading Style Sheets."
      }
    ]
  },
  {
    id: "mod-4",
    title: "4-Modul: JavaScript Dasturlash Asoslari",
    description: "Veb-sahifalarga jon kiritish: o'zgaruvchilar, funksiyalar, shartlar, sikllar va DOM manipulyatsiyasi.",
    level: "O'rta",
    category: "JavaScript",
    icon: "Cpu",
    lessons: generateLessons("js-4", "JavaScript Asoslari", jsTopics),
    quiz: [
      {
        question: "JavaScript da funksiya e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
        options: ["func", "function", "def", "method"],
        correctIndex: 1,
        explanation: "JavaScript da function kalit so'zi ishlatiladi."
      }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Parol Generatori (Python)",
    difficulty: "Oson",
    category: "Python",
    description: "Xavfsiz tasodifiy parollar yaratuvchi konsol dasturi.",
    objectives: ["random moduli", "string moduli", "funksiyalar"],
    starterCode: `import random
import string

def parol_yarat(uzunlik=8):
    pass`,
    solutionCode: `import random
import string

def parol_yarat(uzunlik=10):
    belgilar = string.ascii_letters + string.digits
    return "".join(random.choice(belgilar) for _ in range(uzunlik))

print(parol_yarat(10))`,
    steps: ["1. Modullarni import qiling", "2. Belgilarni birlashtiring", "3. Generatsiya qiling"]
  },
  {
    id: "proj-2",
    title: "Shaxsiy Portfolio Sayti (HTML & CSS)",
    difficulty: "O'rta",
    category: "HTML & CSS",
    description: "Flexbox va zamonaviy dizayn yordamida shaxsiy portfolio veb-sahifasini yaratish.",
    objectives: ["Semantik HTML", "Flexbox joylashuv", "Chiroyli ranglar"],
    starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Portfolio</title>
  </head>
  <body>
    <!-- Portfolio tuzilmasi -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8">
    <title>Mening Portfolim</title>
    <style>
      body { font-family: sans-serif; margin: 0; background: #0f172a; color: white; }
      header { display: flex; justify-content: space-between; padding: 20px 40px; background: #1e293b; }
      .hero { text-align: center; padding: 80px 20px; }
      .btn { background: #059669; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; }
    </style>
  </head>
  <body>
    <header>
      <h2>DevPortfolio</h2>
      <nav><a href="#" style="color:white; text-decoration:none;">Aloqa</a></nav>
    </header>
    <div class="hero">
      <h1>Salom, Men Dasturchiman</h1>
      <p>HTML, CSS va Python mutaxassisi</p>
      <a href="#" class="btn">Bog'lanish</a>
    </div>
  </body>
</html>`,
    steps: ["1. Header yaratish", "2. Hero bo'limi", "3. CSS stillar berish"]
  },
  {
    id: "proj-3",
    title: "Interaktiv Kalkulyator (JavaScript)",
    difficulty: "O'rta",
    category: "JavaScript",
    description: "DOM manipulyatsiyasi va hodisalar yordamida ishlaydigan veb kalkulyator.",
    objectives: ["DOM tanlash", "EventListener", "Matematik amallar"],
    starterCode: `// JavaScript kalkulyator kodi
const ekran = document.getElementById("ekran");`,
    solutionCode: `let natija = eval("5 + 5");
console.log("Natija:", natija);`,
    steps: ["1. Elementlarni ulash", "2. Tugma bosilishini ushlash", "3. Hisoblash"]
  }
];
