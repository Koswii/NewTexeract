import React, { useEffect, useState } from 'react'
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
    } else if (num >= 1_000) {
      return truncateDecimal(num / 1_000, 1) + 'K';
    }
    
    return num.toString();
};
  
const NumberFormatter = ({ number }) => {
    return <>{number > 0 ? formatNumber(number) : 0}</>;
};
const Leaderboards = () => {
    const {
        dataLoading,
        windowReload,
        userLoggedData,
        xeraReferralCounts,
        processedData
    } = XERAWalletData();
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 50; // Display 50 data per page
    const myCurrentData = processedData.find(user => user.username === (userLoggedData && userLoggedData.myXeraUsername))
    const myCurrentRank = myCurrentData?.rank


    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * dataPerPage;
    const indexOfFirstItem = indexOfLastItem - dataPerPage;
    const currentData = processedData.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate total number of pages
    const totalPages = Math.ceil(processedData.length / dataPerPage);
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
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
                                <h3><NumberFormatter number={processedData.length}/></h3>
                                <h2><MdGroup className='faIcons'/></h2>
                            </span>
                            <p>Total Participants</p>
                        </div>
                        <div className="lbrdpct user">
                            <span>
                                <h3>{userLoggedData ? 
                                    <>{!dataLoading ? myCurrentRank : '-'}</> : '-'}
                                </h3>
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
                            <div className='lbrdpctdHeader'>
                                <h6>REMAINING TIME FOR<br />AIRDROP PHASE 1 🔥</h6>
                                <p>Complete all task and claim reward after</p>
                            </div>
                            <div className='lbrdpctdCountDown'>
                                <Countdown targetDate="2024-12-15T00:00:00" />
                            </div>
                        </div>
                    </div>
                    <div className="lbrdpcTop2">
                        {processedData.slice(0, 1).map((data, i) => (
                            <div className="lbrdpct2 top1" key={i}>
                                <div className='lbrdpct2t1Header'>
                                    <div className='lbrdpct2t1hNFT'>
                                        <span>
                                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                        </span>
                                        <p>{data?.rank}</p>
                                    </div>
                                    <div className='lbrdpct2t1hName'>
                                        <h5><TextFormatter text={`${data?.username}`} /></h5>
                                        <p><TextSlicer text={`${data?.xera_wallet}`} maxLength={25} /></p>
                                    </div>
                                </div>
                                <div className="lbrdpct2t1Contents">
                                    <div>
                                        <h4>0</h4>
                                        <p>NODES</p>
                                    </div>
                                    <div>
                                        <h4><NumberFormatter number={data?.referralTaskCount}/></h4>
                                        <p>REFERRALS</p>
                                    </div>
                                    <div>
                                        <h4><NumberFormatter number={data?.totalPoints}/></h4>
                                        <p>XP POINTS</p>
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
                        ))}
                        {processedData.slice(1, 2).map((data, i) => (
                            <div className="lbrdpct2 top2" key={i}>
                                <div className='lbrdpct2ttHeader'>
                                    <div className='lbrdpct2tthNFT'>
                                        <span>
                                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                        </span>
                                        <p>{data?.rank}</p>
                                    </div>
                                    <div className='lbrdpct2tthName'>
                                        <h5><TextFormatter text={`${data?.username}`} /></h5>
                                        <p><TextSlicer text={`${data?.xera_wallet}`} maxLength={15} /></p>
                                    </div>
                                </div>
                                <div className="lbrdpct2ttContents">
                                    <div>
                                        <h5>0</h5>
                                        <p>NODES</p>
                                    </div>
                                    <div>
                                        <h5><NumberFormatter number={data?.referralTaskCount}/></h5>
                                        <p>REFERRALS</p>
                                    </div>
                                    <div>
                                        <h5><NumberFormatter number={data?.totalPoints}/></h5>
                                        <p>XP POINTS</p>
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
                        ))}
                        {processedData.slice(2, 3).map((data, i) => (
                            <div className="lbrdpct2 top3" key={i}>
                                <div className='lbrdpct2ttHeader'>
                                    <div className='lbrdpct2tthNFT'>
                                        <span>
                                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                        </span>
                                        <p>{data?.rank}</p>
                                    </div>
                                    <div className='lbrdpct2tthName'>
                                        <h5><TextFormatter text={`${data?.username}`} /></h5>
                                        <p><TextSlicer text={`${data?.xera_wallet}`} maxLength={15} /></p>
                                    </div>
                                </div>
                                <div className="lbrdpct2ttContents">
                                    <div>
                                        <h5>0</h5>
                                        <p>NODES</p>
                                    </div>
                                    <div>
                                        <h5><NumberFormatter number={data?.referralTaskCount}/></h5>
                                        <p>REFERRALS</p>
                                    </div>
                                    <div>
                                        <h5><NumberFormatter number={data?.totalPoints}/></h5>
                                        <p>XP POINTS</p>
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
                        ))}
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
                                                {(data?.xera_nft_meta) ? 
                                                    <img src="" alt="" />:
                                                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                }
                                            </span>
                                            <div className='lbrdpct2rName'>
                                                <h6><TextFormatter text={`${data?.username}`} /></h6>
                                                <p><TextSlicer text={`${data?.xera_wallet}`} maxLength={18} /></p>
                                            </div>
                                            <div className='lbrdpct2rCount'>
                                                <h5><NumberFormatter number={data?.count}/></h5>
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
                    <div className="leaderboardspcm">
                        <div className="ldrbrdspcmHeader">
                            <ul>
                                <li id='ldrbrdspcmhRank'><h6>RANK</h6></li>
                                <li id='ldrbrdspcmhParticipants'><h6>PARTICIPANT</h6></li>
                                <li id='ldrbrdspcmhNodes'><h6>NODES</h6></li>
                                <li id='ldrbrdspcmhReferrals'><h6>REFERRALS</h6></li>
                                <li id='ldrbrdspcmhPoints'><h6>POINTS</h6></li>
                                <li id='ldrbrdspcmhRewards'><h6>REWARDS</h6></li>
                            </ul>
                        </div>
                        <div className="ldrbrdspcmContent">
                            {(dataLoading) ?
                                <div className="ldrbrdspcmcEmpty">
                                    <span>
                                        <p>Retrieving Latest Rankings...</p>
                                    </span>
                                </div>:<>
                                    {currentData.map((data, i) => (
                                        <ul key={i}>
                                            <li id='ldrbrdspcmcRank'><p>{data?.rank}</p></li>
                                            <li id='ldrbrdspcmcParticipant'>
                                                <span>
                                                    {(data?.display) ? 
                                                        <img src="" alt="" />:
                                                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                    }
                                                </span>
                                                <div>
                                                    <h6><TextFormatter text={`${data?.username}`} /></h6>
                                                    <p>{data?.xera_wallet}</p>
                                                </div>
                                            </li>
                                            <li id='ldrbrdspcmcNode'><p>0</p></li>
                                            <li id='ldrbrdspcmcReferral'><p>{data?.referralTaskCount}</p></li>
                                            <li id='ldrbrdspcmcPoints'><p>{data?.totalPoints} XP</p></li>
                                            <li id='ldrbrdspcmcRewards'><p>0 XERA</p></li>
                                        </ul>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                    <div className="ldrbrdspcmPage">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button className={currentPage === index + 1 ? 'active' : ''} key={index + 1} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Leaderboards