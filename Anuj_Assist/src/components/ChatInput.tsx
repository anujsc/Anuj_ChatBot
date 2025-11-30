// ChatInput: input bar with accessibility and shortcuts
import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdMic } from "react-icons/io";
import { HiMiniSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import type { ChatInputProps } from '../types/chat';

const ChatInput: React.FC<ChatInputProps> = memo(({ 
  value, 
  onChange, 
  onSend, 
  loading,
  onMicClick,
  onSpeakerToggle,
  isListening,
  isSpeaking
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const [animate, setAnimate] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      triggerSend();
    } else if (e.key === 'Escape') {
      onChange('');
    }
  }, [loading, onChange]);

  const triggerSend = useCallback(() => {
    if (!value.trim() || loading) return;
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      onSend();
    }, 400); // Reduced from 500ms
  }, [value, loading, onSend]);

  return (
    <div className="flex gap-2 mt-2">
      {/* Input Field with Send Button Inside */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full border border-gray-400 rounded-lg pl-3 pr-11 sm:pr-12 py-2.5 text-sm sm:text-md tracking-tight focus:outline-none focus:ring-2 focus:ring-[#ba3f47] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder={loading ? "Generating response..." : "Type or speak your message..."}
          aria-label="Chat input"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        
        {/* Send Button - Inside Input */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full disabled:opacity-50 flex items-center justify-center bg-transparent hover:bg-gray-100 transition-all duration-200 z-10"
          onClick={triggerSend}
          disabled={loading || !value.trim()}
          aria-label="Send message"
        >
          <span
            className={`transition-transform -rotate-45 duration-400 ease-in-out ${animate ? 'animate-send' : ''}`}
            style={{ display: 'inline-block' }}
          >
            <AiOutlineSend color="#ba3f47" size={22} />
          </span>
        </button>
      </div>

      {/* Voice Controls - Right Side */}
      <div className="flex gap-1 sm:gap-2">
        {/* Mic Button */}
        <button
          onClick={onMicClick}
          disabled={loading}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening 
              ? 'bg-[#ba3f47] ring-2 ring-[#ba3f47] ring-offset-2 animate-pulse' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <IoMdMic color={isListening ? '#fff' : '#ba3f47'} size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Speaker Button */}
        <button
          onClick={onSpeakerToggle}
          disabled={loading}
          aria-label={isSpeaking ? 'Mute voice output' : 'Enable voice output'}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
        >
          {isSpeaking ? (
            <HiMiniSpeakerWave color='#ba3f47' size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <HiSpeakerXMark color='#ba3f47' size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      <style>{`
        .animate-send {
          transform: translateX(30px) scale(1.3) rotate(-20deg);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(.4,2,.3,1), opacity 0.4s;
        }
      `}</style>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
