import React, { useEffect, useState } from 'react'
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
} from "react-icons/tb";

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
const formatNumberToK = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return '';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
};
const NumberFormatter = ({ number }) => {
    return <>{formatNumberToK(number)}</>;
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
    return <h5 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1.5vw', fontWeight: '700', color: 'white' }}>{scrambledText}</h5>;
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
        windowReload,
        userLoggedData,
        xeraUserList,
        xeraUserProfile,
        xeraUserReferrals,
        xeraReferralCounts,
        xeraUserAirdrops,
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

    console.log(xeraReferralCounts);
    
    
    const XERAAirdropTwitterAPI = process.env.REACT_APP_XERA_USER_AIRDROP_X_API;
    
    const userTelegramStatus = localStorage.getItem('telegramTask');
    const userXStatus = localStorage.getItem('twitterTask');
    const [viewCreateWalleteDetails, setViewCreateWalletDetails] = useState(false);
    const [viewTelegramDetails, setViewTelegramDetails] = useState(false);
    const [twitterUsername, setTwitterUsername] = useState('');
    const [xVerifyingLoader, setXVerifyingLoader] = useState(false);
    const [xAccountStatus, setXAccountStatus] = useState('');
    const [viewXDetails, setViewXDetails] = useState(false);
    const [viewBindDetails, setViewBindDetails] = useState(false);

    const userTotalReferral = xeraUserReferrals.filter(user => user.xera_referral === userLoggedData.myXeraUsername)
    const userTotalFollowers = xeraUserFollowings.filter(user => user.following === userLoggedData.myXeraUsername)


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
    }
    const handleAirdropTask2 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(true)
        setViewXDetails(false)
        setViewBindDetails(false)
    }
    const handleAirdropTask3 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(true)
        setViewBindDetails(false)
    }
    const handleAirdropTask4 = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(false)
        setViewBindDetails(true)
    }
    const handleCloseAirdropDetails = () => {
        setViewCreateWalletDetails(false)
        setViewTelegramDetails(false)
        setViewXDetails(false)
        setViewBindDetails(false)
    }
    

    
    return (
        <div className='mainContainer profile'>
            {windowReload && <div className="profileReload">
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>}
            <section className="profilePageContainer top">
                <div className="profilePageContent left">
                    <div className="prfpclHeader">
                        <div className="prfpchead left">
                            <div className='prfpchlImg'>
                                <img src="" alt="" />
                                <div className="prfpchlNFT switch">
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
                                </div>
                            </div>
                        </div>
                        <div className="prfpchead right">
                            <div className="prfpchrNav">
                                <button className='active'>OVERVIEW</button>
                                <button>NFTs</button>
                                <button>ON MARKET</button>
                            </div>
                            <div className="prfpchrContents">
                                <div className="prfpchrcProfile">
                                    <ScrambleTextUsername targetText={`${ userLoggedData.myXeraUsername}`} scrambleSpeed={80} revealSpeed={200} />
                                    <h6>{userLoggedData.myXeraAddress}</h6>
                                </div>
                                <div className="prfpchrcBalance">
                                    <h3>0 XERA</h3>
                                    <p>BALANCE</p>
                                </div>
                                <div className="prfpchrcStats">
                                    <div className="prfpchrcs Followers">
                                        <p>Followers</p>
                                        <div className='prfpchrcsf'>
                                            {userTotalFollowers.length >= 3 &&
                                                <div>
                                                    {userTotalFollowers.slice(0, 3).map((data, i) => (
                                                        <span key={i}>
                                                            {data.display.xera_nft_meta ?
                                                                <img key={i} src="" alt="" />:
                                                                <img key={i} src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                            }
                                                        </span>
                                                    ))}
                                                </div>
                                            }
                                            <h5><NumberFormatter number={userTotalFollowers.length}/></h5>
                                        </div>
                                    </div>
                                    <div className="prfpchrcs Referrals">
                                        <p>Referrals</p>
                                        <h5><NumberFormatter number={userTotalReferral.length}/></h5>
                                    </div>
                                    <div className="prfpchrcs Points">
                                        <p>XERA Points</p>
                                        <h5><NumberFormatter number={0}/></h5>
                                    </div>
                                </div>
                            </div>
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
                            <div className={userLoggedData.myXeraAddress ? "ppcmalcContent create active" : "ppcmalcContent create"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask1}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 1</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6>CREATE A<br />XERA WALLET</h6>
                                    <p>COMPLETED</p>
                                </div>
                                <div className={!viewCreateWalleteDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button>
                                    <h6>CREATE A<br />XERA WALLET</h6>
                                    {userLoggedData.myXeraAddress ?
                                        <p id='ppcmalccdStatus'><TbCircleCheckFilled className='faIcons'/> COMPLETED</p>:
                                        <p id='ppcmalccdStatus'>TASK 1</p>
                                    }
                                    <p id='ppcmalccdDesription'>Create your own XERA Wallet to securely store and manage all your future transactions.</p>
                                </div>
                            </div>
                            <div className={(userTelegramStatus) ? "ppcmalcContent telegram active" : "ppcmalcContent telegram"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask2}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 2</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6>JOIN TELEGRAM<br />COMMUNITY</h6>
                                    {userTelegramStatus ?
                                        <p>COMPLETED</p>:
                                        <a href='https://t.me/TexeractNetworkCommunity' target='blank'>
                                            <button onClick={handleAirdropTask2}>EXECUTE</button>
                                        </a>
                                    }
                                </div>
                                <div className={!viewTelegramDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button>
                                    <h6>JOIN TELEGRAM<br />COMMUNITY</h6>
                                    {userTelegramStatus ?
                                        <p id='ppcmalccdStatus'><TbCircleCheckFilled className='faIcons'/> COMPLETED</p>:
                                        <p id='ppcmalccdStatus'>TASK 2</p>
                                    }
                                    <p id='ppcmalccdDesription'>Join the Texeract Official Telegram Community for updates and user interactions.</p>
                                    {!userTelegramStatus && <>
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
                            <div className={(userXStatus) ? "ppcmalcContent xtwitter active" : "ppcmalcContent xtwitter"}>
                                <button id='airdropTaskInfo' onClick={handleAirdropTask3}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 3</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6>VISIT AND<br />FOLLOW X</h6>
                                    {userXStatus ?
                                        <>
                                            {(userXStatus === 'pending') && <p id='pendingTask'>PENDING</p>}
                                            {(userXStatus === 'ok') && <p>COMPLETED</p>}
                                        </>:
                                        <a href='https://twitter.com/TexeractNetwork' target='blank'>
                                            <button onClick={handleAirdropTask3}>EXECUTE</button>
                                        </a>
                                    }
                                </div>
                                <div className={!viewXDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button>
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
                            <div className="ppcmalcContent binding">
                                <button id='airdropTaskInfo' onClick={handleAirdropTask4}><TbInfoCircle className='faIcons'/></button>
                                <div className="ppcmalccTitle">
                                    <p>TASK 4</p>
                                </div>
                                <div className="ppcmalccTask">
                                    <h6>BIND ANY<br />CRYTO WALLET</h6>
                                    <button>CONNECT</button>
                                </div>
                                <div className={!viewBindDetails ? "ppcmalccDetails" : "ppcmalccDetails active"}>
                                    <button id='ppcmalccdClose' onClick={handleCloseAirdropDetails}><FaTimes className='faIcons'/></button>
                                    <h6>BIND ANY<br />CRYTO WALLET</h6>
                                    <p id='ppcmalccdStatus'>TASK 4</p>
                                    <p id='ppcmalccdDesription'>Connect your crypto wallet to seamlessly transact across any blockchain network.</p>
                                </div>
                            </div>
                            <div className="ppcmalcContent hidden">
                                <div>
                                    <h6><TbLock className='faIcons'/></h6>
                                    <p>TASK LOCKED</p>
                                </div>
                            </div>
                            <div className="ppcmalcContent hidden">
                                <div>
                                    <h6><TbLock className='faIcons'/></h6>
                                    <p>TASK LOCKED</p>
                                </div>
                            </div>
                            <div className="ppcmalcContent hidden">
                                <div>
                                    <h6><TbLock className='faIcons'/></h6>
                                    <p>TASK LOCKED</p>
                                </div>
                            </div>
                            <div className="ppcmalcContent hidden">
                                <div>
                                    <h6><TbLock className='faIcons'/></h6>
                                    <p>TASK LOCKED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ppcmAirdrop right">
                        <div className="ppcmarTitle">
                            <h5>REFERRAL LEADERBOARD</h5>
                            {/* <Link><TbArrowUpRight className="faIcons"/></Link> */}
                            <Link><TbArrowUpRight className="faIcons"/></Link>
                        </div>
                        <div className="ppcmarContainer">
                            {xeraReferralCounts.slice(0, 19).map((data, i) => (
                                <div className="ppcmarcRefLeader" key={i}>
                                    <div className="ppcmarcrlLeader">
                                        <h5>{i+1}</h5>
                                    </div>
                                    <span>
                                        {data.userBasic.display ? 
                                            <img src="" alt="" />:
                                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                        }
                                    </span>
                                    <div className='ppcmarcrlName'>
                                        <h6><TextFormatter text={`${data.userBasic.username}`} /></h6>
                                        <p><TextSlicer text={`${data.userBasic.xera_wallet}`} maxLength={18} /></p>
                                    </div>
                                    <div className='ppcmarcrlCount'>
                                        <h5><NumberFormatter number={data.referrals}/></h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile