import React, { useState, useRef, useEffect, useContext } from 'react';
import '../CSS/CardSlider.css' 



function TrailersScreenShots({imageGallery})
{
  
        const [showLeftArrow,setShowLeftArrow]=useState(true);
        const [showRightArrow,setShowRightArrow]=useState(true);
        const [fullscreenIndex,setFullscreenIndex]=useState(null);

        const cards=useRef(null);
 
        const [noOfCardsToScroll,setNoOfCardsToScroll]=useState(5);
        const cardwidth=220+20;// this 20 is the gap between cards in card-section-slider-container-cards
    
     
       
        const scrollLeft=()=>
        {
            cards.current.scrollBy({ left:-cardwidth*noOfCardsToScroll-20  ,behavior:'smooth'});
        }
        const scrollRight=()=>
        {
            cards.current.scrollBy({left:cardwidth*noOfCardsToScroll ,behavior:'smooth'});
        }
          
          const handleScroll=()=>
            {
                const{scrollLeft,scrollWidth,clientWidth}=cards.current;
                setShowLeftArrow(scrollLeft>0);
                setShowRightArrow(scrollLeft+clientWidth<scrollWidth-5);
            }
            // This function checks if the cards container is scrollable after the images are loaded in dom
        const checkScrollability = () => 
        {
        if (cards.current) 
        {
            const { scrollWidth, clientWidth } = cards.current;        
            setShowRightArrow(scrollWidth > clientWidth);
            setShowLeftArrow(false); 
        }
        }

          const fullScreenLeft=(e)=>
          {
              e.stopPropagation();
              setFullscreenIndex((i)=>(i>0? i-1 : imageGallery.length-1));
          }

          const fullScreenRight=(e)=>
          {
              e.stopPropagation();
              setFullscreenIndex((i)=>(i==imageGallery.length-1? 0: i+1));
          }
            
            useEffect(()=>{
                handleScroll();
                 const handleResize = () => 
                      {
                        if(window.innerWidth <= 800)
                        {
                            setNoOfCardsToScroll(2);
                        }
                        else
                        {
                            setNoOfCardsToScroll(5);
                        }
                      };
                
                      
                window.addEventListener('resize', handleResize);

            },[imageGallery]);
        
  return (
    <div className='trailersscreenshots'> 
        <style>
        {`
          .fullscreen
          {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            }
            .fullscreen-image 
            {
              max-width: 100vw;
              max-height: 100vh;
              width: auto;
              height: auto;
              }
              .close-icon 
              {
                position: absolute;
                top: 30px;
                right: 40px;
                font-size: 24px; 
  color: #80e6d1; 
  cursor: pointer;
  z-index: 100000;
  border-radius: 50%;
  border: 2px solid #80e6d1;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-weight: bold;

}

.close-icon:hover
{
  background-color: rgba(128, 230, 209, 0.1); 
  transform: scale(1.1);
  }
  
  .fullscreen-arrow
  {
    position: absolute;
    top: 50%;
    cursor: pointer;
    border: none;
    background: none;
    z-index: 100001;
    }
    .fullscreen-arrow.left
    {
      left: 20px;
      }
      .fullscreen-arrow.right
      {
        right:20px;
        }
        .fullscreen-arrow span{
          font-size: 40px;
          }
          .trailersscreenshots{
           margin: 20px 20px
          }
               @media (max-width: 500px) {
            .card-section-heading {
              position: relative;
              right: 50px;
                
          }
          
        `}
      </style>
          <div className="card-section">
                 <h1 className='card-section-heading'>Trailers and ScreenShots</h1>
         <div>
      
                 <div className='card-section-slider-container'>
                   {
                     showLeftArrow && 
                     (
                       <button className="arrow-button left" onClick={scrollLeft} >
                         <span className="material-symbols-outlined">chevron_left</span>
                       </button>
                     )
                   }
         
                 <div className='card-section-slider-container-cards' ref={cards} onScroll={handleScroll}>
                 {imageGallery.map((image, index) => (
                                    <img  onClick={()=>setFullscreenIndex(index)} style={{height:"200px"}} key={index} src={image} alt="" onLoad={checkScrollability} />
                                 ))}
                 </div>
         
                 {
                   showRightArrow && 
                   (
                     <button className="arrow-button right" onClick={scrollRight}>
                       <span className="material-symbols-outlined">chevron_right</span>
                     </button>
                   )
                 }
                
                 </div>
         
                 </div>  
         
               </div>
            {fullscreenIndex !=null && (
              <div className="fullscreen">

                <span className='close-icon' onClick={e=>{e.stopPropagation(); setFullscreenIndex(null);}}> ×</span>

                  <button className="fullscreen-arrow left" onClick={fullScreenLeft}>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                    
                <img src={imageGallery[fullscreenIndex]} className='fullscreen-image' alt="Fullscreen" />

                  <button className="fullscreen-arrow right" onClick={fullScreenRight} >
                     <span  className="material-symbols-outlined">chevron_right</span>
                  </button>

              </div>
            )}
    </div>
  )
}

export default TrailersScreenShots