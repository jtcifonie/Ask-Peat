import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './InputSection.css';

const InputSection = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message.trim(),
            sessionId: 'default'
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        
        // Call the parent component's callback with both user message and AI response
        onMessageSent({
          user: message.trim(),
          ai: data.response,
          timestamp: new Date().toISOString()
        });
        
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-section">
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            className="message-input"
            placeholder="Ask about Ray Peat's research..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          <button 
            className="send-button"
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} />
            )}
          </button>
        </div>
        <p className="disclaimer">
          This is a demo chatbot. Responses are simulated and may not reflect actual Ray Peat research.
        </p>
      </div>
    </div>
  );
};

export default InputSection;
