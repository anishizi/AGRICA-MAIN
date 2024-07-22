import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import SubNavAccueil from '../components/SubNavAccueil';

const Home: React.FC = () => {
  return (
    <ProtectedRoute requiredPermissions={['/']}>
      <SubNavAccueil />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <h1 className="container-title">Bonjour</h1>
          <p className="text-gray-700">
            Welcome to our rural management and control site. Our platform is designed to streamline operations and improve efficiency for rural projects. Stay tuned for more updates and features.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
