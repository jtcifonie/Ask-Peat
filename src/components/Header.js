import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faComments, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ onNavigate }) => {
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
          <button 
            className="nav-link"
            onClick={() => onNavigate('home')}
          >
            <FontAwesomeIcon icon={faComments} />
            Chat
          </button>
          <button 
            className="nav-link"
            onClick={() => onNavigate('about')}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            About
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
