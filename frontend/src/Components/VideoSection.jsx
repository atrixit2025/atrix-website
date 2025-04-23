
import React from 'react';
import video from "../assets/AtrixHomevideo.mp4";

const VideoSection = () => {
  return (
    <div className='pointer-events-none'>
      <video
        src={video}
        autoPlay 
        muted 
        poster='https://media.gettyimages.com/id/1302436712/video/loading-circle-icon-animation-on-black-background-4k-video-loopable-preloader.jpg?s=640x640&k=20&c=WJGwZEsiTQgk-HfSVV1GS-_y-uU7Fqu679eb25wAiKY='
        loop 
        controls={false} 
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  );
};

export default VideoSection;