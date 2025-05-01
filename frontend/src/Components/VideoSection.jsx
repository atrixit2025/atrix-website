import React from "react";
import videoSrc from "../assets/AtrixHomevideo.mp4";
import thumbnail from "../assets/thumbnail/t.png";

const VideoSection = () => {
  return (
    <div className="video-sec mx-6 pt-38">
      <div className="pointer-events-none">
        <video
          className="rounded-xl"
          src={videoSrc}
          poster={thumbnail}
          autoPlay
          muted
          loop
          controls={false}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default VideoSection;
