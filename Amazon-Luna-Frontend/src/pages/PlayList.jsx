import React,{useContext} from 'react'
import '../CSS/PlayList.css'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import GameCard from '../components/GameCard'
import '../CSS/Search.css'

const PlayList = () =>
{


  const {games,playList,userData}=React.useContext(AmazonLunaContext);
  console.log("games",games);
  console.log("playlist",playList);
  console.log("userData in palylist",userData);


  return (
    <div className='playlist'>
          
         <h1 >PLAYLIST</h1>
         <h3 >GAMES ADDED TO YOUR PLAYLIST</h3>

        <div className='search-page-productss'>
         {
            games.map((game,index)=>{
              if(userData.userData.playList[game.id]===1)
              {
                return <GameCard key={index} game={game} />
              }
            } )
         }
        </div>


    </div>

  )
}

export default PlayList