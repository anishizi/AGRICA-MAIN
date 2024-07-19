import React from 'react';
import { FiDroplet } from 'react-icons/fi'; // Icône à ligne fine

const NavIrrigation: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiDroplet className="icon" />
        <span className="sub-nav-title">Irrigation</span>
      </div>
    </div>
  );
};

export default NavIrrigation;
