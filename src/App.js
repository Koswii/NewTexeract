import React, { useState, useEffect } from 'react'
import './App.css';
import Cookies from "js-cookie";


import Nav from './Components/Nav'
import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';
import { XERAWalletDataProvider } from './Components/Pages/XERAWalletDataContext';
import { TelegramDataProvider } from './Components/Pages/TelegramDataContext';

import Home from './Components/Pages/Home'
import Leaderboards from './Components/Pages/Leaderboards';
import Tokens from './Components/Pages/Tokens';
import Whitepaper from './Components/Pages/Whitepaper';
import Ecosystem from './Components/Pages/Ecosystem';
import Tokenomics from './Components/Pages/Tokenomics';




import Profile from './Components/Pages/Profile';


import TestnetFaucet from './Components/Pages/TestnetFaucet';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  const [userLoggedData, setUserLogedData] = useState(null);
  const userStoredData = Cookies.get('authToken');
  const jwtDecode = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token specified');
    }
  };
  useEffect(() => {
    if (userStoredData) {
      const userDecodedData = jwtDecode(userStoredData);
      setUserLogedData(userDecodedData?.xeraJWT);
    }
  }, []);
  

  return (
    <XERAWalletDataProvider>
      <TelegramDataProvider>
        <Router>
        <div>
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Leaderboards" element={<Leaderboards/>}/>
            {(userLoggedData) &&
              <>
                <Route path={`/p/${userLoggedData.myXeraAddress}`} element={<Profile/>}/>
              </>
            }


            <Route path="/Tokens" element={<Tokens/>}/>
            <Route path="/Whitepaper" element={<Whitepaper/>}/>
            <Route path="/Ecosystem" element={<Ecosystem/>}/>
            <Route path="/Tokenomics" element={<Tokenomics/>}/>
            <Route path="/TestnetFaucet" element={<TestnetFaucet/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
          <Footer />
        </div>
        </Router>
      </TelegramDataProvider>
    </XERAWalletDataProvider>
  );
}


export default App;
