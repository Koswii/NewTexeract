import React, { useState, useEffect } from 'react'
import "./CSS/nav.css";
import Cookies from "js-cookie";
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
  RiArrowDownSFill,
  RiArrowUpSFill 
} from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
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
  const [viewMobileNavigation, setViewMobileNavigation] = useState(false);

  const handleViewCreateWallet = () => {
    setViewWalletCreate(true)
  }
  const handleViewLoginWallet = () => {
    setViewLoginAccount(true)
  }
  const handleUserLogout = () => {
    if (!userLoggedData) return;
    localStorage.removeItem('userData');
    localStorage.removeItem('telegramTask');
    localStorage.removeItem('twitterTask');
    localStorage.removeItem('walletTask');
    Cookies.remove('authToken')
    navigate('/')
    window.location.reload();
  };
  const handleConnectWallet = () => {
    setViewConnectWallet(true);
  }

  const handleViewMobileNavigation = () => {
    setViewMobileNavigation(true);

    const timeout = setTimeout(() => {
      setViewMobileNavigation(false)
    }, 60000);
    return () => {clearTimeout(timeout);};
  }
  const handleHideMobileNavigation = () => {
    setViewMobileNavigation(false);
  }


  // console.log(userLoggedData);
  


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
            <div className={viewMobileNavigation ? "navContentrMobile active" : "navContentrMobile disabled"}>
              <Link to='/Leaderboards' onClick={handleHideMobileNavigation}><p>LEADERBOARDS</p></Link>
              <Link to='/TestnetFaucet' onClick={handleHideMobileNavigation}><p>TESTNET FAUCET</p></Link>
              <Link to='/Tokens' onClick={handleHideMobileNavigation}><p>TOKENS</p></Link>
              <Link to='/Whitepaper' onClick={handleHideMobileNavigation}><p>WHITEPAPER</p></Link>
              <Link to='/Tokenomics' onClick={handleHideMobileNavigation}><p>TOKENOMICS</p></Link>
              <Link to='/Ecosystem' onClick={handleHideMobileNavigation}><p>ECOSYSTEM</p></Link>
            </div>



            <Link className='navCrBtn dapps disabled'><p>DAPPS</p></Link>
            <Link className='navCrBtn nodes disabled'><p>NODES</p></Link>
            <Link className='navCrBtn marketplace disabled'><p>MARKETPLACE</p></Link>
            <Link className='navCrBtn social' to='/Whitepaper'><p>WHITEPAPER</p></Link>
            <Link className='navCrBtn leaderboards' to='/Leaderboards'><p>LEADERBOARDS</p></Link>
            {!viewMobileNavigation ? 
              <button id='nvctntrMobile' onClick={handleViewMobileNavigation}><RiArrowDownSFill className='faIcons'/></button>:
              <button id='nvctntrMobile' onClick={handleHideMobileNavigation}><RiArrowUpSFill className='faIcons'/></button>
            }
            {(userLoggedData === null) ? <>
              <button className='navCrBtn connect' onClick={handleViewCreateWallet}><p>CREATE WALLET</p><TbWallet className='faIcons'/></button>
              <button className='navCrBtn login' onClick={handleViewLoginWallet}><TbUserCircle className='faIcons'/></button>
            </>:<>
              <Link className='navCrBtn account' to={`/p/${userLoggedData.myXeraAddress}`}>
                <TbUserCircle className='faIcons'/>
                <p><TextSlicer text={`${userLoggedData.myXeraAddress}`} maxLength={10} /></p>
              </Link>
              <button className='navCrBtn logout' onClick={handleUserLogout}><FaPowerOff className='faIcons'/></button>
            </>}
          </div>
        </div>
      </div>
    </nav>
  ); 
}

export default Nav;