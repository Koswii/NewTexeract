import React from 'react'
import "../CSS/leaderboards.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    MdLeaderboard 
} from "react-icons/md";


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
const Leaderboards = () => {
    const {
        xeraUserNumber,
        viewConnectWallet, 
        setViewConnectWallet,
        dataLoading,
        windowReload,
        userLoggedData,
        xeraUserList,
        xeraUserProfile,
        xeraUserWallets,
        xeraUserReferrals,
        xeraReferralCounts,
        xeraUserAirdrops,
        xeraUserFollowings,
    } = XERAWalletData();


    return (
        <div className='mainContainer leaderboards'>
            <section className="leaderboardsPageContainer top">
                <div className="leaderboardsPageContent top">
                    <h4>LEADERBOARDS</h4>
                    <div className="lbrdpcTop">
                        <div className="lbrdpct participants">
                            <span>
                                <h3><NumberFormatter number={xeraUserNumber ? xeraUserNumber : 0}/></h3>
                                <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
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
                                <h6></h6>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Leaderboards