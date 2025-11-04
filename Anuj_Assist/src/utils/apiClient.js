// Unified API client for OpenAI and Groq
import { callGroq } from './groq';

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function callChat({ messages, max_tokens = 1024, temperature = 0.7 }) {
  if (!GROQ_KEY) {
    throw new Error('No Groq API key found. Please set VITE_GROQ_API_KEY in your .env file.');
  }
  return await callGroq({ messages, max_tokens, temperature });
}
