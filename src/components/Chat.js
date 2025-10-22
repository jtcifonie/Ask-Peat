import React from 'react';
import './Chat.css';

const Chat = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <p>Welcome! Ask me anything about Dr. Ray Peat's research on metabolism, nutrition, and health.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message, index) => (
            <div key={index} className="message-group">
              <div className="user-message">
                <div className="message-content">
                  {message.user}
                </div>
              </div>
              <div className="ai-message">
                <div className="message-content">
                  {message.ai}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
