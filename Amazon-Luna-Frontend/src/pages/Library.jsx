import React, { useState,useEffect } from 'react'
import '../CSS/Library.css'
import { AmazonLunaContext } from '../context/AmazonLunaContext'
import GameCard from '../components/GameCard'
function Library() {

  const { games,userData } = React.useContext(AmazonLunaContext);
  const [library, setLibrary] = useState([]);
  const [filteredLibrary, setFilteredLibrary] = useState([]);
  const packs=new Set();

    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedGameType, setSelectedGameType] = useState('');
    const [selectedSortBy, setSelectedSortBy] = useState('');
    const [selectedSource, setSelectedSource] = useState('');

    const [genreOpen, setGenreOpen] = useState(false);
    const [gameTypeOpen, setGameTypeOpen] = useState(false);
    const [sortByOpen, setSortByOpen] = useState(false);
    const [sourceOpen, setSourceOpen] = useState(false);

    const genreOptions = ['Action', 'Adventure', 'Arcade', 'Fighting', 'Horror', 'Puzzle', 'RPG', 'Racing', 'Simulation', 'Sports', 'Strategy'];
    const gameTypeOptions = ['Single Player', 'Local Co-op', 'Local PvP', 'Online Co-op', 'Online PvP', 'Luna Couch'];
    const sortByOptions = ['Title A-Z', 'Title Z-A', 'Release date', 'Recently added', 'Metacritic Rating'];
    const sourceOptions = ['Luna+', 'Jackbox Games', 'Prime Gaming', 'EA Games', 'Epic Games', 'GOG Games', 'Ubisoft Games'];

     const resetFilters = () => {
        setSelectedGenre('');
        setSelectedGameType('');
        setSelectedSortBy('');
        setSelectedSource('');
        setFilteredLibrary(library);
    };

    const closeAllDropdowns = () => {
        setGenreOpen(false);
        setGameTypeOpen(false);
        setSortByOpen(false);
        setSourceOpen(false);
    };

    const handleDropdownClick = (dropdownType) => {

        closeAllDropdowns();

        switch (dropdownType) {
            case 'genre':
                setGenreOpen(true);
                break;
            case 'gameType':
                setGameTypeOpen(true);
                break;
            case 'sortBy':
                setSortByOpen(true);
                break;
            case 'source':
                setSourceOpen(true);
                break;
        }
    };

    const FilterDropdown=({title,options,selected,onSelect,isOpen,onToggle})=>{
      return(

    
      <div className="filter-dropdown">
        <div className={`filter-dropdown-header ${isOpen?'active':''}`} onClick={onToggle} >

         <span>{selected||title}</span>
         <span className={`dropdown-arrow ${isOpen ? 'open':'' }`}>▼</span>
        </div>
        {isOpen && 
        <div className="filter-dropdown-content">
          {options.map((option,index)=>(
            <div key={index} className={`filter-dropdown-item ${selected === option ? 'selected' : ''}`}  onClick={() => {onSelect(option);closeAllDropdowns(); }} >
              {option}
            </div>
          ))}
        </div>
        }

      </div>
        );
    }


 
  useEffect(() => {
    window.scrollTo(0, 0);
    if(userData && userData.userData)
    {
    if (userData.userData.primesubscription === "subscribed") packs.add("prime");
    if (userData.userData.ubisoftsubscription === "subscribed") packs.add("ubisoft");
    if (userData.userData.EAsubscription === "subscribed") packs.add("EA");
    if (userData.userData.gogsubscription === "subscribed") packs.add("gog");
      console.log("packs",packs);
      
    // Filter games based on the user's subscriptions
       const filteredGames = games.filter(game => packs.has(game.pack));
      setLibrary(filteredGames); 
      setFilteredLibrary(filteredGames);
    }

  },[userData,games]);

  useEffect(()=>{
    let filtered=[...library];
     if (selectedGenre) {
            filtered = filtered.filter(game => 
                game.theme && game.theme.some(theme => 
                    theme.toLowerCase().includes(selectedGenre.toLowerCase())
                )
            );
        }
         if (selectedGameType) {
            filtered = filtered.filter(game => {
                if (!game.gameplay) return false;
                
                const gameplayLower = game.gameplay.toLowerCase();
                const selectedLower = selectedGameType.toLowerCase();
                
                switch (selectedLower) {
                    case 'single player':
                        return gameplayLower.includes('single') || 
                               (!gameplayLower.includes('co-op') && !gameplayLower.includes('pvp') && !gameplayLower.includes('multiplayer'));
                    case 'local co-op':
                        return gameplayLower.includes('local co-op') || gameplayLower.includes('couch co-op');
                    case 'local pvp':
                        return gameplayLower.includes('local pvp') || gameplayLower.includes('local multiplayer');
                    case 'online co-op':
                        return gameplayLower.includes('online co-op');
                    case 'online pvp':
                        return gameplayLower.includes('online pvp') || gameplayLower.includes('online multiplayer');
                    case 'luna couch':
                        return gameplayLower.includes('luna couch') || gameplayLower.includes('couch');
                    default:
                        return true;
                }
            });
        }

        if (selectedSource) {
            filtered = filtered.filter(game => {
                const sourceLower = selectedSource.toLowerCase();
                const packLower = game.pack ? game.pack.toLowerCase() : '';
                
                switch (sourceLower) {
                    case 'prime gaming':
                        return packLower === 'prime';
                    case 'ea games':
                        return packLower === 'ea';
                    case 'gog games':
                        return packLower === 'gog';
                    case 'ubisoft games':
                        return packLower === 'ubisoft';
                    default:
                        return true;
                }
            });
        }
         if (selectedSortBy) 
        {
            switch (selectedSortBy.toLowerCase()) 
            {
                case 'title a-z':
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title z-a':
                    filtered.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'release date':
                    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                    break;
                case 'recently added':
                    filtered.sort((a, b) => b.id - a.id); 
                    break;
                case 'metacritic rating':
                    filtered.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
                    break;
                default:
                    break;
            }
        }
         setFilteredLibrary(filtered);
  },[library, selectedGenre, selectedGameType, selectedSortBy, selectedSource])

  return (
    <div className='library-page' onClick={(e) => {if (!e.target.closest('.filter-dropdown')) { closeAllDropdowns(); }  }} >
      <h1 >Liberary</h1>
      <div className='filter-container'>
              <FilterDropdown
                    title="Genre"
                    options={genreOptions}
                    selected={selectedGenre}
                    onSelect={setSelectedGenre}
                    isOpen={genreOpen}
                    onToggle={() => handleDropdownClick('genre')}
                />
                
                <FilterDropdown
                    title="Game Type"
                    options={gameTypeOptions}
                    selected={selectedGameType}
                    onSelect={setSelectedGameType}
                    isOpen={gameTypeOpen}
                    onToggle={() => handleDropdownClick('gameType')}
                />
                
                <FilterDropdown
                    title="Sort By"
                    options={sortByOptions}
                    selected={selectedSortBy}
                    onSelect={setSelectedSortBy}
                    isOpen={sortByOpen}
                    onToggle={() => handleDropdownClick('sortBy')}
                />
                
                <FilterDropdown
                    title="Source"
                    options={sourceOptions}
                    selected={selectedSource}
                    onSelect={setSelectedSource}
                    isOpen={sourceOpen}
                    onToggle={() => handleDropdownClick('source')}
                />
                
                <button className="reset-filters-btn" onClick={resetFilters}>
                    Reset
                </button>
      </div>
       <div className='search-page-productss'>
         {filteredLibrary.length > 0 ? (
                    filteredLibrary.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))
                ) : (
                    <div className="no-games-message">
                        <p>No games found matching your filters.</p>
                        <button onClick={resetFilters}>Clear Filters</button>
                    </div>
                )}
        </div>
    </div>
  )
}

export default Library