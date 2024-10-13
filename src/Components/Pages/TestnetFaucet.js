import React, { useEffect, useState } from 'react'
import "../CSS/testnetFaucet.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    TbInfoCircle,    
} from "react-icons/tb";



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

    
    const TXERASendReqAPI = process.env.REACT_APP_XERA_ASSET_TXERA_SEND_API;
    const [viewTXERAInfo, setViewTXERAInfo] = useState(false)
    const [txHash, setTxHash] = useState("");
    const [txResponse, setTxResponse] = useState("");
    const TXERAInfo = viewXERATokenList?.find(token => token.token_symbol === "TXERA") || {};
    const TXERATransactions = viewXERATransactionList?.filter(sender => sender.sender_address === "TXERA Faucet") || {};


    const handleViewCreateWallet = () => {
        setViewLoginAccount(true);
    }
    const handleViewTXERAInfo = () => {
        setViewTXERAInfo(true);
        const timeoutId = setTimeout(() => {
            setViewTXERAInfo(false);
        }, 7000);
        return () => clearTimeout(timeoutId);
    }


    // Function to hash data using SHA-256
    const hashData = async (data) => {
        if(!userLoggedData){
            return;
        }

        const encoder = new TextEncoder();
        const dataString = JSON.stringify(data); // Serialize to string
        const encodedData = encoder.encode(dataString); // Convert to Uint8Array

        // Use Web Crypto API to generate the hash
        const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert to byte array
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert to hex string

        setTxHash(hashHex); // Store the hash in state
    };
    const formRequestTXERADetails = {
        txBlock: "Genesis",
        sender: "TXERA Faucet",
        receiver: userLoggedData ? userLoggedData.myXeraAddress : '',
        command: "Claim",
        amount: 1,
        token: TXERAInfo.token_symbol,
        tokenId: TXERAInfo.token_id,
        validator: "XERA Validator",
        txLocalDate: new Date()
    };
    // Hash the data on component mount
    useEffect(() => {
        if(!userLoggedData){
            return;
        }
        hashData(formRequestTXERADetails);
    }, []); // Run once on mount
    const claimTXERAToken = async () => {
        if(!userLoggedData){
            return;
        }

        const formRequestTXERADetails = {
            txBlock: "Genesis",
            txHash: `XERA${txHash}`,
            sender: "TXERA Faucet",
            receiver: userLoggedData.myXeraAddress,
            command: "Claim",
            amount: 1,
            token: TXERAInfo.token_symbol,
            tokenId: TXERAInfo.token_id,
            validator: "XERA Validator",
        };

        // const jsonReqTXERADetails = JSON.stringify(formRequestTXERADetails);
        // console.log(jsonReqTXERADetails);

        try {
            const submitTXERARequest = await axios.post(TXERASendReqAPI, formRequestTXERADetails);
            const responseMessage = submitTXERARequest.data;
    
            if (responseMessage.success) {
                setTxResponse(responseMessage.message);
                fetchXERAAssets();
                const timeoutId = setTimeout(() => {
                    setTxResponse("");
                }, 5000);
                return () => clearTimeout(timeoutId);
            } else {
                setTxResponse(responseMessage.message);
                const timeoutId = setTimeout(() => {
                    setTxResponse("");
                }, 5000);
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='mainContainer faucet'>
            {windowReload && <div className="profileReload">
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>}
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
                                {/* <div className="fctpctcEmpty">
                                    <span>
                                        <p>No TXERA Sent</p>
                                    </span>
                                </div> */}
                                {TXERATransactions.map((data, i) => (
                                    <div className="fctpctcTxDetails" key={i}>
                                        <ul>
                                            <li id='fctpctcTxBlock'><p>{data.transaction_block}</p></li>
                                            <li id='fctpctcTxHash'><p><TextSlicer text={`${data.transaction_hash}`} maxLength={40} /></p></li>
                                            <li id='fctpctcTxReceiver'><p>{data.receiver_address}</p></li>
                                            <li id='fctpctcTxAmount'><p>{data.transaction_amount} {data.transaction_token}</p></li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="fctpct mint">
                            <button id='fctpctTokenInfo' onClick={handleViewTXERAInfo}><TbInfoCircle className='faIcons'/></button>
                            <img id='fctpctTokenLogo' src={require('../assets/imgs/TexeractCoinRealistic7.png')} alt="" />
                            <p id='fctpctNote'>Each account is eligible to claim 1 TXERA tokens every 12 hours, exclusively for Airdrop tasks, DApp deployment, and future development testing.</p>
                            {userLoggedData ? 
                                <button id='claimTXERA' onClick={claimTXERAToken}>CLAIM TXERA TOKEN</button>:
                                <button id='claimTXERA' onClick={handleViewCreateWallet}>CLAIM TXERA TOKEN</button>
                            }
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
                                        <p><span>Token Owner:</span> {TXERAInfo.token_owner}</p>
                                        <p><span>Token Supply:</span> {TXERAInfo.token_supply}</p>
                                        <p><span>Circulating Supply:</span> {TXERAInfo.token_circulating} {TXERAInfo.token_symbol}</p>
                                        <p><span>Token Info:</span></p>
                                        <p>{TXERAInfo.token_info}</p>
                                    </div>
                                </div>
                            </div>
                            <p id='fctpctResponse'>{txResponse}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TestnetFaucet