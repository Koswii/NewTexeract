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
import { Link, useNavigate } from 'react-router-dom';
import CreateWallet from './Pages/CreateWallet';
import LoginAccount from './Pages/LoginAccount';
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
    LoginWallet,
    LoginState,
    LoginType,
    viewWalletCreate, 
    setViewWalletCreate,
    viewLoginAccount, 
    setViewLoginAccount
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
    if (!LoginState) return;
    fetch(XERALoginBasicAccountAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.removeItem('myXeraAddress');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginState');
        navigate('/')
        window.location.reload();
      } else {
        console.log(data.message)
      }
    })
    .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (!LoginState) return;
    const keysToWatch = [
      'myXeraAddress',
      'isLoggedIn',
      'loginState',
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
        
        {viewFullNavigation && <div className={viewFullNavigation ? "navContainerFull active" :  "navContainerFull"}>
          <div className="navcContentf left">
            <div className='navccflImage'>
              <img src={require('../Components/assets/imgs/TestnetPhases/XERAPhase1.png')} alt="" />
            </div>
            <div className="navccflPhase">
              <div>
                <h5>PHASE 1</h5>
                <p>Texeract Network Testnet</p>
              </div>
              <div>
                <img src={require('../Components/assets/imgs/TexeractLogoWhite.png')} alt="" />
              </div>
            </div>
          </div>
          <div className="navcContentf right">
            {/* <div className="navccfrSoon">
              <p>XERAScan will be live Soon!</p>
            </div> */}
            <div className="navccfrSelections">
              <Link><h6>Metaverse</h6></Link>
            </div>
          </div>
        </div>}
        {viewWalletCreate && <CreateWallet />}
        {viewLoginAccount && <LoginAccount />}



        <div className="navContainer website">
          <div className="navContent left">
              <Link to="/">
                <img src={require('./assets/imgs/TexeractLogoWhite.png')} alt="" />
                {/* <h4>TEXERACT NETWORK</h4> */}
              </Link>
          </div>
          <div className="navContent right">
            {/* {!viewFullNavigation ? 
            <button className={viewFullNavigation ? 'navCrBtn dropDown active' : 'navCrBtn dropDown'} onClick={handleViewFullNav}><p>EXPLORE</p></button>:
            <button className={viewFullNavigation ? 'navCrBtn dropDown active' : 'navCrBtn dropDown'} onClick={handleHideFullNav}><p>EXPLORE</p></button>} */}
            {(!LoginState && LoginWallet === null) ? <>
              <button className='navCrBtn connect' onClick={handleViewCreateWallet}><p>CREATE WALLET</p><TbWallet className='faIcons'/></button>
              <button className='navCrBtn login' onClick={handleViewLoginWallet}><TbUserCircle className='faIcons'/></button>
            </>:<>
              <Link className='navCrBtn account' to={`/p/${LoginWallet}`}>
                <TbUserCircle className='faIcons'/>
                <p><TextSlicer text={`${LoginWallet}`} maxLength={10} /></p>
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