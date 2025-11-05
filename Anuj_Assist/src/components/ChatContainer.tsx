// ChatContainer: main chat logic and UI
import React, { useState } from 'react';
import useChat from '../hooks/useChat';
import type { Message, ChatBubbleProps } from '../types/chat';
import { Suspense } from 'react';
import ChatInput from './ChatInput';
import Loader from './Loader';
const ChatBubble = React.lazy(() => import('./ChatBubble'));

const ChatContainer = () => {
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

  React.useEffect(() => {
    const el = document.getElementById('messages');
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);


  // React.useEffect(() => {  
  //   setTimeout(() => {
  //     setIsShow(true);
  //   }, 2000);
  // }, []); 

  return (
  <section className="flex flex-col h-[80vh] w-[120vh]  rounded-2xl bg-linear-to-br from-gray-200 via-gray-100 to-gray-300 shadow-xl p-6">
      <div className="flex justify-between  items-center mb-4">
        <span className="font-medium text-xl text-gray-800 flex items-center gap-2 tracking-tighter">
          <span role="img" aria-label="message">💬</span> Chat with Anuj 
        </span>
        <label className="flex items-center gap-2 text-xs select-none">
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
          <span className="text-gray-800 font-medium ">Save history</span>
        </label>
      </div>
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
        `}</style>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <span className="text-4xl md:text-5xl font-extrabold mb-2 font-[Inter] tracking-tight" style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '-1px' }}>
              How can I help you today?
            </span>
            <span className="text-base md:text-lg font-light mb-4 font-[Fira Sans]" style={{ fontFamily: 'Fira Sans, Arial, sans-serif', color: '#555', letterSpacing: '-0.5px' }}>
              Ask me about Anuj Chaudhari's projects, tech stack, or career.<br />
              Try typing <span className="font-mono bg-gray-200 px-1 rounded">hello</span> or <span className="font-mono bg-gray-200 px-1 rounded">experience</span> to get started.
            </span>
            <img className="h-[16vh] mb-2" role="img" aria-label="robot" src="https://i.pinimg.com/736x/b5/0e/da/b50eda106e100539b904eadecb125a30.jpg" alt="robot" />
          </div>
        )}

        {isShow && <Suspense fallback={<div className="animate-pulse h-12 bg-gray-100 rounded mb-2 w-2/3 mx-auto" />}> 
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
        </Suspense>}
        {typing && <Loader />}
      </div>
      {error && (
        <div className="text-red-600 text-xs mb-2" role="alert">{error}</div>
      )}
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        loading={loading}
      />
      <div className="mt-4 text-center text-xs text-gray-400">
        <span role="img" aria-label="bolt">⚡</span> Powered by Groq &amp; React
      </div>
    </section>
  );
};

export default ChatContainer;
