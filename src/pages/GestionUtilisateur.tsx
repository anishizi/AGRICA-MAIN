import React from 'react';
import NavGestionUtilisateur from '../components/NavGestionUtilisateur';

const GestionUtilisateur: React.FC = () => {
  return (
    <>
      <NavGestionUtilisateur />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Gestion Utilisateur
          </div>
          <p>
            This is the Gestion Utilisateur page. Here you can manage users.
          </p>
        </div>
      </div>
    </>
  );
};

export default GestionUtilisateur;
