import { useDrop } from "react-dnd";
import { useState } from "react";
import Question from "../drabbleComponents/question";
import ProgressBar from "../drabbleComponents/progressBar";
import TimerInput from "../drabbleComponents/timerInput";
import AddFileIcon from "../icons/addFileIcon";
import Menu from "../icons/menuIcon";
import { useNavigate } from "react-router-dom";

const Canvas = (props) => {
  const [droppedComponents, setDroppedComponents] = useState([]);
  const navigate = useNavigate();
  console.log("droppedComponents", droppedComponents);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => {
      if (
        item.name === "Question" ||
        !droppedComponents.some((comp) => comp.name === item.name)
      ) {
        setDroppedComponents((prev) => [...prev, item]);
      }
    },
    canDrop: (item) => {
      return (
        item.name === "Question" ||
        !droppedComponents.some((comp) => comp.name === item.name)
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const renderComponent = (component) => {
    switch (component.name) {
      case "Question":
        return <Question question={component.question} />;
      case "ProgressBar":
        return <ProgressBar />;
      case "TimerInput":
        return <TimerInput />;
      default:
        return null;
    }
  };

  const sentData = () => {
    props.getPostData(droppedComponents);
    navigate("/user");
  };

  const toggleNav = () => {
    props.toggleNavFun();
  };

  return (
    <div
      ref={drop}
      className={`canvas-area bg-gray-100 h-screen border-2 border-dashed ${
        isOver && canDrop ? "border-green-500" : "border-gray-300"
      }`}
    >
      <div className="bg-white rounded-md h-[50px] p-[10px] px-[20px] items-center flex gap-[20px] text-black justify-end">
        <button className="lg:hidden" onClick={toggleNav}>
          <Menu />
        </button>
        <button onClick={sentData}>
          <AddFileIcon />
        </button>
      </div>
      {isOver && !canDrop && (
        <p className="text-center text-red-500">
          You can only drop unique components here.
        </p>
      )}
      {isOver && canDrop && (
        <p className="text-center text-green-500">Release to drop</p>
      )}

      <div className="mt-2 p-10 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {droppedComponents.map((component, index) => (
          <div
            key={index}
            className="dropped-component min-h-[200px] max-h-[200px]"
          >
            {renderComponent(component)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
