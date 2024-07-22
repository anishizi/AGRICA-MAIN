import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavNotification from '../components/NavNotification';

const Notification: React.FC = () => {
  return (
    <ProtectedRoute requiredPermissions={['/Notification']}>
      <NavNotification />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Notification</div>
          <p>This is the Notification page. Here you can manage your notifications.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Notification;
