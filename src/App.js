import React, { useState, useEffect } from 'react'
import './App.css';


import Nav from './Components/Nav'
import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';
import { XERAWalletDataProvider } from './Components/Pages/XERAWalletDataContext';
import { TelegramDataProvider } from './Components/Pages/TelegramDataContext';

import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile';



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const userLoggedStorageData = localStorage.getItem('userData');
  const userLoggedData = JSON.parse(userLoggedStorageData)
  

  return (
    <XERAWalletDataProvider>
      <TelegramDataProvider>
        <Router>
        <div>
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path="/" element={<Home/>}/>
            {(userLoggedData) &&
              <>
                <Route path={`/p/${userLoggedData.myXeraAddress}`} element={<Profile/>}/>
              </>
            }


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
