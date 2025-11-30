// Groq API helper
const GROQ_KEY =  import.meta.env.VITE_GROQ_API_KEY;
// Use a valid, free Groq model (e.g., mixtral-8x7b-32768 or gemma-7b-it)
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL ;

export interface GroqMessage {
  role: string;
  content: string;
  time?: string;
}

export async function callGroq({ messages, max_tokens = 1024, temperature = 0.7 }: {
  messages: GroqMessage[];
  max_tokens?: number;
  temperature?: number;
}): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens,
      temperature
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Groq API error');
  // Groq returns OpenAI-style response, but guard for shape
  return data.choices?.[0]?.message?.content || '';
}
