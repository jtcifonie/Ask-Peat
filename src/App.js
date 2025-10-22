import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SuggestedQuestions from './components/SuggestedQuestions';
import Chat from './components/Chat';
import InputSection from './components/InputSection';
import About from './components/About';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleMessageSent = (messageData) => {
    setMessages(prev => [...prev, messageData]);
    setShowChat(true);
  };

  const handleQuestionClick = async (question) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          sessionId: 'default'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      handleMessageSent({
        user: question,
        ai: data.response,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending question:', error);
      alert('Failed to send question. Please try again.');
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setShowChat(false);
    }
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigation} />
      <main className="main-content">
        {currentPage === 'about' ? (
          <About />
        ) : !showChat ? (
          <>
            <Hero />
            <SuggestedQuestions onQuestionClick={handleQuestionClick} />
          </>
        ) : (
          <Chat messages={messages} />
        )}
      </main>
      {currentPage !== 'about' && <InputSection onMessageSent={handleMessageSent} />}
    </div>
  );
}

export default App;
