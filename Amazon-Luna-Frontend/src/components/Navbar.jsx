import React,{useState,useEffect, useRef } from 'react'
import "../CSS/Navbar.css"
import {Link} from "react-router-dom"
import lunaLogo from "../assets/logos/lunaLogo.webp"
import joystickLogo from "../assets/logos/joystickLogo.svg"
import dropdownLogo from "../assets/logos/dropdownLogo.svg"
import profileLogo from "../assets/logos/profileLogo.webp"
import globe from "../assets/logos/globe.svg"
import sync from "../assets/logos/sync.svg"
import settings from "../assets/logos/settings.svg"
import help from "../assets/logos/help.svg"
import info from "../assets/logos/info.svg"
import list from "../assets/logos/list.svg"
import signout from "../assets/logos/signout.svg"
import { AmazonLunaContext } from '../context/AmazonLunaContext'
// import { Link } from 'react-router-dom'

function Navbar()
{
   const [menu,setmenu]=React.useState("none");
  const [isMobile, setIsMobile] = useState(window.innerWidth<=800);

  const [arrowRotated, setArrowRotated] = React.useState(false);

  const [listClicked,setListClicked]=React.useState(false);

  const {userData}=React.useContext(AmazonLunaContext);
  console.log(userData);

  const profileRef=useRef();

  const navbarLinksRef=useRef();
  const [isLoggedIn,setIsLoggedIn]=React.useState(localStorage.getItem('auth-token')?true:false);

   
   


  useEffect(() => {
      const checkLogin=()=> setIsLoggedIn(localStorage.getItem('auth-token')?true:false);
      
       // handle window resolution changes
      const handleResize = () => 
      {
        setIsMobile(window.innerWidth <= 800);
      };
      
      window.addEventListener('resize', handleResize);

      //handle onclicks outside the menu

      
      const handleClickOutside = (event) =>
{
            if(profileRef.current && !profileRef.current.contains(event.target) )
                  {
                        setArrowRotated(false);
                  }
            }

       document.addEventListener('mousedown',handleClickOutside);
       
       const handleClickOutsideNavbarLinks = (event) => 
            {
                  if(isMobile && navbarLinksRef.current && !navbarLinksRef.current.contains(event.target))
                        {
                              setListClicked(false);
                        }
            }
                  document.addEventListener('mousedown',handleClickOutsideNavbarLinks);
                  
                  
            },[isMobile])
            
            const handleClickOnNavbarLinks = (event) =>
            {
                 if(isMobile)
                 {
                       setListClicked(false);
                 }
            }

  const handleProfileClick=(e)=>
  {
    if(arrowRotated)
    {
        setArrowRotated(false);
    }
    else
    {
         setArrowRotated(true);
    }
  }

  const handleSignOut = () =>
  {
      if(!isLoggedIn)
      {
             window.location.replace(`/signupsignin`); 
            // window.location.replace("/signupsignin"); 
            return;
      }
  localStorage.removeItem('auth-token'); 
  window.location.replace("/");   
  };

  const diplayNavbarLinks = () =>
  { 
      setListClicked(!listClicked);
  }


  return   (
    <div className='navbar'>

        <div className="navbar-left">
            <img onClick={diplayNavbarLinks} className='listlogo' src={list} alt="" />
          <img src={lunaLogo} alt="" className='lunalogo' />
              <div className='cloud-gaming'>
                CLOUD GAMING
              </div>
              { ((isMobile && listClicked) || (!isMobile ))?
               
              <div ref={navbarLinksRef}  className='navbat-left-links'>
                 <div className='navbarlinks' onClick={()=>{setmenu(""),handleClickOnNavbarLinks() }}>          <Link className="navbarlinks-navbarlink" to="/">Home</Link> {menu==""?<hr />:<></>}</div>
                 <div className='navbarlinks' onClick={()=>{setmenu("library"),handleClickOnNavbarLinks() }}>   <Link className="navbarlinks-navbarlink" to="/library">Library</Link>{menu=="library"?<hr />:<></>}</div>
                 <div className='navbarlinks' onClick={()=>{setmenu("playlist"),handleClickOnNavbarLinks() }}>  <Link className="navbarlinks-navbarlink" to="/playlist">PlayList</Link>{menu=="playlist"?<hr />:<></>}</div>
                 <div className='navbarlinks' onClick={()=>{setmenu("search") ,handleClickOnNavbarLinks()  } }> <Link className="navbarlinks-navbarlink" to="/search">Search</Link>{menu=="search"?<hr />:<></>}</div>
               
                 
               </div>:<></>       
                }
        </div>

        <div className="navbar-right">

            { ((isMobile && listClicked)|| !isMobile )? 
            <div className="subscribe">
              <button>Subscribe to Luna+</button>
            </div>:<></>}
             <div className="Logo">
             <img src={joystickLogo} style={{width:"35px",height:"35px"}} alt="" className="" />
             </div>

             <div ref={profileRef} onClick={handleProfileClick}  className="profileLogo-dropdownLogo">

              <img src={profileLogo} style={{width: "40px", height: "40px"}}   />
              

              <img src={dropdownLogo} style={{ transition: "transform 0.3s",
                                               transform: arrowRotated? "rotate(180deg)":"rotate(0deg)"


               }} />

               {arrowRotated &&
               <div className="profile-dropdown">
                  <div className='profile-dropdown-col'>
                       <div className='profile-dropdown-col-item'>
                             <img src={profileLogo} alt="" />
                             {userData && userData.userData ? <div>{userData.userData.username}</div>: <div>Name</div>}
                            
                       </div>
                  </div>
                  <hr />
                  <div className='profile-dropdown-col'>
                       <div className='profile-dropdown-col-item'>
                             <img src={sync} alt="" />
                             <div>Linked Accounts</div>
                       </div>
                       <div className='profile-dropdown-col-item'>
                             <img src={globe} alt="" />
                             <div>Language</div>
                       </div>
                       <div className='profile-dropdown-col-item'>
                             <img src={settings} alt="" />
                             <div>Settings</div>
                       </div>
                  </div>
                  <hr />

                  <div className='profile-dropdown-col'>
                        <div className='profile-dropdown-col-item'>
                             <img src={help} alt="" />
                             <div>Help</div>
                       </div>
                       <div className='profile-dropdown-col-item'>
                             <img src={info} alt="" />
                             <div>About luna</div>
                       </div>
                       <div onClick={handleSignOut} className='profile-dropdown-col-item'>
                             <img src={signout} alt="" />
                             <div>{isLoggedIn? "Sign out" : "Sign in"}</div>
                       </div>
                  </div>
                 
               </div>
                }

             </div>
        </div>
    </div>
  )
}

export default Navbar
