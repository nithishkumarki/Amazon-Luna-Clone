import React, { useState, useEffect,useRef } from "react";
import {Link} from "react-router-dom";
import "../CSS/ImageSlider.css"; 
import muted from "../assets/logos/muted.svg";
import unmuted from "../assets/logos/unmuted.svg";

const media = 
[
  { type: "video", src:"https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/video%2FGrand%20Theft%20Auto%20VI%20Trailer%202.mp4?alt=media&token=23e0dab3-e791-4304-aa5c-9b2b31bc27df",title:"https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fgtatitle-removebg-preview.webp?alt=media&token=608b32e1-79b6-4cba-a995-7cdf67009ddc",content:"Comming Soon", },
  { type: "video", src:  "https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/video%2Fbatman.mp4?alt=media&token=90ad9a2b-511a-45e3-9e8c-fe059b667beb",title:"https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fbatman_title.webp?alt=media&token=ef9ef855-3d39-4665-bebe-c3505a7ff73b",content:"Available now", },
  { type: "video", src:  "https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/video%2Fspongbob.mp4?alt=media&token=10cad8a4-73a4-4bdb-8114-0ec4c2fc767d",title:"https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fspongebob_title.webp?alt=media&token=53e8ee3b-a9fb-4d29-ae63-0b867130c38f", content:"Available now", },
];

const ImageSlider = () => 
{
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef= useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => 
    {
      nextSlide();
    }, 13450);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const loadGamePage=()=>{
    const game = media[currentIndex];
    console.log("Current Index:", currentIndex);
    if (game.type === "video" && currentIndex === 0)
       {
      window.location.href = `/gamepage/34`;
    } 
    else if (game.type === "video" && currentIndex === 1)
       {
      window.location.href = `/gamepage/1`;
    } 
    else if (game.type === "video" && currentIndex === 2)
       {
      window.location.href = `/gamepage/4`;
    } 
  }

  const nextSlide = () =>
  {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };
  const handleLoadedVideo = () => {
  if (videoRef.current && videoRef.current.duration)
  {
    videoRef.current.currentTime = videoRef.current.duration / 2.8;
  }
}

  return (
    <div className="imageslider">
      <div className="carousel">

        <div className="carousel-container">

          <div className="mute-toggle" onClick={() => setIsMuted(!isMuted)}>

          <img
             src={isMuted ? muted : unmuted}
    style={{ width: "30px", height: "30px", cursor: "pointer" }}

           />
          </div>
          
          <div className="carousel-content">
            <img src={ media[currentIndex].title } />
            <p >{media[currentIndex].content}</p>
            <button onClick={loadGamePage} >Learn More</button>
          </div>

          {media[currentIndex].type === "image" ? (
            <img
              src={media[currentIndex].src}
              alt={`Slide ${currentIndex + 1}`}
              className="carousel-image"
            />
          ) : (
            <video
              ref={videoRef}
              src={media[currentIndex].src}
              className="carousel-image"
              autoPlay
              muted={isMuted}
              loop
               onLoadedMetadata={handleLoadedVideo}
            />
          )}

        </div>
        <button className="prev" onClick={prevSlide}>
         <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="next" onClick={nextSlide}>
         <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;