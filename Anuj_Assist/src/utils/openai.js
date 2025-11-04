// OpenAI API helper
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o';

export async function callOpenAI({ messages, max_tokens = 1024, temperature = 0.7 }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      max_tokens,
      temperature
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'OpenAI API error');
  return data.choices?.[0]?.message?.content || '';
}
