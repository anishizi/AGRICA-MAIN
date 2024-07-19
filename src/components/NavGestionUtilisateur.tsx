import React from 'react';
import { FiUsers } from 'react-icons/fi'; // Icône à ligne fine

const NavGestionUtilisateur: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiUsers className="icon" />
        <span className="sub-nav-title">Gestion Utilisateur</span>
      </div>
    </div>
  );
};

export default NavGestionUtilisateur;
