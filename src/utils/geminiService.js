// src/geminiService.js
import axios from 'axios';

const gemini = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGeminiResponse = async (prompt) => {
  try {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const response = await gemini.post(
      `/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Gemini API:', error);
    throw error;
  }
};
