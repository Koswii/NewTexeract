import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import "../CSS/profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { TelegramData } from './TelegramDataContext';
import { 
    FaTimes
} from 'react-icons/fa';
import { 
    RiFacebookBoxFill,
    RiTwitterXFill,
    RiTiktokFill,
    RiTelegramFill,
    RiArrowDownSFill,
    RiArrowUpSFill,
    RiExchange2Line 
} from "react-icons/ri";
import { 
    TbSwitchHorizontal,
    TbPhotoVideo,
    TbExchange,
    TbInfoCircle,
    TbCircleCheckFilled,
    TbHourglassEmpty,
    TbLock,
    TbArrowUpRight,
    TbCube,
    TbReceiptOff,
    TbShoppingCartOff,
    TbCurrencyEthereum,
    TbCurrencySolana,  
    TbExternalLink,  
    TbSendOff,
    TbSend,  
    TbDeviceIpadDollar,
    TbCircleArrowDownLeft,
} from "react-icons/tb";
import { 
    PiCoins 
} from "react-icons/pi";
import ClaimTXERA from './ClaimTXERA';


const TextSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return (
      <>{truncatedText}</>
    );
};
const TextFormatter = ({ text = '' }) => {
    const formattedText = text
        .split('')
        .map((char, index) => {
            if (index === 0 || char === char.toUpperCase()) {
                return char; // Show the first and uppercase letters
            } else {
                return '*';  // Replace everything else with '*'
            }
        })
        .join('');

    return <>{formattedText}</>;
};
const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return '';
    }
  
    const truncateDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.floor(value * factor) / factor;
    };
  
    if (num >= 1_000_000) {
      return truncateDecimal(num / 1_000_000, 1) + 'M';
    } else if (num >= 100_000) {
      return truncateDecimal(num / 1_000, 1) + 'K';
    }
    
    return num.toString();
};
const NumberFormatter = ({ number }) => {
    return <>{number > 0 ? formatNumber(number) : 0}</>;
};
const ScrambleTextUsername = ({ targetText, scrambleSpeed = 50, revealSpeed = 200 }) => {
    const [scrambledText, setScrambledText] = useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    const scramble = (text) => {
      return text
        .split('')
        .map((char) => (Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : char))
        .join('');
    };
    useEffect(() => {
      let iteration = 0;
      let interval;
      const scrambleInterval = () => {
        interval = setInterval(() => {
          setScrambledText((prev) => {
            const progress = iteration / targetText.length;
            const newText = targetText
              .split('')
              .map((char, i) => (i < progress * targetText.length ? char : characters[Math.floor(Math.random() * characters.length)]))
              .join('');
            iteration++;
            if (iteration > targetText.length * 2) clearInterval(interval);
            return newText;
          });
        }, scrambleSpeed);
      };
      scrambleInterval();
      return () => clearInterval(interval);
    }, [targetText, scrambleSpeed]);
    return <>{scrambledText}</>;
};
// const ScrambleTextAirdrop = ({ targetText, scrambleSpeed = 80, revealSpeed = 200 }) => {
//     const [scrambledText, setScrambledText] = useState([]);
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  
//     useEffect(() => {
//       const lines = targetText.split('\n'); // Split text by line breaks
//       const scrambleLines = lines.map(() => ''); // Initialize scrambled text for each line
//       let iteration = 0;
  
//       const scrambleInterval = setInterval(() => {
//         setScrambledText((prev) => {
//           return lines.map((line, index) => {
//             const progress = iteration / (targetText.length * 2);
//             const scrambled = line
//               .split('')
//               .map((char, i) => (i < progress * line.length ? char : characters[Math.floor(Math.random() * characters.length)]))
//               .join('');
//             return scrambled;
//           });
//         });
  
//         iteration++;
//         if (iteration > targetText.length * 2) clearInterval(scrambleInterval);
//       }, scrambleSpeed);
  
//       return () => clearInterval(scrambleInterval);
//     }, [targetText, scrambleSpeed]);

//     return <h6 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1vw', fontWeight: '700', color: 'white',textAlign: 'left', whiteSpace: 'pre-line' }}>{scrambledText.join('\n')}</h6>;
// };


const Profile = () => {
    const {
        viewConnectWallet, 
        setViewConnectWallet,
        dataLoading,
        windowReload,
        userLoggedData,
        viewXERATransactionList,
        viewXERATokenList,
        xeraUserList,
        xeraUserProfile,
        xeraUserWallets,
        xeraReferralCounts,
        processedData,
        xeraUserFollowings,
    } = XERAWalletData();
    const {
        telegramID, 
        setTelegramID,
        telegramUsername,
        checkTelegramMembership,
        telegramStatus,
        verifyingLoader,
    } = TelegramData();
    const navigate = useNavigate();
    
    const baseURL = process.env.REACT_APP_XERA_BASE_URL_API
    const XERAAirdropTwitterAPI = process.env.REACT_APP_XERA_USER_AIRDROP_X_API;
    
    const userTelegramStatus = localStorage.getItem('telegramTask');
    const userXStatus = localStorage.getItem('twitterTask');
    const userWalletStatus = localStorage.getItem("walletTask");
    const [viewProfileOverview, setViewProfileOverview] = useState(true);
    const [viewProfileNFTs, setViewProfileNFTs] = useState(false);
    const [viewProfileOnsale, setViewProfileOnsale] = useState(false);
    const [viewProfileTokens, setViewProfileTokens] = useState(false);
    const [tokenBalances, setTokenBalances] = useState([]);
    const [tokenDetails, setTokenDetails] = useState([]);
    const [viewCreateWalleteDetails, setViewCreateWalletDetails] = useState(false);
    const [viewTelegramDetails, setViewTelegramDetails] = useState(false);
    const [twitterUsername, setTwitterUsername] = useState('');
    const [xVerifyingLoader, setXVerifyingLoader] = useState(false);
    const [xAccountStatus, setXAccountStatus] = useState('');
    const [viewXDetails, setViewXDetails] = useState(false);
    const [viewBindDetails, setViewBindDetails] = useState(false);
    const [UserTransactions,setUserTransactions] = useState(null)
    const [userTotalFollowers,setUserTotalFollowers] = useState(null)
    const [userTask,setuserTask] = useState(null)
    // const UserTransactions = viewXERATransactionList?.filter(transactions => (transactions.sender_address ,transactions.receiver_address) === userLoggedData.myXeraAddress) || {};


    // useEffect(() => {
    //     const calculateBalances = () => {
            
    //         const balances = viewXERATokenList.map((token) => {
    //             const { token_id } = token;
                
    //             // Calculate total sent for the current token
    //             const totalSend = UserTransactions
    //             .filter((tx) => 
    //                 tx.transaction_token_id === token_id && 
    //                 tx.sender_address === userLoggedData.myXeraAddress
    //             )
    //             .reduce((total, tx) => total + parseFloat(tx.transaction_amount), 0);
        
    //             // Calculate total received for the current token
    //             const totalReceive = UserTransactions
    //             .filter((tx) => 
    //                 tx.transaction_token_id === token_id && 
    //                 tx.receiver_address === userLoggedData.myXeraAddress
    //             )
    //             .reduce((total, tx) => total + parseFloat(tx.transaction_amount), 0);
        
    //             // Calculate net balance
    //             const totalBalance = (totalReceive - totalSend).toFixed(2);
        
    //             return { ...token, totalBalance };
    //         });
            
    //         // Only update state if balances have changed
    //         setTokenBalances((prevBalances) => {
    //             const hasChanged = JSON.stringify(prevBalances) !== JSON.stringify(balances);
    //             return hasChanged ? balances : prevBalances;
    //         });
    //     };
    
    //     calculateBalances();
    // }, [viewXERATokenList, UserTransactions, userLoggedData]);
    

    useEffect(() => {
        fetchBalance();
        fetchFollowers();
        fetchTransaction();
        fetchTask();
    }, [!userLoggedData])
    
    
    const fetchTransaction = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData.myXeraAddress
        }
        axios.post(`${baseURL}/user/transactions`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setUserTransactions(res.data.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const fetchBalance = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData.myXeraAddress
        }
        axios.post(`${baseURL}/user/balance`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setTokenBalances(res.data.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const fetchFollowers = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData.myXeraAddress
        }
        axios.post(`${baseURL}/user/following`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setUserTotalFollowers(res.data.data.filter(user => user.following === userLoggedData.myXeraUsername))
        }).catch((error) => {
            console.log(error);
        })
    }

    const fetchTask = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData.myXeraUsername
        }
        axios.post(`${baseURL}/users/user-tasks/all-task`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setuserTask(res.data.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleViewProfileOverview = () => {
        setViewProfileOverview(true);
        setViewProfileNFTs(false);
        setViewProfileOnsale(false);
    }
    const handleViewProfileNFTs = () => {
        setViewProfileOverview(false);
        setViewProfileNFTs(true);
        setViewProfileOnsale(false);
    }
    const handleViewProfileOnsale = () => {
        setViewProfileOverview(false);
        setViewProfileNFTs(false);
        setViewProfileOnsale(true);
    }
    const handleViewProfileTokens = () => {
        setViewProfileTokens(true);
        const timeoutId = setTimeout(() => {
            setViewProfileTokens(false);
        }, 60000);
        return () => clearTimeout(timeoutId);
    }
    const handleHideProfileTokens = () => {
        setViewProfileTokens(false);
    }

    // const userTotalFollowers = xeraUserFollowings.filter(user => user.following === userLoggedData.myXeraUsername)
    const myCurrentData = processedData.find(user => user.username === (userLoggedData && userLoggedData.myXeraUsername))
    const myCurrentPoints = myCurrentData?.totalPoints
    const myCurrentReferrals = myCurrentData?.referralTaskCount


    const submitXUsernameDetails = async () => {
        setXVerifyingLoader(true);
        if (!twitterUsername) {
            setXVerifyingLoader(false);
            setXAccountStatus('X Username is required');
            return;
        }

        const formXDetails = {
            twitterUsername: twitterUsername,
            username: userLoggedData.myXeraUsername,
            wallet: userLoggedData.myXeraAddress,
        };

        try {
            const submitAirdropTelegramResponse = await axios.post(XERAAirdropTwitterAPI, formXDetails);
            const responseMessage = submitAirdropTelegramResponse.data;
    
            if (responseMessage.success) {
                localStorage.setItem('twitterTask', 'pending')
                setXVerifyingLoader(false);
                setXAccountStatus('')
                setTwitterUsername('');
            } else {
                // console.log(responseMessage.message);
                setXAccountStatus(responseMessage.message);
                setXVerifyingLoader(false);
            }
    
        } catch (error) {
            console.error(error);
        }
    };
    const handleAirdropTask1 = () => {
        setViewCreateWalletDetails(true)
        setViewTelegramDetails(false)
        setViewXDetails(false)
        setViewBindDetails(false)

        const timeoutId = setTimeout(() => {
            setViewCreateWalletDetails(false);
        }, 10000);
        return () => clearTimeout(timeoutId);
    }
    const handleAirdropTask2 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(true)
        setViewXDetails(false)
        setViewBindDetails(false)
        
        const timeoutId = setTimeout(() => {
            setViewTelegramDetails(false);
        }, 10000);
        return () => clearTimeout(timeoutId);
    }
    const handleAirdropTask3 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(true)
        setViewBindDetails(false)
        
        const timeoutId = setTimeout(() => {
            setViewXDetails(false);
        }, 10000);
        return () => clearTimeout(timeoutId);
    }
    const handleAirdropTask4 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(false)
        setViewBindDetails(true)
        
        const timeoutId = setTimeout(() => {
            setViewBindDetails(false);
        }, 10000);
        return () => clearTimeout(timeoutId);
    }
    const handleCloseAirdropDetails = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(false)
        setViewBindDetails(false)
    }
    const handleBindWallet = () => {
        setViewConnectWallet(true);
    }

    const handleClaimTXERA = () => {
        navigate('/TestnetFaucet')
    }
    
    return (
        <div className='mainContainer profile'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="profilePageContainer top">
                <div className="profilePageContent left">
                    <div className="prfpclHeader">
                        <div className="prfpchead left">
                            <div className='prfpchlImg'>
                                <img src="" alt="" />
                                {/* <div className="prfpchlNFT switch">
                                    <button><TbExchange className='faIcons'/></button>
                                </div>
                                <div className="prfpchlNFT rarity">
                                    <h6>RARITY:</h6>
                                    <h5>CREATOR</h5>
                                    <p>NFT ID: XERA00000001</p>
                                </div>
                                <div className="prfpchlNFT value">
                                    <div className="prfpchlnftv left">
                                        <p>Market Value</p>
                                        <div>
                                            <h4>0</h4>
                                            <img src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                                        </div>
                                    </div>
                                    <div className="prfpchlnftv right">
                                        <button>SEND</button>
                                        <button>SELL</button>
                                    </div>
                                </div> */}
                                <div className="prfpchlNFTEmpty">
                                    <span>
                                        <p>No NFT Available</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="prfpchead right">
                            <div className="prfpchrNav">
                                <button className={viewProfileOverview ? 'active' : ''} onClick={handleViewProfileOverview}>OVERVIEW</button>
                                <button className={viewProfileNFTs ? 'active' : ''} onClick={handleViewProfileNFTs}>NFTs</button>
                                <button className={viewProfileOnsale ? 'active' : ''} onClick={handleViewProfileOnsale}>ON MARKET</button>
                            </div>
                            {viewProfileOverview && <div className="prfpchrContents">
                                {!viewProfileTokens ?
                                <button id='prfpchrcAssetBtn' onClick={handleViewProfileTokens}><PiCoins className='faIcons'/><RiArrowDownSFill className='faIcons'/></button>:
                                <button id='prfpchrcAssetBtn' onClick={handleHideProfileTokens}><PiCoins className='faIcons'/><RiArrowUpSFill className='faIcons'/></button>}
                                <div className={viewProfileTokens ? "prfpchrcAssetList active" : "prfpchrcAssetList"}>
                                    <ul>
                                        {tokenBalances.map((data, i) => (
                                            <li key={i}>
                                                <span id='prfpchrcaLogo'>
                                                    <img src={require(`../assets/imgs/TokenLogos/${data?.token_logo}`)} alt="" />
                                                </span>
                                                <span id='prfpchrcaDetails'>
                                                    <h6>{data?.token_name}</h6>
                                                    <p>{data?.totalBalance} {data?.token_symbol}</p>
                                                </span>
                                                <span id="prfpchrcaValue">
                                                    <h6>$ {data?.token_price}</h6>
                                                    <p>- %</p>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="prfpchrcProfile">
                                    <h5><ScrambleTextUsername targetText={`${ userLoggedData?.myXeraUsername}`} scrambleSpeed={80} revealSpeed={200} /></h5>
                                    <h6>{userLoggedData?.myXeraAddress}</h6>
                                </div>
                                <div className="prfpchrcBalance">
                                    <p>BALANCE</p>
                                    <h3>0.00 XERA</h3>
                                    <div className="prfpchrcbFunctions">
                                        <button className='disabled'><TbDeviceIpadDollar className='faIcons'/> BUY</button>
                                        <button className='disabled'><TbSend className='faIcons'/> SEND</button>
                                        <button className='disabled'><TbCircleArrowDownLeft  className='faIcons'/> RECEIVE</button>
                                        <button className='disabled'><TbExchange className='faIcons'/> SWAP</button>
                                    </div>
                                </div>
                                <div className="prfpchrcStats">
                                    <div className="prfpchrcs Followers">
                                        <p>Followers</p>
                                        <div className='prfpchrcsf'>
                                            {userTotalFollowers && 
                                                <>
                                                {userTotalFollowers.length >= 3 &&
                                                    <div>
                                                        {userTotalFollowers.slice(0, 3).map((data, i) => (
                                                            <span key={i}>
                                                                {data?.display?.xera_nft_meta ?
                                                                    <img key={i} src="" alt="" />:
                                                                    <img key={i} src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                                }
                                                            </span>
                                                        ))}
                                                    </div>
                                                }
                                                <h5><NumberFormatter number={userTotalFollowers.length}/></h5>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="prfpchrcs Referrals">
                                        <p>Referrals</p>
                                        <h5><NumberFormatter number={myCurrentReferrals}/></h5>
                                    </div>
                                    <div className="prfpchrcs Points">
                                        <p>XERA Points</p>
                                        <h5><NumberFormatter number={myCurrentPoints}/></h5>
                                    </div>
                                </div>
                            </div>}
                            {viewProfileNFTs && <div className="prfpchrContents notAvailable">
                                <div className="prfpchrcEmpty">
                                    <span>
                                        <h6><TbCube className='faIcons'/></h6>
                                        <p>No NFT Available</p>
                                    </span>
                                </div>
                            </div>}
                            {viewProfileOnsale && <div className="prfpchrContents notAvailable">
                                <div className="prfpchrcEmpty">
                                    <span>
                                        <h6><TbShoppingCartOff className='faIcons'/></h6>
                                        <p>No Asset on Market</p>
                                    </span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="profilePageContent right">
                    <div className="prfpcrHeader">
                        <h6>MY NODES</h6>
                    </div>
                    <div className="prfpcrNodeAnimation">
                        <img className='' src={require('../assets/imgs/NodeBG.gif')} alt="" />
                        <span>
                            <p>No Active Node</p>
                        </span>
                    </div>
                    <div className="prfpcrUserNodes">
                        <>
                            <div className="prfpcrunEmpty">
                                <p>No Nodes Available</p>
                            </div>
                        </>
                        <>
                            {/* <div className="prfpcrunNode">
                                <div className="prfpcrunn left">
                                    <h6>XERA MICRO NODE</h6>
                                    <p>PHASE 1 AIRDROP REWARD</p>
                                </div>
                                <div className="prfpcrunn right">
                                    <button id='prfpcrunnrClaim'>CLAIM</button>
                                </div>
                            </div> */}
                            {/* <div className="prfpcrunNode">
                                <div className="prfpcrunn left">
                                    <h6>XERA PICO NODE</h6>
                                    <p>1,080 XERA Points / Day</p>
                                </div>
                                <div className="prfpcrunn right">
                                    <button id='prfpcrunnrClaim'>CLAIM</button>
                                </div>
                            </div> */}
                        </>
                    </div>
                </div>
            </section>
            <section className="profilePageContainer mid">
                <div className="ppContentMidAirdrop">
                    <div className="ppcmAirdrop left">
                        <h5>AIRDROP TASK</h5>
                        <div className="ppcmalContainer">
                            <div className={userLoggedData?.myXeraAddress ? "ppcmalcContent create active" : "ppcmalcContent create"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask1}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 1</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6>CREATE A<br />XERA WALLET</h6>
                                    <p>COMPLETED</p>
                                </div>
                                <div className={!viewCreateWalleteDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    {/* <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button> */}
                                    <h6>CREATE A<br />XERA WALLET</h6>
                                    {userLoggedData?.myXeraAddress ?
                                        <p id='ppcmalccdStatus'><TbCircleCheckFilled className='faIcons'/> COMPLETED</p>:
                                        <p id='ppcmalccdStatus'>TASK 1</p>
                                    }
                                    <p id='ppcmalccdDesription'>Create your own XERA Wallet to securely store and manage all your future transactions.</p>
                                </div>
                            </div>
                            <div className={(userTask?.telegramtask) ? "ppcmalcContent telegram active" : "ppcmalcContent telegram"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask2}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 2</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>10,000 XP</span><br />JOIN TELEGRAM<br />COMMUNITY</h6>
                                    {userTask?.telegramtask ?
                                        <p>COMPLETED</p>:
                                        <a href='https://t.me/TexeractNetworkCommunity' target='blank'>
                                            <button onClick={handleAirdropTask2} className='active'>EXECUTE</button>
                                        </a>
                                    }
                                </div>
                                <div className={!viewTelegramDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    {/* <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button> */}
                                    <h6>JOIN TELEGRAM<br />COMMUNITY</h6>
                                    {userTask?.telegramtask ?
                                        <p id='ppcmalccdStatus'><TbCircleCheckFilled className='faIcons'/> COMPLETED</p>:
                                        <p id='ppcmalccdStatus'>TASK 2</p>
                                    }
                                    <p id='ppcmalccdDesription'>Join the Texeract Official Telegram Community for updates and user interactions.</p>
                                    {!userTask?.telegramtask && <>
                                        <div className="ppcmalccInputs">
                                            <input type="number" placeholder='INSERT USER ID' value={telegramID} onChange={(e) => setTelegramID(e.target.value)}/>
                                            {!verifyingLoader ?
                                                <button onClick={checkTelegramMembership}>VERIFY ACCOUNT</button>:
                                                <button>VERIFYING...</button>
                                            }
                                        </div>
                                        <p id='ppcmalccdError'>{telegramStatus}</p>
                                    </>}
                                </div>
                            </div>
                            <div className={(userTask?.twittertask) ? "ppcmalcContent xtwitter active" : "ppcmalcContent xtwitter"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask3}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 3</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>10,000 XP</span><br />VISIT AND<br />FOLLOW X</h6>
                                    {userTask?.twittertask ?
                                        <>
                                            {(userTask?.twittertask === 'pending') && <p id='pendingTask'>PENDING</p>}
                                            {(userTask?.twittertask === 'ok') && <p>COMPLETED</p>}
                                        </>:
                                        <a href='https://twitter.com/TexeractNetwork' target='blank'>
                                            <button onClick={handleAirdropTask3} className='active'>EXECUTE</button>
                                        </a>
                                    }
                                </div>
                                <div className={!viewXDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    {/* <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button> */}
                                    <h6>VISIT AND<br />FOLLOW X</h6>
                                    {userXStatus ?
                                        <p id='ppcmalccdStatus'>
                                            {(userXStatus === 'pending') && <TbHourglassEmpty className='faIcons pending'/>} 
                                            {(userXStatus === 'pending') && 'PENDING'}
                                            {(userXStatus === 'ok') && <TbCircleCheckFilled className='faIcons'/>} 
                                            {(userXStatus === 'ok') && 'COMPLETED'}
                                        </p>:
                                        <p id='ppcmalccdStatus'>TASK 3</p>
                                    }
                                    <p id='ppcmalccdDesription'>Stay updated and connected—follow Texeract Network on X (Twitter).</p>
                                    {!userXStatus && <>
                                        <div className="ppcmalccInputs">
                                            <input type="text" placeholder='INSERT USERNAME' onChange={(e) => setTwitterUsername(e.target.value)}/>
                                            {!xVerifyingLoader ?
                                                <button onClick={submitXUsernameDetails}>VERIFY ACCOUNT</button>:
                                                <button>VERIFYING...</button>
                                            }
                                        </div>
                                        <p id='ppcmalccdError'>{xAccountStatus}</p>
                                    </>}
                                    {userXStatus && 
                                        <p id='ppcmalccdDesription'>You must continue following @TexeractNetwork until the end of the event to complete the task.</p>
                                    }
                                </div>
                            </div>
                            <div className={(userTask?.walletConnect ) ? "ppcmalcContent binding active" : "ppcmalcContent binding"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask4}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 4</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>10,000 XP</span><br />BIND YOUR<br />CRYTO WALLET</h6>
                                    {userTask?.walletConnect ?
                                        <>
                                            {userTask?.ethWallet === "true" && <p id='connectedNetwork'><TbCurrencyEthereum className='faIcons'/>CONNECTED</p>}
                                            {xeraUserWallets?.sol_wallet && <p id='connectedNetwork'><TbCurrencySolana className='faIcons'/>CONNECTED</p>}
                                        </>
                                        :<button onClick={handleBindWallet} className='active'>CONNECT</button>
                                    }
                                </div>
                                <div className={!viewBindDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    {/* <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button> */}
                                    <h6>BIND ANY<br />CRYTO WALLET</h6>
                                    {userWalletStatus ?
                                        <p id='ppcmalccdStatus'><TbCircleCheckFilled className='faIcons'/> COMPLETED</p>:
                                        <p id='ppcmalccdStatus'>TASK 4</p>
                                    }
                                    <p id='ppcmalccdDesription'>Connect your crypto wallet to seamlessly transact across any blockchain network. <br /> (ETHEREUM or SOLANA Only)</p>
                                    {xeraUserWallets?.eth_wallet && <p id='ppcmalccdDesription'>You Successfully Connected your <TbCurrencyEthereum className='faIcons'/> Ethereum Wallet Address</p>}
                                    {xeraUserWallets?.sol_wallet && <p id='ppcmalccdDesription'>You Successfully Connected your <TbCurrencySolana className='faIcons'/> Solana Wallet Address</p>}
                                </div>
                            </div>
                            <div className="ppcmalcContent testnetXERA active">
                                <div className="ppcmalccTitle">
                                    <p>TASK 5</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>1,250 XP</span><br />CLAIM TXERA<br />EVERY 12 HOURS</h6>
                                    <button onClick={handleClaimTXERA} className='active'>CLAIM</button>
                                </div>
                            </div>
                            <div className="ppcmalcContent testnetXERA">
                                <div className="ppcmalccTitle">
                                    <p>TASK 6</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>1,250 XP</span><br />SEND TXERA<br />EVERY 12 HOURS</h6>
                                    <button disabled>SEND</button>
                                </div>
                            </div>
                            <div className="ppcmalcContent testnetXERA">
                                <div className="ppcmalccTitle">
                                    <p>TASK 7</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>1,250 XP</span><br />SWAP TXERA/TETH<br />EVERY 12 HOURS</h6>
                                    <button disabled>SWAP</button>
                                </div>
                            </div>
                            <div className="ppcmalcContent testnetXERA">
                                <div className="ppcmalccTitle">
                                    <p>TASK 8</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6><span>1,250 XP</span><br />SWAP TXERA/TSOL<br />EVERY 12 HOURS</h6>
                                    <button disabled>SWAP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ppcmAirdrop right">
                        <div className="ppcmarTitle">
                            <h5>REFERRAL LEADERBOARD</h5>
                            <Link to='/Leaderboards'><TbArrowUpRight className="faIcons"/></Link>
                        </div>
                        <div className="ppcmarContainer">
                            {(dataLoading) ? <>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                                <div className="ppcmarcRefLeaderLoading">
                                    <div className="ppcmarcrlLeader"></div>
                                    <span></span>
                                    <div className="ppcmarcrlName"></div>
                                    <div className="ppcmarcrlCount"></div>
                                </div>
                            </>:<>
                                {xeraReferralCounts.slice(0, 20).map((data, i) => (
                                    <div className="ppcmarcRefLeader" key={i}>
                                        <div className="ppcmarcrlLeader">
                                            <h5>{i+1}</h5>
                                        </div>
                                        <span>
                                            {data?.display ? 
                                                <img src="" alt="" />:
                                                <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                            }
                                        </span>
                                        <div className='ppcmarcrlName'>
                                            <h6><TextFormatter text={`${data?.username}`} /></h6>
                                            <p><TextSlicer text={`${data?.xera_wallet}`} maxLength={18} /></p>
                                        </div>
                                        <div className='ppcmarcrlCount'>
                                            <h5><NumberFormatter number={data?.count}/></h5>
                                        </div>
                                    </div>
                                ))}
                            </>}
                        </div>
                    </div>
                </div>
            </section>
            <section className="profilePageContainer mid">
                <div className="ppContentMidTransactions">
                    <h5>RECENT TRANSACTIONS</h5>
                    <div className="ppcmTransactionsContainer">
                        <div className="ppcmtcTitle">
                            <span id='ppcmtctBlock'><h6>BLOCK</h6></span>
                            <span id='ppcmtctTxHash'><h6>TX HASH</h6></span>
                            <span id='ppcmtctSender'><h6>SENDER</h6></span>
                            <span id='ppcmtctReceiver'><h6>RECEIVER</h6></span>
                            <span id='ppcmtctAsset'><h6>ASSET</h6></span>
                            <span id='ppcmtctInfo'><h6>COMMAND</h6></span>
                            <span id='ppcmtctExternal'><h6></h6></span>
                        </div>
                        <div className="ppcmtcTransaction">
                            {UserTransactions && 
                            <>
                                {(UserTransactions.length === 0) && <>
                                    <div className="ppcmtctEmpty">
                                        <span>
                                            <h6><TbReceiptOff className='faIcons'/></h6>
                                            <p>No Transaction Yet</p>
                                        </span>
                                    </div>
                                </>}
                                </>
                            }
                            {(dataLoading) ? <>
                                <div className="ppcmtctEmpty">
                                    <span>
                                        <p>Loading Transactions...</p>
                                    </span>
                                </div>
                            </>:<>
                                {UserTransactions &&
                                <>
                                {UserTransactions.map((data, i) => (
                                    <div className="ppcmtctContents" key={i}>
                                        <ul>
                                            <li id='ppcmtctcBlock'><p>{data?.transaction_block}</p></li>
                                            <li id='ppcmtctcHash'><p><TextSlicer text={`${data?.transaction_hash}`} maxLength={30} /></p></li>
                                            <li id='ppcmtctcSender'><p><TextSlicer text={`${data?.sender_address}`} maxLength={30} /></p></li>
                                            <li id='ppcmtctcReceiver'><p><TextSlicer text={`${data?.receiver_address}`} maxLength={30} /></p></li>
                                            <li id='ppcmtctcAsset'><p>{parseFloat(data?.transaction_amount).toFixed(2)} {data?.transaction_token}</p></li>
                                            <li id='ppcmtctcInfo'><p>{data?.transaction_command}</p></li>
                                            <li id='ppcmtctcExternal'><Link><TbExternalLink className='faIcons'/></Link></li>
                                        </ul>
                                    </div>
                                ))}
                                </>
                                }
                            </>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile