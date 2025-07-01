import React from 'react'
import '../CSS/Banner1.css'
import GameCard from '../components/GameCard';

function Banner1({heading,bg, image, games }) 
{
  return (
    <div className='banner1'>

       <img src={bg}/> 
         <div className='banner1-title'>
              <img src={image} alt="Banner Title" />
              <p>{heading}</p>
              <div>
              <GameCard game={games[0]} />
              </div>
        </div>
    
    </div>
  )
}

export default Banner1