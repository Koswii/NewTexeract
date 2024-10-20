import React, { useEffect, useState } from 'react'
import "../CSS/testnetFaucet.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    TbInfoCircle,    
} from "react-icons/tb";
import ClaimTXERA from './ClaimTXERA';


const TextSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return (
      <>{truncatedText}</>
    );
};
const TestnetFaucet = () => {
    const {
        setViewLoginAccount,
        windowReload,
        userLoggedData,
        fetchXERAAssets,
        viewXERATransactionList,
        viewXERATokenList,
    } = XERAWalletData();

    useEffect(() => {
        const intervalId = setInterval(async () => {
            fetchXERAAssets();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    
    const [viewTXERAInfo, setViewTXERAInfo] = useState(false)
    const TXERAInfo = viewXERATokenList?.find(token => token.token_symbol === "TXERA") || {};
    const TXERATransactions = viewXERATransactionList?.filter(sender => sender.sender_address === "TXERA Faucet") || {};
    
    const handleViewTXERAInfo = () => {
        setViewTXERAInfo(true);
        const timeoutId = setTimeout(() => {
            setViewTXERAInfo(false);
        }, 7000);
        return () => clearTimeout(timeoutId);
    }



    return (
        <div className='mainContainer faucet'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
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
                                {(TXERATransactions.length === 0) ? <>
                                    <div className="fctpctcEmpty">
                                        <span>
                                            <p>No TXERA Sent</p>
                                        </span>
                                    </div>
                                </>:<>
                                    {TXERATransactions.slice(0, 20).map((data, i) => (
                                        <div className="fctpctcTxDetails" key={i}>
                                            <ul>
                                                <li id='fctpctcTxBlock'><p>{data.transaction_block}</p></li>
                                                <li id='fctpctcTxHash'><p><TextSlicer text={`${data.transaction_hash}`} maxLength={40} /></p></li>
                                                <li id='fctpctcTxReceiver'><p>{data.receiver_address}</p></li>
                                                <li id='fctpctcTxAmount'><p>{data.transaction_amount} {data.transaction_token}</p></li>
                                            </ul>
                                        </div>
                                    ))}
                                </>}
                            </div>
                        </div>
                        <div className="fctpct mint">
                            <button id='fctpctTokenInfo' onClick={handleViewTXERAInfo}><TbInfoCircle className='faIcons'/></button>
                            <img id='fctpctTokenLogo' src={require('../assets/imgs/TexeractCoinRealistic7.png')} alt="" />
                            <p id='fctpctNote'>Each account is eligible to claim 1 TXERA tokens every 12 hours, exclusively for Airdrop tasks, DApp deployment, and future development testing.</p>
                            <div className="fctpctmTXERA">
                                <ClaimTXERA/>
                            </div>
                            <div className={viewTXERAInfo ? "fctpctTokenDetails active" : "fctpctTokenDetails"}>
                                <div className="fctpcttdHeader">
                                    <img src={require('../assets/imgs/TexeractCoinRealistic7.png')} alt="" />
                                    <span>
                                        <h5>Testnet XERA (TXERA)</h5>
                                        <h6>XERA0000000000</h6>
                                    </span>
                                </div>
                                <div className="fctpcttdInfo">
                                    <h6>TOKEN INFO</h6>
                                    <div className="fctpcttdi">
                                        <p><span>Token Name:</span> {TXERAInfo.token_name}</p>
                                        <p><span>Token Symbol:</span> {TXERAInfo.token_symbol}</p>
                                        <p><span>Token Decimal:</span> {TXERAInfo.token_decimal}</p>
                                        <p><span>Token Owner:</span> {TXERAInfo.token_owner}</p>
                                        <p><span>Token Supply:</span> {TXERAInfo.token_supply}</p>
                                        <p><span>Token Claimed:</span> {TXERAInfo.token_circulating} {TXERAInfo.token_symbol}</p><br />
                                        <p><span>Token Detail:</span></p>
                                        <p>{TXERAInfo.token_info}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TestnetFaucet