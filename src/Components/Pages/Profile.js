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
                            </div>
                            <h6><TextSlicer text={`${xeraUserProfile.username}`} maxLength={12} /></h6>
                            <p>{xeraUserProfile.xera_wallet}</p>
                        </div>
                        <div className="prfpchead right">
                            <p id='prfpchrBal'>MY BALANCE</p>
                            <h5>0.00</h5>
                            <h6>XERA COIN</h6>
                            <div className="prfpchrStats">
                                <div id='prfpchrsPoints'>
                                    <p>Points</p>
                                    <h6>0</h6>
                                </div>
                                <div>
                                    <p>Nodes</p>
                                    <h6>0</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prfpclContents">
                        <div className='prfpclcAnnouncements'>
                            <h6>NODE AIRDROP</h6>
                            <div>
                                <a href=""><RiFacebookBoxFill className='faIcons'/></a>
                                <a href=""><RiTwitterXFill className='faIcons'/></a>
                                <a href=""><RiTiktokFill className='faIcons'/></a>
                                <a href=""><RiTelegramFill className='faIcons'/></a>
                            </div>
                        </div>
                        <hr />
                        <p></p>
                    </div>
                </div>
                <div className="profilePageContent right">

                </div>
            </section>
        </div>
    )
}

export default Profile