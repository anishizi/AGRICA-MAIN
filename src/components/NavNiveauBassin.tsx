import React from 'react';
import { FiLayers } from 'react-icons/fi'; // Icône à ligne fine

const NavNiveauBassin: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiLayers className="icon" />
        <span className="sub-nav-title">Niveau Bassin</span>
      </div>
    </div>
  );
};

export default NavNiveauBassin;
