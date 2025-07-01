import React,{useEffect,useState} from 'react'
import Slider from "react-slick";
 import '../CSS/GameCard.css'
 import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from 'react'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import GameCard from '../components/GameCard'

function Crouch() {
  return (
    <div>
        <Slider {...settings}> 
              {
                games.map((game,index)=><GameCard key={index} game={game} />)
              }  
        </Slider> 
    </div>
  )
}

export default Crouch