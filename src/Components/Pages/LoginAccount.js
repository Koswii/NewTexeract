import React, { useState, useEffect } from 'react'
import "../CSS/loginAccount.css";
import { 
    FaTimes
} from 'react-icons/fa';
import { 
    TbDownload,
    TbEye,
    TbEyeOff,
    TbArrowNarrowLeft,
} from "react-icons/tb";
import { XERAWalletData } from '../Pages/XERAWalletDataContext';




const LoginAccount = () => {
    const {
        viewWalletCreate, 
        setViewWalletCreate,
        viewLoginAccount, 
        setViewLoginAccount
    } = XERAWalletData();

    
    const XERALoginBasicAccountAPI = process.env.REACT_APP_XERA_USER_LOGIN_BASIC_API;
    const [viewDefaultLogin, setViewDefaultLogin] = useState(true);
    const [viewXeraWalletLogin, setViewXeraWalletLogin] = useState(false);
    const [viewSeedLogin, setViewSeedLogin] = useState(true);
    const [viewPivateKeyLogin, setViewPrivateKeyLogin] = useState(false);

    const handleViewDefaultLogin = () => {
        setViewDefaultLogin(true);
        setViewXeraWalletLogin(false);
    }
    const handleViewPrivateLogin = () => {
        setViewDefaultLogin(false);
        setViewXeraWalletLogin(true);
    }
    const handleViewSPLogin = () => {
        setViewSeedLogin(true)
        setViewPrivateKeyLogin(false)
    }
    const handleViewPKLogin = () => {
        setViewSeedLogin(false)
        setViewPrivateKeyLogin(true)
    }


    const [insertUsername, setInsertUsername] = useState('')
    const [insertPassword, setInsertPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false);
    const [viewLoginResponse, setViewLoginResponse] = useState(false);
    const [viewLoginMessage, setViewLoginMessage] = useState('');

    const handleCloseLogin = () => {
        setViewLoginAccount(false);
    }
    const handleViewPassword = () => {
        setViewPassword(true);
    }
    const handleHidePassword = () => {
        setViewPassword(false);
    }
    const handleCreateWallet = () => {
        setViewWalletCreate(true);
        setViewLoginAccount(false);
    }

    const handleUserLoginBasic = (e) => {
        e.preventDefault();
      
        if (!insertUsername || !insertPassword) {
                setViewLoginResponse(true);
                setViewLoginMessage('Please fill in all fields.');
            return;
        }
      
        fetch(XERALoginBasicAccountAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: insertUsername,
            password: insertPassword,
          }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            console.log(data);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginState', 'basic');
            localStorage.setItem('myXeraAddress', data.xera_wallet);
            setViewLoginResponse(false);
            setViewLoginMessage('');
            window.location.reload();
          } else {
            setViewLoginResponse(true);
            setViewLoginMessage(data.message);
          }
        })
        .catch(error => console.error('Error:', error));
    };




    return (
        <>
            <div className='navContainerLogin'>
                <div className="navLoginContent">
                    <button id='closeLoginAccount' onClick={handleCloseLogin}><FaTimes className='faIcons'/></button>
                    <div className="nclcHeader">
                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                        <span>
                            <h6>LOGIN XERA ACCOUNT</h6>
                            <p>TEXERACT NETWORK</p>
                        </span>
                    </div>
                    {viewDefaultLogin && <div className="nclcContents">
                        <div className="nclccBasics">
                            <div>
                                <span>
                                    <label htmlFor=""><p>Username</p></label>
                                </span>
                                <input type="text" placeholder='Ex. Loki' onChange={(e) => setInsertUsername(e.target.value)}/>
                            </div>
                            <div>
                                <span>
                                    <label htmlFor=""><p>Password</p></label>
                                    {!viewPassword ?
                                        <button className='xeraPassword' onClick={handleViewPassword}><TbEye className='faIcons'/></button>:
                                        <button className='xeraPassword' onClick={handleHidePassword}><TbEyeOff className='faIcons'/></button>
                                    }
                                </span>
                                <input type={!viewPassword ? "password" : "text"} placeholder='********' onChange={(e) => setInsertPassword(e.target.value)}/>
                            </div>
                            <div>
                                <p id='nclccnNote'>This account will only allow you to check and view your current balance and transactions.</p>
                            </div>
                        </div>
                        <div className="nclccLoginBtn">
                            <button className={(insertUsername && insertPassword) ? 'active' : ''} onClick={handleUserLoginBasic}>LOGIN</button>
                        </div>
                        <div className="nclccSlice">
                            <hr />
                            <p>OR</p>
                            <hr />
                        </div>
                        <div className="nclccXeraWallet">
                            <button onClick={handleViewPrivateLogin}>LOGIN XERA WALLET</button>
                            <button id='nclccConnectWallet'>CONNECT WALLET</button>
                        </div>
                        {viewLoginResponse && <div className="nclccXeraError">
                            <p>{viewLoginMessage}</p>
                        </div>}
                        <div className="nclccCreateWallet">
                            <p onClick={handleCreateWallet}>I don't have XERA Wallet yet.</p>
                        </div>
                    </div>}
                    {viewXeraWalletLogin && <div className="nclcContents">
                        <div className="nclccBack">
                            <button onClick={handleViewDefaultLogin}><TbArrowNarrowLeft className='faIcons'/></button>
                        </div>
                        <div className="nclccNav">
                            <button className={viewSeedLogin ? 'active' : ''} onClick={handleViewSPLogin}>SEED PHRASE</button>
                            <button className={viewPivateKeyLogin ? 'active' : ''} onClick={handleViewPKLogin}>PRIVATE KEY</button>
                        </div>
                        {viewSeedLogin && <div className="nclccnBody seed">
                            <p>Insert XERA Wallet Seed Phrase only.</p>
                            <div className="nclccnbInputs">
                                <div>
                                    <h6>1.</h6>
                                    <input type="text" placeholder='Word No.1'/>
                                </div>
                                <div>
                                    <h6>2.</h6>
                                    <input type="text" placeholder='Word No.2'/>
                                </div>
                                <div>
                                    <h6>3.</h6>
                                    <input type="text" placeholder='Word No.3'/>
                                </div>
                                <div>
                                    <h6>4.</h6>
                                    <input type="text" placeholder='Word No.4'/>
                                </div>
                                <div>
                                    <h6>5.</h6>
                                    <input type="text" placeholder='Word No.5'/>
                                </div>
                                <div>
                                    <h6>6.</h6>
                                    <input type="text" placeholder='Word No.6'/>
                                </div>
                                <div>
                                    <h6>7.</h6>
                                    <input type="text" placeholder='Word No.7'/>
                                </div>
                                <div>
                                    <h6>8.</h6>
                                    <input type="text" placeholder='Word No.8'/>
                                </div>
                                <div>
                                    <h6>9.</h6>
                                    <input type="text" placeholder='Word No.9'/>
                                </div>
                                <div>
                                    <h6>10.</h6>
                                    <input type="text" placeholder='Word No.10'/>
                                </div>
                                <div>
                                    <h6>11.</h6>
                                    <input type="text" placeholder='Word No.11'/>
                                </div>
                                <div>
                                    <h6>12.</h6>
                                    <input type="text" placeholder='Word No.12'/>
                                </div>
                            </div>
                            <div className="nclccLoginBtn">
                                <button>LOGIN</button>
                            </div>
                        </div>}
                        {viewPivateKeyLogin && <div className="nclccnBody private">
                            <p>Insert XERA Wallet Private Key</p>
                            <div className="nclccnbTextArea">
                                <textarea name="" id="" placeholder='64 Characters Key Code'></textarea>
                            </div>
                            <div className="nclccLoginBtn">
                                <button>LOGIN</button>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default LoginAccount