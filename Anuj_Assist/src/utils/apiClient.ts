// Unified API client for OpenAI and Groq
import { callGroq } from './groq';

const GROQ_KEY = "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";

export interface ChatMessage {
  role: string;
  content: string;
  time?: string;
}

export async function callChat({ messages, max_tokens = 1024, temperature = 0.7 }: {
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
}): Promise<string> {
  if (!GROQ_KEY) {
    throw new Error('No Groq API key found. Please set VITE_GROQ_API_KEY in your .env file.');
  }
  return await callGroq({ messages, max_tokens, temperature });
}
