// Main App component for Portfolio AI Chatbot
import React from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import './App.css';
import BackgroundSlideshow from './components/BackgroundSlideshow';







const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover flex flex-col items-center relative">
      {/* Black background fallback for slideshow */}
      <div className="fixed inset-0 -z-30 bg-[url('https://i.pinimg.com/736x/ae/8d/6a/ae8d6a22bd222dfebc2b3dcb49e64e27.jpg')] bg-cover" aria-hidden="true" />
      <BackgroundSlideshow />
      <Header />
      <main className="flex w-full max-w-2xl px-2 py-4">
        <ChatContainer />
      </main>
    </div>
  );
};

export default App;
