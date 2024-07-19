import React from 'react';
import NavPlantations from '../components/NavPlantations';

const Plantations: React.FC = () => {
  return (
    <>
      <NavPlantations />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Plantations
          </div>
          <p>
            This is the Plantations page. Here you can manage plantations.
          </p>
        </div>
      </div>
    </>
  );
};

export default Plantations;
