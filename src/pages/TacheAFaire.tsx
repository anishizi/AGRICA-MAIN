import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavTacheAFaire from '../components/NavTacheAFaire';

const TacheAFaire: React.FC = () => {
  return (
    <ProtectedRoute requiredPermissions={['/TacheAFaire']}>
      <NavTacheAFaire />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Tâche à Faire</div>
          <p>This is the Tâche à Faire page. Here you can manage your tasks.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TacheAFaire;
