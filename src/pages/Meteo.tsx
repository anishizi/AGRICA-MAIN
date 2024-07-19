import React from 'react';
import NavMeteo from '../components/NavMeteo';

const Meteo: React.FC = () => {
  return (
    <>
      <NavMeteo />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Météo
          </div>
          <p>
            This is the Météo page. Here you can view and manage weather information.
          </p>
        </div>
      </div>
    </>
  );
};

export default Meteo;
