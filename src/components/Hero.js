import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-icon-container">
          <div className="hero-icon">
            <FontAwesomeIcon icon={faBrain} />
          </div>
        </div>
        
        <h1 className="hero-title">Ask Dr. Ray Peat AI</h1>
        
        <p className="hero-description">
          Get insights based on Dr. Ray Peat's extensive research on metabolism, nutrition, and health.
        </p>
      </div>
    </div>
  );
};

export default Hero;
