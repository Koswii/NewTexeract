import React, { useEffect, useState, useRef } from 'react'
import "../CSS/tokenomics.css";
import { XERAWalletData } from './XERAWalletDataContext';
import { Link } from 'react-router-dom';
import { Chart } from './TokenChart';

const Tokenomics = () => {
    const {
        windowReload
    } = XERAWalletData();



    return (
        <div className='mainContainer tokenomics'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="tokenomicsPageContainer top">
                <div className="tokenomicsPageContent top">
                    <div className="tknmcspcHeader">
                        <h4>XERA COIN TOKENOMICS</h4>
                        <h6>Overview of Texeract Network's Funding and Allocation Plan.</h6>
                    </div>
                    <div className="tknmcspcChart">
                        <div className="tknmcspccCard">
                            <h5>XERA COIN</h5>
                            <h6>TOTAL ALLOCATION</h6>
                            <div className="tknmcspcccPie">
                                <Chart />
                            </div>
                            <div className="tknmcspcccContent">
                                <p>TOTAL MAX SUPPLY:</p>
                                <h6>1,000,000,000 XERA COIN</h6>
                            </div>
                        </div>
                        <div className="tknmcspccInfos">
                            <div className="tknmcspcciHeader">
                                <div className="tknmcspccihVal">
                                    <h4>0 ETH</h4>
                                    <p>Total Value in ETH</p>
                                </div>
                                <div className="tknmcspccihVal">
                                    <h4>$ 0</h4>
                                    <p>USD Value</p>
                                </div>
                                <div className='tknmcspccihDes'>
                                    <p>At Texeract Network, the allocation of XERA coins is structured to ensure long-term sustainability, growth, and value for all participants in the ecosystem. Here's how the coins are distributed:</p>
                                </div>
                            </div>
                            <div className="tknmcspcciContent">
                                <h6>PROJECT DEVELOPMENT</h6>
                                <ul>
                                    <li><p>6% (60,000,000  XERA Coins) allocated and locked for 5 years to support the project's long-term growth and sustainability.</p></li>
                                    <li><p>Developers are authorized to unlock 0.1% (1,000,000 coins) each month to maintain and enhance the project’s operations.</p></li>
                                </ul>
                                <h6>MARKETING ALLOCATION</h6>
                                <ul>
                                    <li><p>4% (40,000,000  XERA Coins) set aside for influencers and content creators to boost project awareness, engagement, and growth.</p></li>
                                </ul>
                                <h6>INVESTOR'S ALLOCATION</h6>
                                <ul>
                                    <li><p>Seed Sale: 5% (50,000,000  XERA Coins)</p></li>
                                    <li><p>Public Sale: 10% (100,000,000  XERA Coins)</p></li>
                                    <p>These allocations are designed to attract and reward early supporters and backers of the project.</p>
                                </ul>
                                <h6>COMMUNITY AIRDROP (TESTNET USERS)</h6>
                                <ul>
                                    <li><p>25% (250,000,000  XERA Coins) distributed to participants during the testnet phases as a reward for their contributions:</p></li>
                                    <ul>
                                        <li><p>Testnet Phase 1: 5% (50,000,000 XERA Coins)</p></li>
                                        <li><p>Testnet Phase 2: 10% (100,000,000 XERA Coins)</p></li>
                                        <li><p>Testnet Phase 3: 10% (100,000,000 XERA Coins)</p></li>
                                    </ul>
                                </ul>
                                <h6>MAINNET CONTRIBUTORS</h6>
                                <ul>
                                    <li><p>50% (500,000,000 coins) allocated for node and staking rewards, incentivizing active participation in securing and maintaining the network.</p></li>
                                </ul>
                                <p>Texeract Network's coin allocation strategy reflects our commitment to building a sustainable, engaging, and rewarding ecosystem for all stakeholders.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tokenomics