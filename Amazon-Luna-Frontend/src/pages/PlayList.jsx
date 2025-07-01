import React,{useContext,useEffect} from 'react'
import '../CSS/PlayList.css'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import GameCard from '../components/GameCard'
import '../CSS/Search.css'

const PlayList = () =>
{


  const {games,playList,userData}=React.useContext(AmazonLunaContext);
  const [isLoggedin,setIsLoggedIn]=React.useState(localStorage.getItem('auth-token')?true:false);
  console.log("games",games);
  console.log("playlist",playList);
  console.log("userData in palylist",userData);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('auth-token')?true:false);
  }, [userData.userData]);

  


  return (
    <div className='playlist'>
          
         <h1 >PLAYLIST</h1>
         <h3 >GAMES ADDED TO YOUR PLAYLIST</h3>
         {!isLoggedin?
                <div className="search-page-productss">
                         
                </div>
         :
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
}


    </div>

  )
}

export default PlayList