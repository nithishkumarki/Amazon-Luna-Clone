import { useState } from 'react'
import  {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Library from './pages/Library.jsx'
import PlayList from './pages/PlayList.jsx'
import Crouch from './pages/Crouch.jsx'
import Navbar  from './components/Navbar.jsx' 
import SignupSignin from './pages/SignupSignin.jsx'
import AmazonLunaContextProvider from './context/AmazonLunaContext.jsx'
import GamePage from './components/GamePage.jsx'
import Footer from './components/Footer.jsx'
function App() 
{
  return (
    <>
     <AmazonLunaContextProvider>

    
       <BrowserRouter>
         <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signupsignin' element={<SignupSignin/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/Library' element={<Library/>}/>
        <Route path='/PlayList' element={<PlayList/>}/>
        <Route path='/Crouch' element={<Crouch/>}/>
        <Route path='/gamepage/:gameid' element={<GamePage />} />

         {/* <Route path='/gamepage' element={<GamePage />} >
               <Route path=':gameid' element={<GamePage />} />
          </Route> */}
        {/* // : after : is a parameter that can be accessed in the component */}
       </Routes>
       <Footer/>
       </BrowserRouter>
        </AmazonLunaContextProvider>
    </>
  )
}

export default App
