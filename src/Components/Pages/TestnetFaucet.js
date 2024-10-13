import React from 'react'
import "../CSS/testnetFaucet.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';

const TestnetFaucet = () => {
  return (
    <div className='mainContainer faucet'>
        <section className="faucetPageContainer top">
            <div className="faucetPageContent top">
                <h4>TXERA FAUCET</h4>
                <div className="fctpcTop">
                    <div className="fctpct dashboard">
                        <div className="fctpctHeader">
                            <h5>RECENTLY SENT TXERA</h5>
                        </div>
                        <div className="fctpctTitle">
                            <ul>
                                <li id='fctpcttBlock'><h6>BLOCK</h6></li>
                                <li id='fctpcttHash'><h6>TX HASH</h6></li>
                                <li id='fctpcttReceiver'><h6>RECEIVER</h6></li>
                                <li id='fctpcttAmount'><h6>AMOUNT</h6></li>
                            </ul>
                        </div>
                        <div className="fctpctContainer">
                            <div className="fctpctcEmpty">
                                <span>
                                    <p>No TXERA Sent</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="fctpct mint">
                        <img src={require('../assets/imgs/TexeractCoinRealistic7.png')} alt="" />
                        <p>Each account is eligible to claim 1 TXERA tokens every 12 hours, exclusively for Airdrop tasks, DApp deployment, and future development testing.</p>
                        <button>CLAIM TXERA TOKEN</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default TestnetFaucet