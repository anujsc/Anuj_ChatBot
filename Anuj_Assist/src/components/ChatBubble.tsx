// ChatBubble: user/bot message bubble
import React from 'react';


// Helper to render links clickable and remove markdown stars
function formatBotContent(text: string): string {
  // Remove markdown bold/italic stars
  let clean = text.replace(/\*\*/g, '').replace(/\*/g, '');
  // Convert URLs to clickable links
  clean = clean.replace(/(https?:\/\/[^\s>]+)/g, (url: string) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#1549e6;text-decoration:underline;">${url}</a>`;
  });
  return clean;
}

import type { ChatBubbleProps } from '../types/chat';

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, profileIcon, time, animate }) => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(true);
  }, []);
  // Use 'animate' prop to control transition (if needed in future)
  return (
    <div
      className={`my-2 flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
      aria-label={role === 'user' ? 'User message' : 'Bot message'}
    >
      <div className={`flex items-end gap-2 ${role === 'user' ? 'flex-row-reverse' : ''}`} style={{ width: '100%' }}>
        {/* Profile Icon */}
        <img
          src={profileIcon}
          alt={role === 'user' ? 'User' : 'AI'}
          className="w-8 h-8 rounded-full shadow border border-gray-300"
          style={{ minWidth: 32, minHeight: 32 }}
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
            }`}
            style={role === 'user' ? {} : { fontFamily: 'Fira Mono, Menlo, monospace', fontSize: '1rem', letterSpacing: '-0.5px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
            dangerouslySetInnerHTML={role === 'user' ? { __html: content } : { __html: formatBotContent(content) }}
          />
          {/* Time below message */}
          <span className="text-xs text-gray-400 mt-1 text-right">{time}</span>
        </div>
      </div>
    </div>
  );
};

// (CSS for anchor tags is now in globals.css)

export default ChatBubble;
