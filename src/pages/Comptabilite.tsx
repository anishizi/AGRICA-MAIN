import React from 'react';
import NavComptabilite from '../components/NavComptabilite';

const Comptabilite: React.FC = () => {
  return (
    <>
      <NavComptabilite />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Comptabilité
          </div>
          <p>
            This is the Comptabilité page. Here you can manage accounting tasks.
          </p>
        </div>
      </div>
    </>
  );
};

export default Comptabilite;
