import React from 'react';
import NavSurveillance from '../components/NavSurveillance';

const Surveillance: React.FC = () => {
  return (
    <>
      <NavSurveillance />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Surveillance
          </div>
          <p>
            This is the Surveillance page. Here you can manage surveillance systems.
          </p>
        </div>
      </div>
    </>
  );
};

export default Surveillance;
