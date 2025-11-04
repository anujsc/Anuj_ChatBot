// Main App component for Portfolio AI Chatbot
import React from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <main className="flex-1 w-full max-w-2xl px-2 py-4">
        <ChatContainer />
      </main>
    </div>
  );
};

export default App;
