// components/SubNavAccueil.tsx

import React from 'react';
import { FiHome } from 'react-icons/fi';

const SubNavAccueil: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiHome className="icon" />
        <span className="sub-nav-title">Accueil</span>
      </div>
    </div>
  );
};

export default SubNavAccueil;
