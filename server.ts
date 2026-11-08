import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini AI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Xabar kiritilmadi." });
    }

    const chat = ai.chats.create({
      model: "gemini-3.8-flash",
      config: {
        systemInstruction: `Siz "PyMaster UZ" platformasining tajribali va mehribon sun'iy intellekt Python ustozi hisoblanasiz. O'quvchilarga Python dasturlash tilini o'zbek tilida sodda, tushunarli va misollar bilan o'rgatasiz. Kod yozishda ularga yordam bering, xatolarini tushuntiring va motivatsiya bering.`,
      },
    });

    // Replay history if needed or just send message
    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text || "Javob olib bo'lmadi." });
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    res.status(500).json({ error: error.message || "AI xizmatida xatolik yuz berdi." });
  }
});

app.post("/api/code-review", async (req, res) => {
  try {
    const { code, taskDescription } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Kod topilmadi." });
    }

    const prompt = `Quyidagi Python kodini tekshiring va tahlil qiling (Vazifa: ${taskDescription || "Umumiy kod"}):\n\`\`\`python\n${code}\n\`\`\`\nIltimos, o'zbek tilida quyidagi shaklda javob bering:
1. Kod to'g'ri ishlaydimi? (Ha/Yo'q)
2. Xatolar va kamchiliklar (agar bo'lsa)
3. Tavsiyalar va yaxshilangan kod varianti.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ review: response.text || "Tahlil qilib bo'lmadi." });
  } catch (error: any) {
    console.error("Code review error:", error);
    res.status(500).json({ error: error.message || "Kod tahlilida xatolik." });
  }
});

// Setup Vite middleware for development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
