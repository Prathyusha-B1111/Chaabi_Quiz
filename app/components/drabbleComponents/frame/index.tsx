import React from 'react';

const Frame = ({ color }) => {
  
  return (
    <div
      className="lg:w-[300px] w-full h-[50px] rounded-md flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      Frame
    </div>
  );
};

export default Frame;
