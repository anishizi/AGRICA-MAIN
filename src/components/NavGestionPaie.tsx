import React from 'react';
import { FiClipboard } from 'react-icons/fi'; // Icône à ligne fine

const NavGestionPaie: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiClipboard className="icon" />
        <span className="sub-nav-title">Gestion Paie</span>
      </div>
    </div>
  );
};

export default NavGestionPaie;
