// Main App component for Portfolio AI Chatbot
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ToastProvider } from './hooks/useToast';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import './styles/toast-animations.css';

// Lazy load heavy components
const FuturisticLoader = lazy(() => import('./components/FuturisticLoaderOptimized'));
const Header = lazy(() => import('./components/Header'));
const ChatContainer = lazy(() => import('./components/ChatContainer'));
const BackgroundSlideshow = lazy(() => import('./components/BackgroundSlideshow'));
const Contact = lazy(() => import('./components/Contact'));







// Lightweight fallback loader
const LoaderFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a0a0e] to-black">
    <div className="w-12 h-12 border-4 border-[#ba3f47] border-t-transparent rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      'https://i.pinimg.com/736x/ae/8d/6a/ae8d6a22bd222dfebc2b3dcb49e64e27.jpg'
    ];
    
    Promise.all([
      // Preload first background image
      ...preloadImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Don't block on error
          img.src = src;
        });
      }),
      // Minimum display time
      new Promise(resolve => setTimeout(resolve, 1500))
    ]).then(() => {
      setContentReady(true);
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  return (
    <>
      {/* GSAP Animated Loader */}
      <Suspense fallback={<LoaderFallback />}>
        {isLoading && <FuturisticLoader isLoading={isLoading} />}
      </Suspense>

      <ToastProvider defaultTheme="dark" position="top-right" maxToasts={5}>
        <div className="min-h-screen w-full bg-cover flex flex-col items-center relative">
          {/* Black background fallback for slideshow */}
          <div className="fixed inset-0 w-full -z-30 bg-[url('https://i.pinimg.com/736x/ae/8d/6a/ae8d6a22bd222dfebc2b3dcb49e64e27.jpg')] bg-cover" aria-hidden="true" />
          
          <Suspense fallback={null}>
            {contentReady && <BackgroundSlideshow />}
          </Suspense>
          
          <Suspense fallback={<div className="h-20 w-full" />}>
            <Header />
          </Suspense>
          
          <main className="flex justify-center w-full px-2 py-4">
            <Suspense fallback={<div className="w-full max-w-[110vh] h-[80vh] bg-gray-200/50 rounded-2xl animate-pulse" />}>
              {contentReady && <ChatContainer setShowContact={setShowContact} />}
            </Suspense>
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
                  <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />}>
                    <Contact />
                  </Suspense>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ToastProvider>
    </>
  );
};

export default React.memo(App);
