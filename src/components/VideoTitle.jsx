import React from "react";
import playIcon from "../assets/play.png";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-12 absolute bg-gradient-to-r from-black">
      <h1 className="text-5xl text-white font-bold">{title}</h1>
      <p className="py-6 text-md w-1/4 text-white">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white backdrop-blur-xs hover:bg-gray-400 text-black p-3 rounded-sm px-10 flex items-center gap-2">
          <img className="h-6 w-6" src={playIcon} alt="play-icon" />
          Play
        </button>

        <button className="bg-gray-500/30 backdrop-blur-xs text-white p-3 rounded-sm px-10 flex items-center gap-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
