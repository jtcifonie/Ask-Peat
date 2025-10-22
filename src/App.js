import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SuggestedQuestions from './components/SuggestedQuestions';
import Chat from './components/Chat';
import InputSection from './components/InputSection';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

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

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {!showChat ? (
          <>
            <Hero />
            <SuggestedQuestions onQuestionClick={handleQuestionClick} />
          </>
        ) : (
          <Chat messages={messages} />
        )}
      </main>
      <InputSection onMessageSent={handleMessageSent} />
    </div>
  );
}

export default App;
