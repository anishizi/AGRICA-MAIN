import React from 'react';
import NavMessage from '../components/NavMessage';

const Message: React.FC = () => {
  return (
    <>
      <NavMessage />
      <div className="container mx-auto p-4">
        <div className="container-div">
          <div className="container-title">
            Message
          </div>
          <p>
            This is the Message page. Here you can manage your messages.
          </p>
        </div>
      </div>
    </>
  );
};

export default Message;
