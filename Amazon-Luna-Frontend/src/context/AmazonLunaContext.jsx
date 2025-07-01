import React,{createContext, use, useEffect, useState} from "react";
export const AmazonLunaContext=React.createContext(null);

const getDefaultPlayList=()=>{
    let playList={};
    for(let i=0;i<100;i++)
    {
        playList[i]=0;
    }
    return playList;
}

const AmazonLunaContextProvider=(props)=> 
    {
        const [userData, setUserDetails] = useState([]);
        const [playList, setPlayList] = useState(getDefaultPlayList());
        const [games, setGames] = useState([]);

        const fetchUserData= async()=>
            {
        if(localStorage.getItem("auth-token"))
        {  
            fetch("http://localhost:8001/getuserdata",
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("auth-token")}`,
                    },
                    body:"",
                }).then((response)=>response.json()).then((data)=>setUserDetails(data));
          
        }
        }
  
  useEffect(()=>
    {

    fetch("http://localhost:8001/getAllGames",
        {
            method:"GET",
            headers:
            {
                "Content-Type":"application/json",
            },
        })
        .then((response)=>response.json())
        .then((data)=> {setGames(data.games);})

   
            fetchUserData();
    },[])


        
        
    const contextValue={userData,playList,games,fetchUserData};

  return(
    <AmazonLunaContext.Provider value={contextValue}>
        {props.children}
    </AmazonLunaContext.Provider>
  )
}

export default AmazonLunaContextProvider