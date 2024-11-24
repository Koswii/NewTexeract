import React, { useEffect, useState } from 'react'
import "../CSS/testnetFaucet.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    TbInfoCircle,    
} from "react-icons/tb";

const ClaimTXERA = () => {
    const {
        setViewLoginAccount,
        userLoggedData,
        // fetchXERAAssets,
        viewXERATokenList
    } = XERAWalletData();
    const TXERASendReqAPI = process.env.REACT_APP_XERA_ASSET_TXERA_SEND_API;
    const [txHash, setTxHash] = useState("");
    const [txResponse, setTxResponse] = useState("");
    const TXERAInfo = viewXERATokenList?.find(token => token.token_symbol === "TXERA") || {};
    
    const handleViewCreateWallet = () => {
        setViewLoginAccount(true);
    }
    // Function to hash data using SHA-256
    const hashData = async (data) => {
        if (!userLoggedData) {
            return;
        }
    
        const encoder = new TextEncoder();
        const toBeHashedData = {
            ...data,
            timestamp: new Date().getTime(),
            executer: userLoggedData.myXeraAddress,
        };
        const dataString = JSON.stringify(toBeHashedData); // Serialize with timestamp
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
        txLocalDate: new Date(),
    };
    
    // Hash the data on component mount
    useEffect(() => {
        if (!userLoggedData) {
            return;
        }
        hashData(formRequestTXERADetails);
    }, []); // Run once on mount
    
    const claimTXERAToken = async () => {
        
        if(!userLoggedData || !txHash){
            return;
        }
        
        const formRequestTXERADetails = {
            username: userLoggedData.myXeraUsername,
            txHash: `XERA${txHash}`,
            sender: "TXERA Faucet",
            receiver: userLoggedData.myXeraAddress,
            command: "Claim",
            amount: 1,
            token: TXERAInfo.token_symbol,
            tokenId: TXERAInfo.token_id,
        };
        // const jsonReqTXERADetails = JSON.stringify(formRequestTXERADetails);
        // console.log(jsonReqTXERADetails);

        try {
            axios
            .post(TXERASendReqAPI, formRequestTXERADetails)
            .then((res) => {
                const responseMessage = res.data;
                console.log(res);
                
                if (responseMessage.success) {
                    setTxResponse(responseMessage.message);
                    hashData(formRequestTXERADetails);
                    // fetchXERAAssets();
                    
                    const timeoutId = setTimeout(() => {
                        setTxResponse("");
                    }, 8000);
                    return () => clearTimeout(timeoutId);
    
                } else {
                    setTxResponse(responseMessage.message);
                    const timeoutId = setTimeout(() => {
                        setTxResponse("");
                    }, 8000);
                    return () => clearTimeout(timeoutId);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            
            
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            {userLoggedData ? 
                <button onClick={claimTXERAToken}>CLAIM TXERA TOKEN</button>:
                <button onClick={handleViewCreateWallet}>CLAIM TXERA TOKEN</button>
            }
            <p id='fctpctResponse'>{txResponse}</p>
        </>
    )
}

export default ClaimTXERA