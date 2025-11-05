// Main App component for Portfolio AI Chatbot
import React from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import './App.css';


//import image 


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/736x/8b/3d/bd/8b3dbd49e14c81dd69ca3b1bab903a1b.jpg')] flex flex-col items-center">
      <Header />
      <main className="flex w-full max-w-2xl px-2 py-4">
        <ChatContainer />
      </main>
    </div>
  );
};

export default App;
