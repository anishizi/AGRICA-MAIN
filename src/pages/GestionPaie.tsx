import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavGestionPaie from '../components/NavGestionPaie';

const GestionPaie: React.FC = () => {
  return (
    <ProtectedRoute role="ADMIN">
      <NavGestionPaie />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Gestion Paie</div>
          <p>This is the Gestion Paie page.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GestionPaie;
