import React,{useState,useContext} from 'react'
import {Link} from "react-router-dom"
import '../CSS/GameCard.css'


function GameCard({ game })
{
  
  return (
    <div  className='gamecard' >
      <Link to={`/gamepage/${game.id}`}> 
       <img src={game.imageCardLink} alt="dummy" className='imagecard'/>
      </Link> 
    <div className='gamecard-hover'>

       <div className='gamecard-hover-details'>
         <Link to={`/gamepage/${game.id}`}> 
       <h2 className='gamecard-title'>{game.title}</h2>
       <p>Play with:{game.pack}</p>
       <p>{game.developer}</p>
         <div className="gamecard-theme">
           {game.theme.map((themei)=>(<div>{themei}</div>))}
         </div>
      </Link> 
       </div>

    </div> 

    </div>
  )
}

export default GameCard
