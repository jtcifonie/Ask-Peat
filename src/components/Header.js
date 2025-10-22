import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faComments, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faBrain} />
          </div>
          <span className="logo-text">Ask Dr. Peat</span>
        </div>
        
        <nav className="navigation">
          <a href="#chat" className="nav-link">
            <FontAwesomeIcon icon={faComments} />
            Chat
          </a>
          <a href="#about" className="nav-link">
            <FontAwesomeIcon icon={faInfoCircle} />
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
