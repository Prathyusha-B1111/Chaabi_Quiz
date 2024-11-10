import { useState } from "react";

const TimerInput = (props) => {

  return (
    <div className="timer-input-container p-4 bg-gray-200 rounded-md">
      <div className="timer-display mt-2 text-center text-xl text-black">
        10 Minutes
      </div>
    </div>
  );
};

export default TimerInput;
