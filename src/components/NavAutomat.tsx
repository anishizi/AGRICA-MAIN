import React from 'react';
import { FiGitPullRequest } from 'react-icons/fi'; // Icône à ligne fine

const NavAutomat: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiGitPullRequest className="icon" />
        <span className="sub-nav-title">Automat</span>
      </div>
    </div>
  );
};

export default NavAutomat;
