import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCode, faPalette, faCoffee } from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <div className="about-icon">
            <FontAwesomeIcon icon={faBrain} />
          </div>
          <h1>About Ask Dr. Peat</h1>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>🧠 What is this?</h2>
            <p>
              Ask Dr. Peat is an AI-powered chatbot that specializes in Dr. Ray Peat's extensive research 
              on metabolism, nutrition, and health. Think of it as your personal Ray Peat research assistant 
              that never gets tired of explaining thyroid function, cellular energy production, and why 
              sugar might actually be your friend (controversial, I know).
            </p>
          </div>

          <div className="about-section">
            <h2>🤖 The AI Behind the Magic</h2>
            <p>
              Powered by Google's Gemini AI, this chatbot has been trained to understand and respond to 
              questions about Ray Peat's unique perspectives on health. It's like having a knowledgeable 
              friend who's read every single one of Dr. Peat's articles and can explain them without 
              making your brain hurt.
            </p>
          </div>

          <div className="about-section">
            <h2>⚡ Built with Love (and Lots of Coffee)</h2>
            <p>
              This masterpiece was crafted by <strong>The Toddfather</strong> with the help of some 
              pretty amazing AI tools. Here's the behind-the-scenes story:
            </p>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCode} className="about-icon-small" />
                <strong>Cursor AI</strong> - Your friendly neighborhood coding assistant who had to 
                gently coax The Toddfather through the entire development process. "No, we can't 
                just copy-paste everything from Stack Overflow..." 😅
              </li>
              <li>
                <FontAwesomeIcon icon={faPalette} className="about-icon-small" />
                <strong>Figma</strong> - Where the beautiful dark mode design was born, because 
                apparently white backgrounds are for peasants.
              </li>
              <li>
                <FontAwesomeIcon icon={faCoffee} className="about-icon-small" />
                <strong>Lots of Coffee</strong> - The secret ingredient that made this all possible.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>🎯 The Development Journey</h2>
            <p>
              Building this app was like herding cats, but in a good way. We went through:
            </p>
            <ul>
              <li>Setting up MCP servers (because why make things simple?)</li>
              <li>Fighting with ES modules vs CommonJS (the eternal struggle)</li>
              <li>Debugging CORS issues (the bane of every developer's existence)</li>
              <li>Deploying to Render (where we learned that "free tier" means "please be patient")</li>
              <li>Convincing The Toddfather that yes, we really do need to test things before deploying</li>
            </ul>
            <p>
              But hey, we made it! And now you have a beautiful, functional AI assistant that knows 
              more about Ray Peat's research than most people know about their own families.
            </p>
          </div>

          <div className="about-section">
            <h2>🚀 Tech Stack</h2>
            <p>
              For the tech-savvy among you, this app is built with:
            </p>
            <ul>
              <li><strong>Frontend:</strong> React with FontAwesome icons and dark mode styling</li>
              <li><strong>Backend:</strong> Node.js/Express with Google Gemini AI integration</li>
              <li><strong>Deployment:</strong> Render (because we're fancy like that)</li>
              <li><strong>Design:</strong> Figma → React (with lots of CSS tears)</li>
            </ul>
          </div>

          <div className="about-footer">
            <p>
              <em>
                "The best way to learn about Ray Peat's research is to ask questions. 
                The second best way is to build an AI that can answer them for you." 
                - The Toddfather (probably)
              </em>
            </p>
            <div className="about-links">
              <a href="/" className="back-link">
                ← Back to Ask Dr. Peat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
