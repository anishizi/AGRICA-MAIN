import React from 'react';
import { FiCloud } from 'react-icons/fi'; // Icône à ligne fine

const NavMeteo: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiCloud className="icon" />
        <span className="sub-nav-title">Météo</span>
      </div>
    </div>
  );
};

export default NavMeteo;
