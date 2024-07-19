import React from 'react';
import NavGestionPaie from '../components/NavGestionPaie';

const GestionPaie: React.FC = () => {
  return (
    <>
      <NavGestionPaie />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Gestion Paie
          </div>
          <p>
            This is the Gestion Paie page. Here you can manage payroll tasks.
          </p>
        </div>
      </div>
    </>
  );
};

export default GestionPaie;
