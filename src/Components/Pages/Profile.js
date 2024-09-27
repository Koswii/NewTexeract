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
const Profile = () => {
    const {
        LoginWallet,
        LoginState,
        LoginType,
        xeraUserProfile
    } = XERAWalletData();
    
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
                                        <h4>0 XERA</h4>
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
                                <h5>{xeraUserProfile.username}</h5>
                                <h6>{xeraUserProfile.xera_wallet}</h6>
                                <div className="prfpchrcBalance">
                                    <h3>0 XERA</h3>
                                    <p>BALANCE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profilePageContent right">

                </div>
            </section>
        </div>
    )
}

export default Profile