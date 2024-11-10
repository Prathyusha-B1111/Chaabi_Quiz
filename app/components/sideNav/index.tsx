import { useState } from "react";
import DownloadIcon from "../icons/downloadIocn";
import FileIcon from "../icons/fileIcon";
import HelpIcon from "../icons/helpIcon";
import LightIcon from "../icons/lightIcon";
import PlayIcon from "../icons/playIcon";
import VideoFileIcon from "../icons/videoFileIcon";

const icons = [
  { component: <VideoFileIcon />, label: "Video File" },
  { component: <LightIcon />, label: "Light" },
  { component: <FileIcon />, label: "File" },
  { component: <HelpIcon />, label: "Help" },
  { component: <DownloadIcon />, label: "Download" },
  { component: <PlayIcon />, label: "Play" },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-[70px] h-full flex flex-col items-center justify-center p-[10px] gap-[10px]">
      {icons.map((icon, index) => (
        <span
          key={index}
          className={`w-[50px] h-[50px] rounded-full flex justify-center items-center cursor-pointer ${
            activeIndex === index && "bg-[#fff]"
          }`}
          aria-label={icon.label}
          onClick={() => handleIconClick(index)}
        >
          {icon.component}
        </span>
      ))}
    </div>
  );
};

export default SideNav;
