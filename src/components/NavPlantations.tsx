import React from 'react';
import { FiHeart } from 'react-icons/fi';

const NavPlantations: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiHeart className="icon" />
        <span className="sub-nav-title">Plantations</span>
      </div>
    </div>
  );
};

export default NavPlantations;
