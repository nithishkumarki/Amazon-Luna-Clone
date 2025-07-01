import React,{useEffect,useState,useRef} from 'react'
import '../CSS/Home.css'
import { useContext } from 'react'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import CardSlider from '../components/CardSlider'
import ImageSlider from './ImageSlider'
import Banner1  from './Banner1'
function Home()
{
  

  const {games}=useContext(AmazonLunaContext);
  const EAGames=games.filter((game,index)=>(game.pack==="EA"));    
  console.log(games);
  console.log("EAGames",EAGames);
    if (!games || games.length === 0) {
    return <div className="loading">Loading games...</div>;
  }

  return (
    <div className='home'>
         <ImageSlider /> 
        <CardSlider heading="PRIME FREE TO PLAY" filterkey="pack" filtervalue="prime"  />
        <CardSlider heading="INCLUDED IN UBISOFT" filterkey="pack" filtervalue="ubisoft"  />
        <Banner1 heading="PLAY ON LUNA+ FOR $9.99/MONTH" bg="https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fbanner1bg.webp?alt=media&token=d451957f-8c66-41f6-acf8-7acb2eb11d73" image="https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fbanner1titleimage.webp?alt=media&token=c9d93448-5188-410a-b0ca-857349a158b2" games={EAGames} />
        <CardSlider heading="GOG GAMES" filterkey="pack" filtervalue="GOG"  />
        <CardSlider heading="FAMILY FRIENDLY GAMES" filterkey="ageRating" filtervalue="Everyone"  />
        <CardSlider heading="INCLUDED IN EA" filterkey="pack" filtervalue="EA"  />
        <Banner1 heading="PLAY ON LUNA+ for $9.99" bg="https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Fleogbg.webp?alt=media&token=d7ded7e7-bbe9-4a26-b805-ee98944515d8" image="https://firebasestorage.googleapis.com/v0/b/fullstackdatabase.firebasestorage.app/o/Images%2Flegotitle.webp?alt=media&token=028d6589-b326-44b2-ad27-00a6897edeec" games={games.filter((game)=>game.id===3)} />
        <CardSlider heading="STORY MODE" filterkey="gameplay" filtervalue="Single Player"  />
        <CardSlider heading="MATURE 17+" filterkey="ageRating" filtervalue="Mature 17+"  />
      
        
    </div>
  )
}

export default Home