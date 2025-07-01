import React,{useContext} from 'react'
import '../CSS/Search.css'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import CardSlider from '../components/CardSlider'
import GameCard from '../components/GameCard'

const Search = () =>
{
     //hi
  const [searchText,setSearchText]=React.useState('');
  const {games}=React.useContext(AmazonLunaContext);

  const handleSearchText=(e)=>{
    setSearchText(e.target.value);
  };

  return (
    <div className='search-page'>
          
         <h1 >SEARCH</h1>
        <div className='search-page-input'>
        <input onChange={handleSearchText} value={searchText}  type="text" placeholder='Search by game name'/>
        <hr/>
        </div>

        <div className='search-page-products'>
         {
         searchText==""? 
          <CardSlider heading="PRIME FREE TO PLAY" filterkey="pack" filtervalue="prime" ></CardSlider>
         :
         
         games.map((item,i)=>{
          if(item.title.substring(0,searchText.length).toLowerCase()===searchText)
          {
            return <GameCard game={item} />
          }
          else
          {
            return null;
          }
         })
         
         }
        </div>


    </div>

  )
}

export default Search