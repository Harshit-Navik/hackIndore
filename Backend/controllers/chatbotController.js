// controllers/chatbotController.js
export const sendMessage = async (req, res) => {
  const { message } = req.body;

  // placeholder response for now
  res.json({
    reply: `You said: ${message}. (Gemini integration coming soon 🤖)`,
  });
};
