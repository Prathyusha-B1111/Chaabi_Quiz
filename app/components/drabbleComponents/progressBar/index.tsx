const ProgressBar = () => {
    return (
      <div className="progress-bar-container w-full bg-gray-300 rounded-md p-2">
        <div
          className="progress-bar bg-blue-500 h-4 rounded-md"
          style={{ width: "50%" }} // Adjust width to simulate progress
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;
  