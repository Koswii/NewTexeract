import React from 'react';
import './App.css';


import Nav from './Components/Nav'
// import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';
import { XERAWalletDataProvider } from './Components/Pages/XERAWalletDataContext';

import Home from './Components/Pages/Home'



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const LoginWallet = localStorage.getItem('myXeraAddress');
  const LoginState = localStorage.getItem('isLoggedIn');
  const LoginType = localStorage.getItem('loginState');


  return (
    <XERAWalletDataProvider>
      <Router>
      <div>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>


        </Routes>
        {/* <Footer /> */}
      </div>
      </Router>
    </XERAWalletDataProvider>
  );
}


export default App;
