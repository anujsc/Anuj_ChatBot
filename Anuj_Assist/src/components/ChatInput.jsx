// ChatInput: input bar with accessibility and shortcuts
import React, { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const ChatInput = ({ value, onChange, onSend, loading }) => {
  const inputRef = useRef(null);

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);


  const [animate, setAnimate] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      triggerSend();
    } else if (e.key === 'Escape') {
      onChange('');
    }
  };

  const triggerSend = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      onSend();
    }, 400); // Animation duration
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 border border-gray-400 rounded px-3 py-2 text-md tracking-tight"
        placeholder="Type your message ....."
        aria-label="Chat input"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className=" rounded disabled:opacity-50 flex items-center justify-center relative overflow-hidden"
        onClick={triggerSend}
        disabled={loading || !value.trim()}
        aria-label="Send message"
      >
        <span className="flex items-center gap-1">
          
          <span
            className={`transition-transform -rotate-45 duration-400 ease-in-out ${animate ? 'animate-send' : ''}`}
            style={{ display: 'inline-block' }}
          >
            <AiOutlineSend color="blue" size={30} />
          </span>
        </span>
        <style>{`
          .animate-send {
            transform: translateX(30px) scale(1.3) rotate(-20deg);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(.4,2,.3,1), opacity 0.4s;
          }
        `}</style>
      </button>
    </div>
  );
};

export default ChatInput;
