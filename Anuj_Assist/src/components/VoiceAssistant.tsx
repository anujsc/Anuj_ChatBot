// VoiceAssistant: Modular voice input/output for chatbot using browser APIs
// Uses Web Speech API (SpeechRecognition) for speech-to-text
// Uses SpeechSynthesis API for text-to-speech
// Tailwind CSS and Framer Motion for UI/UX
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdMic } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";

interface VoiceAssistantProps {
  onVoiceInput: (text: string) => void;
  isSpeaking: boolean;
  setIsSpeaking: (val: boolean) => void;
  botReply?: string;
}

// Check browser support for SpeechRecognition
const isSpeechRecognitionSupported =
  'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

// Get correct SpeechRecognition constructor
const getSpeechRecognition = () => {
  if ('webkitSpeechRecognition' in window) {
    return new (window as any).webkitSpeechRecognition();
  } else if ('SpeechRecognition' in window) {
    return new (window as any).SpeechRecognition();
  }
  return null;
};

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onVoiceInput,
  isSpeaking,
  setIsSpeaking,
  botReply,
}) => {
  // State for listening, errors, and browser support
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(isSpeechRecognitionSupported);
  const recognitionRef = useRef<any>(null);

  // Toggle mic listening state
  // On start: initialize SpeechRecognition, set up handlers, start listening
  // On stop: stop recognition
  const toggleListening = () => {
    if (!supported) return;
    if (!listening) {
      setError(null);
      if (!recognitionRef.current) {
        recognitionRef.current = getSpeechRecognition();
        if (!recognitionRef.current) {
          setSupported(false);
          setError('SpeechRecognition not supported.');
          return;
        }
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        // On successful result, pass transcript to parent and stop listening
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onVoiceInput(transcript);
          setListening(false);
        };
        // Handle errors (permissions, mic issues)
        recognitionRef.current.onerror = (event: any) => {
          setError(event.error || 'Mic error');
          setListening(false);
        };
        // On end, reset listening state
        recognitionRef.current.onend = () => {
          setListening(false);
        };
      }
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current?.stop();
      setListening(false);
    }
  };

  // Speak bot reply aloud using SpeechSynthesis API
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (isSpeaking && botReply) {
      const utter = new SpeechSynthesisUtterance(botReply);
      utter.lang = 'en-US';
      synth.speak(utter);
    } else if (!isSpeaking) {
      // Stop any ongoing speech when muted
      synth.cancel();
    }
  }, [botReply, isSpeaking]);

  // Fallback for unsupported browsers
  useEffect(() => {
    setSupported(isSpeechRecognitionSupported);
  }, []);

  // UI: mic button (voice input), mute/unmute (voice output), error & support messages
  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        <motion.button
          key="mic"
          aria-label={listening ? 'Stop listening' : 'Start voice input'}
          onClick={toggleListening}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg  bg-gray-200 hover:bg-gray-300 transition-all duration-200 focus:outline-none ${listening ? 'ring-4 ring-[#ba3f47] animate-pulse' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">
            <IoMdMic color='#ba3f47'/>
          </span>
          {listening && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.button>
      </AnimatePresence>
      <button
        aria-label={isSpeaking ? 'Mute voice output' : 'Enable voice output'}
        onClick={() => setIsSpeaking(!isSpeaking)}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-200"
      >
        <span className="text-xl">
          {isSpeaking ? <HiMiniSpeakerWave color='#ba3f47' /> : <HiSpeakerXMark color='#ba3f47'/>}
        </span>
      </button>
      {!supported && (
        <span className="text-xs text-red-500 ml-2">Browser does not support voice input.</span>
      )}
      {error && (
        <span className="text-xs text-red-500 ml-2">{error}</span>
      )}
    </div>
  );
};

export default VoiceAssistant;
