import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavComptabilite from '../components/NavComptabilite';

const Comptabilite: React.FC = () => {
  return (
    <ProtectedRoute role="ADMIN">
      <NavComptabilite />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">Comptabilité</div>
          <p>This is the Comptabilité page.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Comptabilite;
