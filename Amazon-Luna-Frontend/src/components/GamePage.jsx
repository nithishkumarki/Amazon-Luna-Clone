import React,{useState,useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import singleplayer from  '../assets/logos/singleplayer.svg'
import multiplayer from  '../assets/logos/multiplayer.svg'
import  '../CSS/GamePage.css'
import m17 from '../assets/image/m17.webp'
import meveryone from '../assets/image/meveryone.webp'
import mteen from '../assets/image/mteen.webp'
import lunaballs from '../assets/logos/lunaballs.webp'
import shareicon from '../assets/logos/shareicon.webp'
import metrix from '../assets/image/metrix.webp'
import TrailersScreenShots from './TrailersScreenShots'
import CardSlider from './CardSlider.jsx'
// import { set } from 'mongoose'
// import { set } from 'mongoose'
// import { set } from 'mongoose'

function GamePage()
{
  const {games,userData,fetchUserData} = useContext(AmazonLunaContext);
  const [matureRating, setMatureRating] = useState("everyone");

  const {gameid} = useParams();
  const game=games.find((game)=>game.id===Number(gameid));

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth-token") ? true : false);
  const [playlistState,setPlaylistState]=useState("Add to Playlist");
  const [playButton,setPlayButton]=useState("Buy Now");
  const [subscribed,setsubscribed]=useState(false);
  const [showPurchaseAlert,setShowPurchaseAlert]=useState(false);
  
  const handlePlayButton=()=>
   {
     if(game.pack && (userData.userData.primesubscription==="notSubscribed"||
          userData.userData.ubisoftsubscription==="notSubscribed"||
          userData.userData.EAsubscription==="notSubscribed"||
          userData.userData.gogsubscription==="notSubscribed"
     ))
     {
          setShowPurchaseAlert(true);
     }
   }
   
    const purchase=async()=>
    {
           const response=await fetch("http://localhost:8001/purchaseSubscription",
             {
                  method:"POST",
                  headers:{
                     "Content-Type":"application/json",
                     "auth-token":`${localStorage.getItem("auth-token")}`
                  }
                  ,body:JSON.stringify
                  ({pack:game.pack})
             });
             fetchUserData();
    }
    useEffect(() => {
  window.scrollTo(0, 0);
}, [gameid]);

  useEffect(() => 
            {
        const handleisLoggedIn=()=>
        {
          if(localStorage.getItem("auth-token")?true:false)
          {
                setIsLoggedIn(true);
          }
          else
          {
               setIsLoggedIn(false);
          }
        }

        if(isLoggedIn && game && userData )
        {
          console.log("User is logged in");
           console.log("User data:", userData);
           console.log("playlist:",userData.userData.playList[game.id]);
           setPlaylistState(userData.userData.playList[game.id]===1 ? "Remove from Playlist" : "Add to Playlist");
          
           if(game.pack==="prime" && userData.userData.primesubscription==="notSubscribed")
            {
              setPlayButton("Included in "+game.pack+" pack");
            }
            else if (game.pack==="prime" && userData.userData.primesubscription==="subscribed")
            {
                setPlayButton("Play Now");
            }
            else if(game.pack==="ubisoft" && userData.userData.ubisoftsubscription==="notSubscribed")
            {
              setPlayButton("Included in "+game.pack+" pack");
            }
            else if(game.pack==="ubisoft" && userData.userData.ubisoftsubscription==="subscribed")
            {
              setPlayButton("Play Now");
            }
            else if(game.pack==="EA" && userData.userData.EAsubscription==="notSubscribed")
            {
              setPlayButton("Included in "+game.pack+" pack");
            }
            else if(game.pack==="EA" && userData.userData.EAsubscription==="subscribed")
            {
              setPlayButton("Play Now");
            }
            else if(game.pack==="gog" && userData.userData.gogsubscription==="notSubscribed")
            {
              setPlayButton("Included in "+game.pack+" pack");
            }
            else if(game.pack==="gog" && userData.userData.gogsubscription==="subscribed")
            {
              setPlayButton("Play Now");
            }

        }
    },[gameid, isLoggedIn,userData, game]);

    if (!game) 
         {
         return (
           <div className='gamepage gamepage-loading'>
             <h1>Loading...</h1>
           </div>
               );
         }

    

    const agerating = (game.ageRating||"everyone").toLowerCase();
    const ratingImage=agerating.includes("17")?m17:agerating==="teen"?mteen:meveryone;
    
    
    if (!game.backgroundImage || !game.titleImage) {
      return (
        <div className='gamepage gamepage-error'>
            <h1>Error: Game images not found</h1>
        </div>
        );
      }
      
      const playlistHandle=async()=>
      {
        if(!isLoggedIn)
          {
            alert("Please login to add games to your playlist");
          }
          else
          {
            if(playlistState==="Add to Playlist")
              {
                
                const playListResponse=await fetch("http://localhost:8001/addToPlayList",
                  {
                    method:"POST",
                    headers:
                    {
                      "Content-Type":"application/json",
                      "auth-token":`${localStorage.getItem("auth-token")}`,
                    },
                    body:JSON.stringify({
                      gameid:game.id,
                    }),
                  }
                )

                const data=await playListResponse.json();

                if(data.success)
                {
                   console.log("added successfully",data.playList);
                   setPlaylistState("Remove from Playlist");
                   if(fetchUserData)
                    {
                      
                      await fetchUserData();
                    }
                    console.log(userData.playList);

                }
                else{
                  alert("Error adding to playlist. Please try again.");
                }
              }
              else
              {
                const playListResponse= await fetch("http://localhost:8001/removeFromPlayList",
                  {
                    method:"POST",
                    headers:
                    {
                      "Content-Type":"application/json",
                      "auth-token":`${localStorage.getItem("auth-token")}`,
                    },
                    body:JSON.stringify({
                      gameid:game.id,
                    }),
                  }
                )
                const data=await playListResponse.json();
                if(data.success)
                {
                  if(fetchUserData)
                  {
                    await fetchUserData();
                  }
                  setPlaylistState("Add to Playlist");
                  console.log("removed successfully",data.playList);
                }
                else{
                  alert("Error removing from playlist. Please try again.");
                }

              }
            }
          }
         
          
      


  return (
    <div className='gamepage' >
      {
          showPurchaseAlert && 
          <div className="purchase-alert">
            <div className="purchase-alert-content">
              <h2>Purchase Required</h2>
              <p>This game is included in the {game.pack} pack. Do you want to subscribe for a month with a cost of Rs800</p>
              <div className="purchase-alert-buttons">

              <button onClick={() => {setShowPurchaseAlert(false),purchase()}}>yes</button>

              <button onClick={() => setShowPurchaseAlert(false)}>No</button>
              </div>
            </div>
          </div>
      }
        
        <div className="gamepage-background" style={{ backgroundImage: `url(${game.backgroundImage})` }} />
        <div className="gamepage-gamedetails-1">

            <div className="gamepage-image">
            <img src={game.titleImage} alt="" />
            </div>

            <div className="gamepage-gamedetails-1-div1">
                <div>Metascore: {game.metacritic} | </div>
                <div>{game.publisher}</div>
            </div>
            <div className="gamepage-gamedetails-1-div1-leftright">
            <div className="gamepage-gamedetails-1-div1">

                             <div className='gamepage-gamedetails-1-div1-theme'>
                               {game.theme.map((theme, index) => (
                                 <span key={index} className='gamepage-gamedetails-1-div1-theme-item'>
                                   {theme}
                                 </span>
                               ))}
                             </div>
               
                             <div className="gamepage-gamedetails-1-div1-playwith">
                               {
                                   (()=>{
                                     
                                       const playWithArray=game.gameplay.split(",").map(i=>i.trim().toLowerCase());
                                       if(playWithArray.length===1 && playWithArray[0]==="online pvp")
                                       {
                                           return <span className='gamepage-gamedetails-1-div1-playwith-item'><img  src={multiplayer} alt="" />Online PvP</span>
                                       }
                                       else{
                                           return <span className='gamepage-gamedetails-1-div1-playwith-item'><img className='icon' src= {singleplayer} alt="" />Single Player</span>
                                       }
               
                                   })()
                                   // This returns a function, not a JSX element — and React can't render functions so use () to call the function
                               }       
                             </div>
               
                           </div>
             <div className="mature">
                <img  src={ratingImage} alt="" />
                {game.theme.map((theme, index) => (
                    <span key={index} className='gamepage-gamedetails-1-div1-mature-item'>
                        {theme} 
                    </span>
                ))}    
                
             </div>

            </div>

            <div className="gamepage-gamedetails-1-playremovebutton">
                    <button onClick={handlePlayButton} className='playnow'> <img style={{height:"24px",width:"24px"}} src={lunaballs} alt="" /> <div>{playButton}</div></button>
                    <button onClick={playlistHandle} className='rfpl'>{playlistState}</button>
            </div>

            <div className='gamepage-gamedetails-1-share'> 
                 <img style={{height:"17px",width:"17px"}} src={shareicon} alt="" />
                 <div>Share</div>
            </div>

        </div>

       
           <TrailersScreenShots imageGallery={game.imageGallery} />
        

        <div className="gamepage-gamedetails-2">
                 <div className='discriptionbox'>
                              <h2>DESCRIPTION</h2>
                              <p>{game.description}</p>
                 </div>
                 <div className='discriptioncard'>
                              
                            
                                <div className="discriptioncardkeyvalue">
                                        <div className="discriptioncarditem">
                                          <img style={{height:"35px"}} src={metrix} alt="" />
                                        </div>
                                        <div className="discriptioncarditem-metacritic">
                                            {  game.
metacritic}
                                        </div>
                              

                                </div>

                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Game Title</div>
                                <div className="discriptioncarditem">{game.title}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Release Date</div>
                                <div className="discriptioncarditem">{game.releaseDate}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Publisher</div>
                                <div className="discriptioncarditem">{game.publisher}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Developer</div>
                                <div className="discriptioncarditem">{game.developer}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Gamplay</div>
                                <div className="discriptioncarditem">{game.gameplay}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Video</div>
                                <div className="discriptioncarditem">{game.videoQuality}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Inputs</div>
                                <div className="discriptioncarditem">{game.inputs}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem">Languages</div>
                                <div className="discriptioncarditem">{game.languages.map((item,index)=>( <span key={index} style={{width:"100%"}}> {item}{index<game.languages.length-1 ? ',':''}</span> )  )}</div>
                              </div>
                              <hr className='discriptioncard-hr' />
                              <div className="discriptioncardkeyvalue">
                                <div className="discriptioncarditem"><img src={ratingImage} alt="" /></div>
                                <div className="discriptioncarditem">{game.theme}</div>
                              </div>
                              
                              
                 </div>
        </div> 
        <div  className='relatedgames'>
         <CardSlider heading="YOU MIGHT ALSO LIKE" filterkey="pack" filtervalue={game.pack}  />
        </div>  
    </div>
  )
}

export default GamePage