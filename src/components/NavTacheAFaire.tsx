import React from 'react';
import { FiCalendar } from 'react-icons/fi'; // Icône à ligne fine

const NavTacheAFaire: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiCalendar className="icon" />
        <span className="sub-nav-title">Tâche à Faire</span>
      </div>
    </div>
  );
};

export default NavTacheAFaire;
