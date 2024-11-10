import React from "react";
import { useDrag } from "react-dnd";

const HexagonFrame = ({ color }: { color: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "HEXAGON",
    item: { color }, // Pass the color as part of the dragged item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`hexagon ${isDragging ? "opacity-50" : ""}`}
      style={{
        backgroundColor: color,
        clipPath: "polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)",
        width: "100px",
        height: "87px",
        margin: "10px",
        transition: "opacity 0.3s ease",
      }}
    ></div>
  );
};

export default HexagonFrame;
