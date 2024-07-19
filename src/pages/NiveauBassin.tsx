import React from 'react';
import NavNiveauBassin from '../components/NavNiveauBassin';

const NiveauBassin: React.FC = () => {
  return (
    <>
      <NavNiveauBassin />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Niveau Bassin
          </div>
          <p>
            This is the Niveau Bassin page. Here you can manage water levels.
          </p>
        </div>
      </div>
    </>
  );
};

export default NiveauBassin;
