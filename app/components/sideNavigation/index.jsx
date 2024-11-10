import { useState } from "react";
import { useDrag } from "react-dnd";
import CancelIcon from "../icons/cancelIocn";
import TimerInput from "../drabbleComponents/timerInput";
import Question from "../drabbleComponents/question";
import ProgressBar from "../drabbleComponents/progressBar";

const tabSelect = [
  { tabname: "Question", category: "question" },
  { tabname: "ProgressBar", category: "progressBar" },
  { tabname: "TimerInput", category: "timer" },
];

const DraggableItem = ({ name, question, timer, progress }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { name, question, timer, progress },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mt-3 text-center cursor-pointer bg-gray-200 rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {(() => {
        switch (name) {
          case "Question":
            return <Question question={question} />;
          case "ProgressBar":
            return <ProgressBar />;
          case "TimerInput":
            return <TimerInput />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

const SideNavigation = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sideNav, setSideNav] = useState(false);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const activeCategory = tabSelect[activeIndex]?.category;

  const filteredComponents = tabSelect.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div
      className={`w-80 bg-white h-screen overflow-scroll p-[20px] gap-3 flex flex-col text-black lg:static fixed z-[99] ${
        sideNav && "hidden"
      } ${!props.toggleNavProp ? "fixed z-[99]" : "lg:flex"}  transition-all`}
    >
      <button className="lg:hidden block" onClick={() => setSideNav(!sideNav)}>
        <CancelIcon />
      </button>
      <ul className="flex justify-between gap-[10px] flex-wrap">
        {tabSelect.map((eachtab, index) => (
          <li
            key={index}
            className={`text-[#0000006d] rounded-[25px] w-full px-[5px] text-center text-[15px] font-Inter cursor-pointer ${
              activeIndex === index ? "bg-green-200" : "bg-slate-200"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {eachtab.tabname}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        {filteredComponents.map((eachtab) => {
          switch (eachtab.category) {
            case "question":
              return props.props.map((question, idx) => (
                <DraggableItem key={idx} name="Question" question={question} />
              ));
            case "progressBar":
              return (
                <DraggableItem
                  key={eachtab.tabname}
                  name="ProgressBar"
                  progress={true}
                />
              );
            case "timer":
              return (
                <DraggableItem
                  key={eachtab.tabname}
                  name="TimerInput"
                  timer="600"
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default SideNavigation;
