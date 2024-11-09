import React, { useState, useEffect } from 'react'
import "./CSS/nav.css";
import { 
    FaBars, 
    FaWindowClose,
    FaArrowCircleDown,
    FaComments,
    FaTh,
    FaTelegramPlane,
    FaTwitter,
    FaGithub,
    FaYoutube
} from 'react-icons/fa';
import { 
  TbArrowBadgeDown,
  TbWallet,
  TbUserCircle,
  TbSquareRoundedArrowDown,
  TbSquareRoundedArrowDownFilled,
  TbLogout  
} from "react-icons/tb";
import { 
  RiArrowDownSFill 
} from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import CreateWallet from './Pages/CreateWallet';
import LoginAccount from './Pages/LoginAccount';
import ConnectWallet from './Pages/ConnectWallet';
import { XERAWalletData } from './Pages/XERAWalletDataContext';



const TextSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return (
    <>{truncatedText}</>
  );
};

const Nav = () => {
  const navigate = useNavigate ();
  const {
    userLoggedData,
    viewWalletCreate, 
    setViewWalletCreate,
    viewLoginAccount, 
    setViewLoginAccount,
    viewConnectWallet, 
    setViewConnectWallet,
  } = XERAWalletData();
  const [viewFullNavigation, setViewFullNavigation] = useState(false);
  const XERALoginBasicAccountAPI = process.env.REACT_APP_XERA_USER_LOGOUT_API;

  const handleViewFullNav = () => {
    setViewFullNavigation(true);
    // const timeout = setTimeout(() => {
    //   setViewFullNavigation(false)
    // }, 10000); // 10 seconds
    // return () => {clearTimeout(timeout);};
  }
  const handleHideFullNav = () => {
    setViewFullNavigation(false)
  }
  const handleViewCreateWallet = () => {
    setViewWalletCreate(true)
  }
  const handleViewLoginWallet = () => {
    setViewLoginAccount(true)
  }
  const handleUserLogout = () => {
    if (!userLoggedData) return;
    fetch(XERALoginBasicAccountAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.removeItem('userData');
        localStorage.removeItem('telegramTask');
        localStorage.removeItem('twitterTask');
        localStorage.removeItem('walletTask');
        navigate('/')
        window.location.reload();
      } else {
        console.log(data.message)
      }
    })
    .catch(error => console.error('Error:', error));
  };
  const handleConnectWallet = () => {
    setViewConnectWallet(true);
  }



  useEffect(() => {
    if (!userLoggedData) return;
    const keysToWatch = [
      'userData',
      'telegramTask',
      'twitterTask',
      'walletTask',
    ];
    const handleStorageChange = (event) => {
      if (keysToWatch.includes(event.key)) {
        setTimeout(() => {
          keysToWatch.forEach((key) => localStorage.removeItem(key));
          handleUserLogout();
        }, 500);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])



  return (
    <nav>
      <div className="mainNavContainer">
        
        {viewWalletCreate && <CreateWallet />}
        {viewLoginAccount && <LoginAccount />}
        {viewConnectWallet && <ConnectWallet />}


        <div className="navContainer">
          <div className="navContent left">
              <Link to="/">
                <img src={require('./assets/imgs/TexeractLogoWhite.png')} alt="" />
                {/* <h4>TEXERACT</h4> */}
              </Link>
          </div>
          <div className="navContent right">
            {/* {!viewFullNavigation ? 
            <button className={viewFullNavigation ? 'navCrBtn dropDown active' : 'navCrBtn dropDown'} onClick={handleViewFullNav}><p>EXPLORE</p></button>:
            <button className={viewFullNavigation ? 'navCrBtn dropDown active' : 'navCrBtn dropDown'} onClick={handleHideFullNav}><p>EXPLORE</p></button>} */}

            <Link className='navCrBtn dapps disabled'><p>DAPPS</p></Link>
            <Link className='navCrBtn nodes disabled'><p>NODES</p></Link>
            <Link className='navCrBtn marketplace disabled'><p>MARKETPLACE</p></Link>
            <Link className='navCrBtn leaderboards' to='/Leaderboards'><p>LEADERBOARDS</p></Link>
            <button id='nvctntrMobile'><RiArrowDownSFill className='faIcons'/></button>
            {(userLoggedData === null) ? <>
              <button className='navCrBtn connect' onClick={handleViewCreateWallet}><p>CREATE WALLET</p><TbWallet className='faIcons'/></button>
              <button className='navCrBtn login' onClick={handleViewLoginWallet}><TbUserCircle className='faIcons'/></button>
            </>:<>
              <Link className='navCrBtn account' to={`/p/${userLoggedData.myXeraAddress}`}>
                <TbUserCircle className='faIcons'/>
                <p><TextSlicer text={`${userLoggedData.myXeraAddress}`} maxLength={10} /></p>
              </Link>
              <button className='navCrBtn logout' onClick={handleUserLogout}><TbLogout className='faIcons'/></button>
            </>}
          </div>
        </div>
      </div>
    </nav>
  ); 
}

export default Nav;