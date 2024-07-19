import React from 'react';
import NavAutomat from '../components/NavAutomat';

const Automat: React.FC = () => {
  return (
    <>
      <NavAutomat />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Automat
          </div>
          <p>
            This is the Automat page. Here you can manage automated systems.
          </p>
        </div>
      </div>
    </>
  );
};

export default Automat;
