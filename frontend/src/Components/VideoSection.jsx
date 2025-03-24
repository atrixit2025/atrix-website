
import React from 'react';
import video from "../assets/Final Website cmpress Apatrix video.mp4";

const VideoSection = () => {
  return (
    <div className='pointer-events-none'>
      <video
        src={video}
        autoPlay 
        muted 
        loop 
        controls={false} 
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  );
};

export default VideoSection;