import React from 'react';
import { FiVideo } from 'react-icons/fi'; // Icône à ligne fine

const NavSurveillance: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiVideo className="icon" />
        <span className="sub-nav-title">Surveillance</span>
      </div>
    </div>
  );
};

export default NavSurveillance;
