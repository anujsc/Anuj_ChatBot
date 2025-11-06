// ChatContainer: main chat logic and UI
import React, { useState, useEffect, useRef } from 'react';
import useChat from '../hooks/useChat';
import type { Message, ChatBubbleProps } from '../types/chat';
import { Suspense } from 'react';
const ChatInput = React.lazy(() => import('./ChatInput'));
const Loader = React.lazy(() => import('./Loader'));
const ChatBubble = React.lazy(() => import('./ChatBubble'));

interface ChatContainerProps {
  setShowContact: (show: boolean) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ setShowContact }) => {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    error,
    typing,
    saveHistory,
    toggleSaveHistory
  } = useChat();

  const [isShow] = useState(true);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const lines = [
    "Ask me about Anuj Chaudhari's projects, tech stack, or career.",
    "Try typing hello or experience to get started."
  ];

  // Memoize highlightWords for performance
  const highlightWords = React.useCallback((text: string) => {
    return text.replace(/hello|experience/gi, (match) =>
      `<span class='font-mono bg-gray-200 px-1 rounded' style='color:#ba3f47;'>${match}</span>`
    );
  }, []);

  // Typewriter effect for initial prompt
  useEffect(() => {
    if (messages.length > 0) {
      setTypewriterText(lines.join('\n'));
      return;
    }

    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex] || '';
    const currentText = typewriterText.split('\n')[currentLineIndex] || '';

    if (currentText.length < currentLine.length) {
      const timer = setTimeout(() => {
        const allLines = typewriterText.split('\n');
        allLines[currentLineIndex] = currentLine.substring(0, currentText.length + 1);
        setTypewriterText(allLines.join('\n'));
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentLineIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setTypewriterText(typewriterText + '\n');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [typewriterText, currentLineIndex, messages.length, lines]);

  // Ref for auto-scroll
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  // Memoize input handlers for performance
  const handleInputChange = React.useCallback(setInput, [setInput]);
  const handleSend = React.useCallback(() => sendMessage(), [sendMessage]);

  return (
    <section className="flex flex-col h-[80vh] w-[110vh] rounded-2xl bg-linear-to-br from-gray-200 via-gray-100 to-gray-300 shadow-xl p-6">
      {/* Header with save history toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-xl text-gray-700 flex items-center gap-2 tracking-tighter">
          <span role="img" aria-label="message">💬</span> Chat with Anuj 
        </span>
        <div className="flex items-center gap-3">
          {/* <label className="flex items-center gap-2 text-xs select-none">
            <span className="relative inline-block w-10 h-5 align-middle">
              <input
                type="checkbox"
                checked={saveHistory}
                onChange={toggleSaveHistory}
                className="peer opacity-0 w-10 h-5 absolute cursor-pointer"
              />
              <span
                className="block w-10 h-5 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-[#ba3f47]"
              ></span>
              <span
                className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"
              ></span>
            </span>
            <span className="text-gray-800 font-medium">Save history</span>
          </label> */}
          <button
            className="ml-2 px-4 py-2 tracking-tighter rounded-lg bg-linear-to-r from-[#721319] to-[#ba3f47] text-white font-semibold shadow hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-[#6C63FF]"
            onClick={() => setShowContact(true)}
            aria-label="Open Contact"
            type="button"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div
        id="messages"
        className="flex-1 overflow-y-auto mb-2 px-2 fancy-scrollbar"
        aria-live="polite"
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        <style>{`
          .fancy-scrollbar::-webkit-scrollbar {
            width: 6px;
            background: #ffeaea;
          }
          .fancy-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(120deg, #ba3f47 0%, #e57373 100%);
            border-radius: 6px;
            box-shadow: 0 2px 6px rgba(186,63,71,0.15);
          }
          .fancy-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ba3f47 #ffeaea;
          }
          .typewriter-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background-color: #ba3f47;
            margin-left: 2px;
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <span className="text-4xl md:text-5xl font-extrabold mb-2 font-[Inter] tracking-tight" style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '-1px' }}>
              How can I help you today?
            </span>
            <div className="text-base md:text-lg font-light mb-4 font-[Fira Sans] min-h-14" style={{ fontFamily: 'Fira Sans, Arial, sans-serif', color: '#555', letterSpacing: '-0.5px' }}>
              {typewriterText.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {index === 1
                    ? <span dangerouslySetInnerHTML={{ __html: highlightWords(line) }} />
                    : line}
                  {index < typewriterText.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
              {currentLineIndex < lines.length && typewriterText.split('\n')[currentLineIndex]?.length < lines[currentLineIndex]?.length && (
                <span className="typewriter-cursor"></span>
              )}
            </div>
            <img
              className="h-[16vh] mb-2"
              role="img"
              aria-label="robot"
              src="https://i.pinimg.com/736x/b5/0e/da/b50eda106e100539b904eadecb125a30.jpg"
              alt="robot"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {isShow && (
          <Suspense fallback={<div className="animate-pulse h-12 bg-gray-100 rounded mb-2 w-2/3 mx-auto" />}>
            {(messages as Message[]).map((msg, i) => {
              const profileIcon = msg.role === 'user'
                ? 'https://i.pinimg.com/736x/38/cd/ca/38cdca5c07bfa77aa00d32f3b64b402d.jpg'
                : 'https://i.pinimg.com/736x/89/56/f2/8956f2dea744e88cddf7f13bb13bde5a.jpg';
              const time = msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const bubbleProps: ChatBubbleProps = {
                ...msg,
                profileIcon,
                time,
                animate: true,
              };
              return (
                <ChatBubble
                  key={i}
                  {...bubbleProps}
                />
              );
            })}
          </Suspense>
        )}
        {typing && (
          <Suspense fallback={<div className="animate-pulse h-8 bg-gray-100 rounded mb-2 w-1/2 mx-auto" />}>
            <Loader />
          </Suspense>
        )}
        {/* Auto-scroll anchor */}
        <div ref={endOfMessagesRef} />
      </div>
      {error && (
        <div className="text-red-600 text-xs mb-2" role="alert">{error}</div>
      )}
      <Suspense fallback={<div className="animate-pulse h-10 bg-gray-100 rounded w-full mb-2" />}>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onSend={handleSend}
          loading={loading}
        />
      </Suspense>
      <div className="mt-4 text-center text-xs text-gray-400">
        <span role="img" aria-label="bolt">⚡</span> Powered by Groq &amp; React
      </div>
    </section>
  );
};

export default ChatContainer;