import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// POST /api/chatbot
router.post("/chatbot", async (req, res) => {
  try {
    const { contents } = req.body;

    // 🔐 Send the question to Gemini or OpenAI
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
