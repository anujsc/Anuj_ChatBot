// Main App component for Portfolio AI Chatbot
import React, { useState } from 'react';

import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import './App.css';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';







const App: React.FC = () => {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className="min-h-screen w-full bg-cover flex flex-col items-center relative">
      {/* Black background fallback for slideshow */}
      <div className="fixed inset-0 w-full -z-30 bg-[url('https://i.pinimg.com/736x/ae/8d/6a/ae8d6a22bd222dfebc2b3dcb49e64e27.jpg')] bg-cover" aria-hidden="true" />
      <BackgroundSlideshow />
      <Header />
      <main className="flex justify-center w-full px-2 py-4">
        <ChatContainer setShowContact={setShowContact} />
      </main>



      {/* Contact Modal Overlay */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl"
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-[#6C63FF] font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
                onClick={() => setShowContact(false)}
                aria-label="Close Contact"
                tabIndex={0}
              >
                <span className="text-2xl">&times;</span>
              </button>
              <Contact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
