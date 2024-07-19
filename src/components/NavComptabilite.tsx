import React from 'react';
import { FiFileText } from 'react-icons/fi'; // Icône à ligne fine

const NavComptabilite: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiFileText className="icon" />
        <span className="sub-nav-title">Comptabilité</span>
      </div>
    </div>
  );
};

export default NavComptabilite;
