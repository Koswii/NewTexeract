import React from 'react'
import "../CSS/leaderboards.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    MdLeaderboard,
    MdGroup  
} from "react-icons/md";
import Countdown from './Countdown';


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
    return <>{(number > 0) ? <>{formatNumberToK(number)}</> : 0}</>;
};
const Leaderboards = () => {
    const {
        dataLoading,
        xeraUserNumber,
        windowReload,
        userLoggedData,
        xeraReferralCounts,
    } = XERAWalletData();
    

    return (
        <div className='mainContainer leaderboards'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="leaderboardsPageContainer top">
                <div className="leaderboardsPageContent top">
                    <h4>LEADERBOARDS</h4>
                    <div className="lbrdpcTop1">
                        <div className="lbrdpct participants">
                            <span>
                                <h3><NumberFormatter number={xeraUserNumber}/></h3>
                                <h2><MdGroup className='faIcons'/></h2>
                            </span>
                            <p>Total Participants</p>
                        </div>
                        <div className="lbrdpct user">
                            <span>
                                <h3>{userLoggedData ? '0' : '-'}</h3>
                                <h2><MdLeaderboard className='faIcons'/></h2>
                            </span>
                            <p>My Current Rank</p>
                        </div>
                        <div className="lbrdpct token">
                            <span>
                                <h3>-</h3>
                                <img src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                            </span>
                            <p>Reward Allocation</p>
                        </div>
                        <div className="lbrdpct duration">
                            <div>
                                <h6>REMAINING TIME FOR<br />AIRDROP PHASE 1 🔥</h6>
                                <p>Complete all task and claim reward after</p>
                            </div>
                            <div className='lbrdpctdCountDown'>
                                <Countdown targetDate="2024-11-20T00:00:00" />
                            </div>
                        </div>
                    </div>
                    <div className="lbrdpcTop2">
                        <div className="lbrdpct2 top1">
                            <div className='lbrdpct2t1Header'>
                                <div className='lbrdpct2t1hNFT'>
                                    <span>
                                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                    </span>
                                    <p>1</p>
                                </div>
                                <div className='lbrdpct2t1hName'>
                                    <h5>None</h5>
                                    <p>XERA---</p>
                                </div>
                            </div>
                            <div className="lbrdpct2t1Contents">
                                <div>
                                    <h4>0</h4>
                                    <p>NODES</p>
                                </div>
                                <div>
                                    <h4>0</h4>
                                    <p>POINTS</p>
                                </div>
                                <div>
                                    <h4>0</h4>
                                    <p>REFERRALS</p>
                                </div>
                            </div>
                            <div className="lbrdpct2t1Rewards">
                                <p>REWARDS</p>
                                <div>
                                    <h5>0</h5>
                                    <img src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="lbrdpct2 top2">
                            <div className='lbrdpct2ttHeader'>
                                <div className='lbrdpct2tthNFT'>
                                    <span>
                                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                    </span>
                                    <p>2</p>
                                </div>
                                <div className='lbrdpct2tthName'>
                                    <h5>None</h5>
                                    <p>XERA---</p>
                                </div>
                            </div>
                            <div className="lbrdpct2ttContents">
                                <div>
                                    <h5>0</h5>
                                    <p>NODES</p>
                                </div>
                                <div>
                                    <h5>0</h5>
                                    <p>POINTS</p>
                                </div>
                                <div>
                                    <h5>0</h5>
                                    <p>REFERRALS</p>
                                </div>
                            </div>
                            <div className="lbrdpct2ttRewards">
                                <p>REWARDS</p>
                                <div>
                                    <h5>0</h5>
                                    <img src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="lbrdpct2 top3">
                            <div className='lbrdpct2ttHeader'>
                                <div className='lbrdpct2tthNFT'>
                                    <span>
                                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                    </span>
                                    <p>3</p>
                                </div>
                                <div className='lbrdpct2tthName'>
                                    <h5>None</h5>
                                    <p>XERA---</p>
                                </div>
                            </div>
                            <div className="lbrdpct2ttContents">
                                <div>
                                    <h5>0</h5>
                                    <p>NODES</p>
                                </div>
                                <div>
                                    <h5>0</h5>
                                    <p>POINTS</p>
                                </div>
                                <div>
                                    <h5>0</h5>
                                    <p>REFERRALS</p>
                                </div>
                            </div>
                            <div className="lbrdpct2ttRewards">
                                <p>REWARDS</p>
                                <div>
                                    <h5>0</h5>
                                    <img src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="lbrdpct2 referral">
                            <h6>TOP 20 REFERRER</h6>
                            <div className="lbrdpct2rContainer">
                                {(dataLoading) ?<>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                    <div className="lbrdpct2rRefLeaderLoading">
                                        <div className="ppcmarcrlLeader"></div>
                                        <span></span>
                                        <div className="ppcmarcrlName"></div>
                                        <div className="ppcmarcrlCount"></div>
                                    </div>
                                </>:<>
                                    {xeraReferralCounts.slice(0, 20).map((data, i) => (
                                        <div className="lbrdpct2rRefLeader" key={i}>
                                            <div className="lbrdpct2Leader">
                                                <h5>{i+1}</h5>
                                            </div>
                                            <span>
                                                {(data.userBasic.display.xera_nft_meta) ? 
                                                    <img src="" alt="" />:
                                                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                }
                                            </span>
                                            <div className='lbrdpct2rName'>
                                                <h6><TextFormatter text={`${data.userBasic.username}`} /></h6>
                                                <p><TextSlicer text={`${data.userBasic.xera_wallet}`} maxLength={18} /></p>
                                            </div>
                                            <div className='lbrdpct2rCount'>
                                                <h5><NumberFormatter number={data.referrals}/></h5>
                                            </div>
                                        </div>
                                    ))}
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="leaderboardsPageContainer mid">
                <div className="leaderboardsPageContent mid">
                    <h5>GLOBAL RANKING</h5>
                    <div className="ldrbrdspcmHeader">
                        <ul>
                            <li id='ldrbrdspcmhRank'><h6>RANK</h6></li>
                            <li id='ldrbrdspcmhParticipants'><h6>PARTICIPANT</h6></li>
                            <li id='ldrbrdspcmhNodes'><h6>NODES</h6></li>
                            <li id='ldrbrdspcmhReferrals'><h6>REFERRALS</h6></li>
                            <li id='ldrbrdspcmhPoints'><h6>PONTS</h6></li>
                            <li id='ldrbrdspcmhRewards'><h6>REWARDS</h6></li>
                        </ul>
                    </div>
                    <div className="ldrbrdspcmContent">
                        <div className="ldrbrdspcmcEmpty">
                            <span>
                                <p>The Ranking has not started yet</p>
                            </span>
                        </div>
                    </div>
                    <div className="ldrbrdspcmPage">
                        <button>1</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Leaderboards