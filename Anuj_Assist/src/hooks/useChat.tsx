// useChat: chat state, message handling, project README logic
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

const useChat = (toastInstance?: any) => {
  // Generate a rich system prompt from anujProfile - memoized
  const systemPrompt = useMemo(() => {
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
    return buildSystemPrompt(anujProfile);
  }, []);

  const [messages, setMessages] = useState([
    { role: 'system', content: systemPrompt }
  ]);
  const messagesRef = useRef(messages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [saveHistory, setSaveHistory] = useState(() => {
    return localStorage.getItem('saveHistory') === 'true';
  });

  // Keep ref in sync with messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Debounced localStorage save
  useEffect(() => {
    if (saveHistory) {
      const timer = setTimeout(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [messages, saveHistory]);

  useEffect(() => {
    localStorage.setItem('saveHistory', saveHistory ? 'true' : 'false');
  }, [saveHistory]);

  useEffect(() => {
    if (saveHistory) {
      const hist = localStorage.getItem('chatHistory');
      if (hist) {
        try {
          setMessages(JSON.parse(hist));
        } catch (e) {
          console.error('Failed to parse chat history');
        }
      }
    }
  }, []);

  const toggleSaveHistory = useCallback(() => setSaveHistory(v => !v), []);

  // Accept optional text for direct search (e.g., from voice)
  const sendMessage = useCallback(async (text?: string) => {
    const query = typeof text === 'string' ? text : input;
    if (!query.trim()) {
      toastInstance?.error('Please enter a message');
      return;
    }
    
    // Prevent sending new messages while a response is being generated
    if (loading || typing) {
      toastInstance?.error('Please wait for the current response to complete');
      return;
    }
    
    setError('');
    setLoading(true);
    setTyping(true);
    
    const userMsg = { role: 'user', content: query };
    
    // Add user message immediately using the ref for latest state
    const currentMessages = [...messagesRef.current, userMsg];
    setMessages(currentMessages);
    
    let newMessages = [...currentMessages];
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
      setMessages(msgs => [...msgs, { role: 'assistant', content: botMsg }]);
      toastInstance?.success('Response received!');
    } catch (e) {
      const errorMsg = (e as Error).message;
      setError(errorMsg);
      setMessages(currentMessages); // Keep user message even on error
      toastInstance?.error(`Failed to get response: ${errorMsg}`);
    } finally {
      setLoading(false);
      setTyping(false);
      setInput('');
    }
  }, [input, systemPrompt, loading, typing, toastInstance]);

  // Memoize filtered messages
  const filteredMessages = useMemo(() => 
    messages.filter((m: any) => m.role !== 'system'),
    [messages]
  );

  return {
    messages: filteredMessages,
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
