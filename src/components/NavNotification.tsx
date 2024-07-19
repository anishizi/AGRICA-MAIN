import React from 'react';
import { FiBell } from 'react-icons/fi'; // Icône à ligne fine

const NavNotification: React.FC = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiBell className="icon" />
        <span className="sub-nav-title">Notification</span>
      </div>
    </div>
  );
};

export default NavNotification;
