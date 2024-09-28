import React, { useEffect, useState } from 'react'
import "../CSS/profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    RiFacebookBoxFill,
    RiTwitterXFill,
    RiTiktokFill,
    RiTelegramFill,
} from "react-icons/ri";
import { 
    TbSwitchHorizontal,
    TbPhotoVideo,
    TbExchange   
} from "react-icons/tb";

const TextSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return (
      <>{truncatedText}</>
    );
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
const Profile = () => {
    const {
        LoginWallet,
        LoginState,
        LoginType,
        xeraUserList,
        xeraUserProfile,
        xeraUserReferrals,
        xeraUserFollowings
    } = XERAWalletData();

    const userProfileName = xeraUserProfile.username
    const userFollowers = xeraUserList.map(user => {
        const follower = xeraUserFollowings.find(wallet => wallet.xera_wallet === user.xera_wallet);
        return {
            ...user, following: follower ? follower : ''
        }
    })
    const userTotalReferral = xeraUserReferrals.filter(user => user.xera_referral === userProfileName)
    const userTotalFollowers = userFollowers.filter(user => user.following.following === userProfileName)
    
    
    return (
        <div className='mainContainer profile'>
            <section className="profilePageContainer">
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
                                        <p>MARKET VALUE</p>
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
                                    <h5>{xeraUserProfile.username}</h5>
                                    <h6>{xeraUserProfile.xera_wallet}</h6>
                                </div>
                                <div className="prfpchrcBalance">
                                    <h3>0 XERA</h3>
                                    <p>BALANCE</p>
                                </div>
                                <div className="prfpchrcStats">
                                    <div className="prfpchrcs Followers">
                                        <p>Followers</p>
                                        <div>
                                            {userTotalFollowers.length >= 3 &&
                                                <span>
                                                    {userTotalFollowers.slice(0, 3).map((data, i) => (
                                                        <>
                                                            {data.display.xera_nft_meta ?
                                                                <img key={i} src="" alt="" />:
                                                                <img key={i} src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                                                            }
                                                        </>
                                                    ))}
                                                </span>
                                            }
                                            <h5><NumberFormatter number={userTotalFollowers.length}/></h5>
                                        </div>
                                    </div>
                                    <div className="prfpchrcs Referrals">
                                        <p>Referrals</p>
                                        <h5><NumberFormatter number={userTotalFollowers.length}/></h5>
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
                            {/* <div className="prfpcrunEmpty">
                                <p>No Nodes Available</p>
                            </div> */}
                        </>
                        <>
                            <div className="prfpcrunNode">
                                <div className="prfpcrunn left">
                                    <h6>XERA MICRO NODE</h6>
                                    <p>PHASE 1 AIRDROP REWARD</p>
                                </div>
                                <div className="prfpcrunn right">
                                    <button id='prfpcrunnrClaim'>CLAIM</button>
                                </div>
                            </div>
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
        </div>
    )
}

export default Profile