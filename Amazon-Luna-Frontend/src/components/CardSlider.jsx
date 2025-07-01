import React, { useState, useRef, useEffect, useContext } from 'react';
import '../CSS/CardSlider.css' 
import GameCard from '../components/GameCard'
import { AmazonLunaContext } from '../context/AmazonLunaContext'

function CardSlider(props)
    {
    const {games}=useContext(AmazonLunaContext);
    const [showLeftArrow,setShowLeftArrow]=useState(true);
    const [showRightArrow,setShowRightArrow]=useState(true);
    const cards=useRef(null);
    const {heading,filterkey,filtervalue}=props;
    const [noOfCardsToScroll,setNoOfCardsToScroll]=useState(5);
    const cardwidth=220+20;// this 20 is the gap between cards in card-section-slider-container-cards

   
    const filteredGames = games.filter((game) => game[filterkey] === filtervalue);
    
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
        },[games])

        
        
    return (
        
      <div className="card-section">
        <h1 className='card-section-heading'>{heading}</h1>

         
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
        {filteredGames.map((game, index) => (
                            <GameCard 
                                key={index} 
                                game={game}                            
                            />
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

    
  )
}

export default CardSlider