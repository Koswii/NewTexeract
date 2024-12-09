import React, { useState, useEffect } from 'react'
import "../CSS/loginAccount.css";
import { 
    FaTimes
} from 'react-icons/fa';
import axios from "axios";
import Cookies from "js-cookie";
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

    
    const api = process.env.REACT_APP_XERA_API
    const baseURL = process.env.REACT_APP_XERA_BASE_URL_API

    const key = {
        apikey: api
    }
    
    const XERALoginBasicAccountAPI = process.env.REACT_APP_XERA_USER_LOGIN_BASIC_API;
    const XERALoginSeedAccountAPI = process.env.REACT_APP_XERA_USER_LOGIN_SEED_API;
    const XERALoginPKAccountAPI = process.env.REACT_APP_XERA_USER_LOGIN_PK_API;
    const [loginLoader, setLoginLoader] = useState(false);
    const [viewDefaultLogin, setViewDefaultLogin] = useState(true);
    const [viewXeraWalletLogin, setViewXeraWalletLogin] = useState(false);
    const [viewSeedLogin, setViewSeedLogin] = useState(true);
    const [viewPivateKeyLogin, setViewPrivateKeyLogin] = useState(false);

    const handleViewDefaultLogin = () => {
        setViewDefaultLogin(true);
        setViewXeraWalletLogin(false);
        setSeedPhraseResponse(false);
        setPrivateKeyLoginResponse(false);
    }
    const handleViewPrivateLogin = () => {
        setViewDefaultLogin(false);
        setViewXeraWalletLogin(true);
    }
    const handleViewSPLogin = () => {
        setViewSeedLogin(true);
        setViewPrivateKeyLogin(false);
        setPrivateKeyLoginResponse(false);
    }
    const handleViewPKLogin = () => {
        setViewSeedLogin(false);
        setViewPrivateKeyLogin(true);
        setSeedPhraseResponse(false);
    }


    const [insertUsername, setInsertUsername] = useState('')
    const [insertPassword, setInsertPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false);
    const [viewLoginResponse, setViewLoginResponse] = useState(false);
    const [viewLoginMessage, setViewLoginMessage] = useState('');

    const [seedPhrase1, setSeedPhrase1] = useState('')
    const [seedPhrase2, setSeedPhrase2] = useState('')
    const [seedPhrase3, setSeedPhrase3] = useState('')
    const [seedPhrase4, setSeedPhrase4] = useState('')
    const [seedPhrase5, setSeedPhrase5] = useState('')
    const [seedPhrase6, setSeedPhrase6] = useState('')
    const [seedPhrase7, setSeedPhrase7] = useState('')
    const [seedPhrase8, setSeedPhrase8] = useState('')
    const [seedPhrase9, setSeedPhrase9] = useState('')
    const [seedPhrase10, setSeedPhrase10] = useState('')
    const [seedPhrase11, setSeedPhrase11] = useState('')
    const [seedPhrase12, setSeedPhrase12] = useState('')
    const [seedPhraseResponse, setSeedPhraseResponse] = useState(false);

    const [privateKeyLogin, setPrivateKeyLogin] = useState('');
    const [privateKeyLoginResponse, setPrivateKeyLoginResponse] = useState(false);

    // Utility function to handle temporary messages
    const showTemporaryMessage = (message) => {
        setViewLoginResponse(true);
        setViewLoginMessage(message);

        const timeoutId = setTimeout(() => {
            setViewLoginResponse(false);
            setViewLoginMessage('');
        }, 3000);

        return () => clearTimeout(timeoutId);
    };
    const handleUserLoginBasic = async () => {
        try {
            setLoginLoader(true);
    
            // Validate input fields
            if (!insertUsername || !insertPassword) {
                showTemporaryMessage('Please fill in all fields.');
                return;
            }
    
            // Generate access token
            const { data: tokenData } = await axios.post(`${baseURL}/generate/access-token`, key);
    
            if (!tokenData.success) {
                throw new Error('Failed to generate access token.');
            }
    
            const accessToken = tokenData.accessToken;
            const loginInfoDetails = {
                username: insertUsername,
                password: insertPassword,
            };
    
            // Configure headers
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };
    
            // Attempt user login
            const { data: loginResponse } = await axios.post(
                `${baseURL}/user/login-basic`,
                loginInfoDetails,
                { headers }
            );
    
            if (loginResponse.success) {
                Cookies.set('authToken', loginResponse.authToken, { expires: 7 });
                setViewLoginAccount(false);
                window.location.reload();
            } else {
                showTemporaryMessage(loginResponse.message);
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred.';
            showTemporaryMessage(errorMessage);
        } finally {
            setLoginLoader(false);
        }
    };
    


    const handleUserLoginSeed = async () => {
        setLoginLoader(true);
      
        if (!seedPhrase1 || !seedPhrase2 || !seedPhrase3 || !seedPhrase4 || !seedPhrase5 || !seedPhrase6 || !seedPhrase7 || !seedPhrase8 || !seedPhrase9 || !seedPhrase10 || !seedPhrase11 || !seedPhrase12) {
                setSeedPhraseResponse(true);
                setViewLoginMessage('Please fill in all fields.');
                setLoginLoader(false);

                const timeoutId = setTimeout(() => {
                    setSeedPhraseResponse(false);
                    setViewLoginMessage("");
                }, 3000);
                return () => clearTimeout(timeoutId);
        }
      

        axios.post(`${baseURL}/generate/access-token`,key)
        .then((res) => {
            const accessToken = res.data.accessToken
            const walletSeed = {
                seedWord1: seedPhrase1,
                seedWord2: seedPhrase2,
                seedWord3: seedPhrase3,
                seedWord4: seedPhrase4,
                seedWord5: seedPhrase5,
                seedWord6: seedPhrase6,
                seedWord7: seedPhrase7,
                seedWord8: seedPhrase8,
                seedWord9: seedPhrase9,
                seedWord10: seedPhrase10,
                seedWord11: seedPhrase11,
                seedWord12: seedPhrase12,
            };
            const seedPhrase = JSON.stringify(walletSeed);
            
            if (res.data.success) {
                axios.post(`${baseURL}/user/login-phrase`, { seedPhrase }, {
                    headers: {
                        'Authorization' : `Bearer ${accessToken}` 
                    },
                }).then((response) =>{
                    const successData = response.data.success; 
                    if (successData === true) {
                        const userAuthToken = response.data.authToken
                        Cookies.set('authToken', userAuthToken, { expires: 7 });
                        setSeedPhraseResponse(false);
                        window.location.reload();
                    }else{
                        setSeedPhraseResponse(true)
                        setViewLoginMessage(response.data.message)
        
                        const timeoutId = setTimeout(() => {
                            setSeedPhraseResponse(false);
                            setViewLoginMessage("");
                        }, 3000);
                        return () => clearTimeout(timeoutId);
                    }
                })
                .catch((error) => {
                    const errorData = error.response.data
                    setLoginLoader(false);
                    setSeedPhraseResponse(true)
                    setViewLoginMessage(errorData.message)
        
                    const timeoutId = setTimeout(() => {
                        setSeedPhraseResponse(false);
                        setViewLoginMessage("");
                    }, 3000);
                    return () => clearTimeout(timeoutId);
                })
            }
        })
        .catch((error) => {
            const errorData = error.response.data
            setLoginLoader(false);
            setSeedPhraseResponse(true)
            setViewLoginMessage(errorData.message)

            const timeoutId = setTimeout(() => {
                setSeedPhraseResponse(false);
                setViewLoginMessage("");
            }, 3000);
            return () => clearTimeout(timeoutId);
        })
    };
    const handleUserLoginPrivateKey = async () => {
        setLoginLoader(true);
      
        if (!privateKeyLogin) {
            setPrivateKeyLoginResponse(true);
            setViewLoginMessage('Please fill in all fields.');
            setLoginLoader(false);

            const timeoutId = setTimeout(() => {
                setSeedPhraseResponse(false);
                setViewLoginMessage("");
            }, 3000);
            return () => clearTimeout(timeoutId);
        }


        axios.post(`${baseURL}/generate/access-token`, key)
        .then((res) => {
            const accessToken = res.data.accessToken
            const userPK = {
                privateKey: privateKeyLogin,
            }
    
    
            if (res.data.success) {
                axios.post(`${baseURL}/user/login-prKey`, userPK, {
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json',
                        'Authorization' : `Bearer ${accessToken}`
                    },
                }).then((response) =>{
                    const successData = response.data.success; 
                    if (successData === true) {
                        const userAuthToken = response.data.authToken
                        Cookies.set('authToken', userAuthToken, { expires: 7 });
                        setPrivateKeyLoginResponse(false);
                        window.location.reload();
                    }else{
                        setViewLoginMessage(response.data.message)
                    }
                })
                .catch((error) => {
                    const errorData = error.response.data
                    setLoginLoader(false);
                    setPrivateKeyLoginResponse(true)
                    setViewLoginMessage(errorData.message)
        
                    const timeoutId = setTimeout(() => {
                        setPrivateKeyLoginResponse(false);
                        setViewLoginMessage("");
                    }, 3000);
                    return () => clearTimeout(timeoutId);
                })
            }
        })
        .catch((error) => {
            const errorData = error.response.data
            setLoginLoader(false);
            setPrivateKeyLoginResponse(true)
            setViewLoginMessage(errorData.message)

            const timeoutId = setTimeout(() => {
                setPrivateKeyLoginResponse(false);
                setViewLoginMessage("");
            }, 3000);
            return () => clearTimeout(timeoutId);
        })
    };





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
                            {!loginLoader ? 
                                <button className={(insertUsername && insertPassword) ? 'active' : ''} onClick={handleUserLoginBasic}>LOGIN</button>:
                                <button>LOGGING IN</button>
                            }
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
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>1.</h6>
                                    <input type="text" placeholder='Word No.1' onChange={(e) => setSeedPhrase1(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>2.</h6>
                                    <input type="text" placeholder='Word No.2' onChange={(e) => setSeedPhrase2(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>3.</h6>
                                    <input type="text" placeholder='Word No.3' onChange={(e) => setSeedPhrase3(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>4.</h6>
                                    <input type="text" placeholder='Word No.4' onChange={(e) => setSeedPhrase4(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>5.</h6>
                                    <input type="text" placeholder='Word No.5' onChange={(e) => setSeedPhrase5(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>6.</h6>
                                    <input type="text" placeholder='Word No.6' onChange={(e) => setSeedPhrase6(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>7.</h6>
                                    <input type="text" placeholder='Word No.7' onChange={(e) => setSeedPhrase7(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>8.</h6>
                                    <input type="text" placeholder='Word No.8' onChange={(e) => setSeedPhrase8(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>9.</h6>
                                    <input type="text" placeholder='Word No.9' onChange={(e) => setSeedPhrase9(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>10.</h6>
                                    <input type="text" placeholder='Word No.10' onChange={(e) => setSeedPhrase10(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>11.</h6>
                                    <input type="text" placeholder='Word No.11' onChange={(e) => setSeedPhrase11(e.target.value)}/>
                                </div>
                                <div className={seedPhraseResponse ? 'error' : ''}>
                                    <h6>12.</h6>
                                    <input type="text" placeholder='Word No.12' onChange={(e) => setSeedPhrase12(e.target.value)}/>
                                </div>
                            </div>
                            <div className="nclccLoginBtn">
                                <button 
                                    className={(seedPhrase1 && seedPhrase2 && seedPhrase3 && seedPhrase4 && seedPhrase5 && seedPhrase6 && seedPhrase7 && seedPhrase8 && seedPhrase9 && seedPhrase10 && seedPhrase11 && seedPhrase12) ? 'active' : ''}
                                    disabled={!seedPhrase1 || !seedPhrase2 || !seedPhrase3 || !seedPhrase4 || !seedPhrase5 || !seedPhrase6 || !seedPhrase7 || !seedPhrase8 || !seedPhrase9 || !seedPhrase10 || !seedPhrase11 || !seedPhrase12} 
                                    onClick={handleUserLoginSeed}
                                >LOGIN</button>
                            </div>
                        </div>}
                        {viewPivateKeyLogin && <div className="nclccnBody private">
                            <p>Insert XERA Wallet Private Key</p>
                            <div className="nclccnbTextArea">
                                <textarea className={privateKeyLoginResponse ? 'error' : ''} name="" id="" placeholder='64 Characters Key Code' onChange={(e) => setPrivateKeyLogin(e.target.value)}></textarea>
                            </div>
                            <div className="nclccLoginBtn">
                                <button className={privateKeyLogin ? 'active' : ''} disabled={!privateKeyLogin} onClick={handleUserLoginPrivateKey}>LOGIN</button>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default LoginAccount