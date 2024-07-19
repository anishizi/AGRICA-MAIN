import React from 'react';
import { FiMessageCircle } from 'react-icons/fi'; // Icône à ligne fine

const NavMessage: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiMessageCircle className="icon" />
        <span className="sub-nav-title">Message</span>
      </div>
    </div>
  );
};

export default NavMessage;
