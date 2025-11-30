// ChatBubble: user/bot message bubble
import React, { useEffect, useState, memo } from 'react';
import type { ChatBubbleProps } from '../types/chat';

// Helper to render links clickable and remove markdown stars - memoized
const formatBotContent = (text: string): string => {
  // Remove markdown bold/italic stars
  let clean = text.replace(/\*\*/g, '').replace(/\*/g, '');
  // Convert URLs to clickable links
  clean = clean.replace(/(https?:\/\/[^\s>]+)/g, (url: string) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#1549e6;text-decoration:underline;">${url}</a>`;
  });
  return clean;
};

const ChatBubble: React.FC<ChatBubbleProps> = memo(({ role, content, profileIcon, time, animate }) => {
  const [visible, setVisible] = useState(false);

  // Typewriter state for AI (bot) messages
  const [typedContent, setTypedContent] = useState(role === 'user' ? content : '');
  const [typewriterDone, setTypewriterDone] = useState(role === 'user');

  useEffect(() => {
    setVisible(true);
  }, []);

  // Typewriter effect for AI (bot) only, optimized for smoothness with RAF
  useEffect(() => {
    if (role !== 'user' && animate !== false) {
      setTypedContent('');
      setTypewriterDone(false);
      let i = 0;
      const plain = content;
      let rafId: number;
      let lastTime = performance.now();
      let delay = 0;
      function typeNext(now: number) {
        if (i === 0) {
          setTypedContent('');
        }
        // Use a variable delay for each char
        if (now - lastTime >= delay) {
          i++;
          setTypedContent(plain.slice(0, i));
          lastTime = now;
          delay = 5 + Math.random() * 20;
        }
        if (i < plain.length) {
          rafId = requestAnimationFrame(typeNext);
        } else {
          setTypewriterDone(true);
        }
      }
      rafId = requestAnimationFrame(typeNext);
      return () => {
        setTypewriterDone(true);
        cancelAnimationFrame(rafId);
      };
    } else {
      setTypedContent(content);
      setTypewriterDone(true);
    }
  }, [content, role, animate]);

  // Helper to show a blinking cursor during typing
  const showCursor = role !== 'user' && !typewriterDone && animate !== false;

  // Only show time after typewriter is done for bot, always for user
  const showTime = role === 'user' || typewriterDone;

  return (
    <div
      className={`my-2 flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
      aria-label={role === 'user' ? 'User message' : 'Bot message'}
    >
      <div className={`flex items-end gap-2 ${role === 'user' ? 'flex-row-reverse' : ''}`} style={{ width: '100%' }}>
        {/* Profile Icon */}
        <img
          src={profileIcon}
          alt={role === 'user' ? 'User profile' : 'AI assistant'}
          className="w-8 h-8 rounded-full shadow-md border-2 border-gray-300 object-cover"
          width="32"
          height="32"
          loading="lazy"
          decoding="async"
          style={{ 
            minWidth: 32, 
            minHeight: 32,
            borderRadius: '50%',
            aspectRatio: '1/1'
          }}
        />
        <div className="flex flex-col max-w-[80%]">
          {/* Message Bubble */}
          <div
            className={`px-4 py-2 rounded-lg shadow text-base whitespace-pre-line transition-all duration-500 ease-out ${
              (visible && animate !== false) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${
              role === 'user'
                ? 'bg-[#ba3f47] text-white self-end font-sans'
                : 'bg-gray-200 text-gray-900 self-start font-mono border border-[#eaf1fb]'
            } ${role !== 'user' && !typewriterDone && animate !== false ? 'animate-botpulse' : ''}`}
            style={role === 'user' ? {} : { fontFamily: 'Fira Mono, Menlo, monospace', fontSize: '1rem', letterSpacing: '-0.5px', wordBreak: 'break-word', overflowWrap: 'anywhere', transition: 'background 0.3s' }}
            dangerouslySetInnerHTML={role === 'user'
              ? { __html: content }
              : { __html: formatBotContent(typedContent) + (showCursor ? '<span class="typewriter-cursor" style="display:inline-block;width:2px;height:1em;background:#ba3f47;margin-left:2px;animation:blink 1s infinite;"></span>' : '') }
            }
          />
          {/* Time below message (only after typewriter for bot) */}
          {showTime && (
            <span className="text-xs text-gray-400 mt-1 text-right">{time}</span>
          )}
        </div>
      </div>
      {/* Typewriter cursor keyframes (scoped) and bot pulse animation */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes botpulse {
          0% { background-color: #f3f4f6; }
          50% { background-color: #e5e7eb; }
          100% { background-color: #f3f4f6; }
        }
        .animate-botpulse {
          animation: botpulse 1.2s infinite;
        }
      `}</style>
    </div>
  );
});

export default ChatBubble;
