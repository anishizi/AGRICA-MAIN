import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavIrrigation from '../components/NavIrrigation';

const Irrigation: React.FC = () => {
  return (
    <ProtectedRoute requiredPermissions={['/Irrigation']}>
      <NavIrrigation />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Irrigation</div>
          <p>This is the Irrigation page. Here you can manage irrigation systems.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Irrigation;
