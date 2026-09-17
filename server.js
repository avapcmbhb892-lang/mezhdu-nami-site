const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const messages = [];

app.use(express.static(path.join(__dirname)));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Между нами",
    time: new Date().toISOString()
  });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { text, mood = "neutral" } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      error: "Текст сообщения пустой"
    });
  }

  const message = {
    id: messages.length + 1,
    text: text.trim().slice(0, 2000),
    mood: String(mood).slice(0, 50),
    created_at: new Date().toISOString()
  };

  messages.unshift(message);

  res.status(201).json({
    ok: true,
    message
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Между нами запущен на порту ${PORT}`);
});
