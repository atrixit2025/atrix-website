
import React from 'react';
import video from "../assets/AtrixHomevideo.mp4";
import thumbnail1 from "../assets/thumbnail-1.jpg";


const VideoSection = () => {
  return (
    <div className='pointer-events-none'>
      <video
        src={video}
        autoPlay 
        muted 
        poster={thumbnail1}
        loop 
        controls={false} 
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  );
};

export default VideoSection;