// backend/routes/ai.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const GROQ_BASE = 'https://api.groq.com/openai/v1';

// ✅ AI route using Groq Llama 3.3 model (free & fast)
router.post('/parse-condition', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    const messages = [
      { role: 'system', content: 'You are a helpful assistant that extracts concise medical condition names from user text. Return ONLY a JSON array like ["Brain Cancer", "Seizures"].' },
      { role: 'user', content: text }
    ];

    const payload = {
      model: 'llama-3.3-70b-versatile', // ✅ your Groq model
      messages,
      max_tokens: 150,
      temperature: 0.0
    };

    const resp = await axios.post(`${GROQ_BASE}/chat/completions`, payload, {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const modelText = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    let conditions = [];

    try {
      conditions = JSON.parse(modelText);
      if (!Array.isArray(conditions)) throw new Error('Not an array');
    } catch {
      conditions = modelText.replace(/\r/g, '').split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }

    res.json({ conditions, raw: modelText, provider: 'groq' });
  } catch (err) {
    console.error('Groq AI route error:', err?.response?.data || err?.message || err);
    res.status(500).json({ error: 'Groq API error', details: err?.response?.data || err?.message });
  }
});

module.exports = router;
