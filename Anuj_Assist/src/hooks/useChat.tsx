// useChat: chat state, message handling, project README logic
import React from 'react';
import { callChat } from '../utils/apiClient';
import anujProfile from '../data/anujProfile';
import { fetchReadme } from '../utils/github';

const PROJECTS = ['EMS', 'URLShortener', 'ImgEnhancer', 'SCSDB'];
const GITHUB_MAP: Record<string, { owner: string; repo: string }> = {
  EMS: { owner: 'anujsc', repo: '' },
  URLShortener: { owner: 'anujsc', repo: 'URL_SHORTNER' },
  ImgEnhancer: { owner: 'anujsc', repo: 'ImgEnhancer' },
  SCSDB: { owner: 'anujsc', repo: 'SCSDB' }
};
const MAX_README_CHARS = 15000;

function detectProject(text: string): string | undefined {
  return PROJECTS.find((p: string) => text.toLowerCase().includes(p.toLowerCase()));
}

const useChat = () => {
  // Generate a rich system prompt from anujProfile
  function buildSystemPrompt(profile: any): string {
    let prompt = `You are an expert assistant for Anuj Chaudhari's portfolio. Use only the following data to answer questions about Anuj:
`;
    prompt += `Name: ${profile.name}\nTitle: ${profile.title}\nLocation: ${profile.location}\nEmail: ${profile.email}\nGitHub: ${profile.github}\nPortfolio: ${profile.portfolio}\nLinkedIn: ${profile.linkedin}\n`;
    prompt += `\nExperience:\n`;
    profile.experience.forEach((exp: any) => {
      prompt += `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.details.join(' ')}\n`;
    });
    prompt += `\nSkills:\n`;
    Object.entries(profile.skills).forEach(([cat, arr]) => {
      prompt += `- ${cat}: ${(arr as string[]).join(', ')}\n`;
    });
    prompt += `\nProjects:\n`;
    profile.projects.forEach((proj: any) => {
      prompt += `- ${proj.name}: ${proj.description} (Tech: ${proj.tech.join(', ')}) Repo: ${proj.repo}\n`;
    });
    prompt += `\nEducation: ${profile.education.degree} from ${profile.education.institute} (${profile.education.period}), CGPA: ${profile.education.cgpa}\n`;
    prompt += `\nCertifications: ${profile.certifications.join(', ')}\n`;
    prompt += `\nAlways answer as if you are Anuj's personal assistant. If asked about Anuj, use only this data.`;
    return prompt;
  }
  const systemPrompt = buildSystemPrompt(anujProfile);
  const [messages, setMessages] = React.useState([
    { role: 'system', content: systemPrompt }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [error, setError] = React.useState('');
  const [saveHistory, setSaveHistory] = React.useState(() => {
    return localStorage.getItem('saveHistory') === 'true';
  });

  React.useEffect(() => {
    if (saveHistory) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, saveHistory]);

  React.useEffect(() => {
    localStorage.setItem('saveHistory', saveHistory ? 'true' : 'false');
  }, [saveHistory]);

  React.useEffect(() => {
    if (saveHistory) {
      const hist = localStorage.getItem('chatHistory');
      if (hist) setMessages(JSON.parse(hist));
    }
  }, []);

  const toggleSaveHistory = () => setSaveHistory(v => !v);

  // Accept optional text for direct search (e.g., from voice)
  const sendMessage = async (text?: string) => {
    const query = typeof text === 'string' ? text : input;
    if (!query.trim()) return;
    setError('');
    setLoading(true);
    setTyping(true);
    const userMsg = { role: 'user', content: query };
    let newMessages = [...messages, userMsg];
    let project = detectProject(query);
    let botMsg = '';
    if (project) {
      // Try to fetch README
      const { owner, repo } = GITHUB_MAP[project];
      let readme = await fetchReadme(owner, repo);
      let prompt = `Summarize this README for a recruiter and highlight Anuj's contributions, tech stack, and important architecture details.`;
      if (readme) {
        let trimmed = readme.slice(0, MAX_README_CHARS);
        if (readme.length > MAX_README_CHARS) {
          prompt += '\n(This README was truncated — ask me if you want more details.)';
        }
        newMessages = [
          { role: 'system', content: systemPrompt },
          ...newMessages.slice(-6),
          { role: 'user', content: `${prompt}\n\n${trimmed}` }
        ];
      } else {
        // Fallback to profile project text
  const proj = (anujProfile.projects as Record<string, any>)[project];
        newMessages = [
          { role: 'system', content: systemPrompt },
          ...newMessages.slice(-6),
          { role: 'user', content: `Explain the project ${project}: ${proj.description}\nTech: ${proj.tech}\nHighlights: ${proj.highlights}` }
        ];
      }
    } else {
      newMessages = [
        { role: 'system', content: systemPrompt },
        ...newMessages.slice(-6)
      ];
    }
    try {
      botMsg = await callChat({ messages: newMessages });
      setMessages([...messages, userMsg, { role: 'assistant', content: botMsg }]);
    } catch (e) {
      setError((e as Error).message);
      setMessages([...messages, userMsg]);
    } finally {
      setLoading(false);
      setTyping(false);
      setInput('');
    }
  };

  return {
    messages: messages.filter((m: any) => m.role !== 'system'),
    input,
    setInput,
    sendMessage,
    loading,
    error,
    typing,
    saveHistory,
    toggleSaveHistory
  };
};

export default useChat;
