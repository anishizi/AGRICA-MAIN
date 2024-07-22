import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavMessage from '../components/NavMessage';

const Message: React.FC = () => {
  return (
    <ProtectedRoute requiredPermissions={['/Message']}>
      <NavMessage />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Message</div>
          <p>This is the Message page. Here you can manage your messages.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Message;
