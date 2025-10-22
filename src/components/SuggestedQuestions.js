import React from 'react';
import './SuggestedQuestions.css';

const SuggestedQuestions = ({ onQuestionClick }) => {
  const questions = [
    "What did Ray Peat say about metabolism?",
    "Tell me about the role of thyroid function",
    "What foods did Ray Peat recommend?",
    "Explain Ray Peat's views on stress"
  ];

  const handleQuestionClick = async (question) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className="suggested-questions">
      <div className="questions-grid">
        {questions.map((question, index) => (
          <button
            key={index}
            className="question-button"
            onClick={() => handleQuestionClick(question)}
          >
            <span className="question-text">{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
