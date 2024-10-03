import React, { useState, useEffect } from 'react'
import "../CSS/connectWallet.css";
import { ethers } from "ethers"; // For Ethereum connection
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"; // For Solana connection
import axios from 'axios';
import { 
    FaTimes
} from 'react-icons/fa';
import { 
    TbPlugConnected      
} from "react-icons/tb";
import { XERAWalletData } from '../Pages/XERAWalletDataContext';




const ConnectWallet = () => {
    const {
        userLoggedData,
        setViewConnectWallet,
    } = XERAWalletData();


    const hideConnectWallet = () => {
        setViewConnectWallet(false)
    }


    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [network, setNetwork] = useState(""); // 'Ethereum' or 'Solana'

    const connectEthereumWallet = async () => {
        if (window.ethereum) {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            setWalletAddress(walletAddress);
            console.log(walletAddress);
            
            setNetwork("Ethereum");
            const balance = await provider.getBalance(walletAddress);
            setBalance(ethers.formatEther(balance));
          } catch (err) {
            console.error("Ethereum wallet connection failed", err);
          }
        } else {
          alert("MetaMask not detected. Please install it.");
        }
    };
    
    // Detect and connect to Solana wallet (e.g., Phantom)
    const connectSolanaWallet = async () => {
        if (window.solana && window.solana.isPhantom) {
          try {
            const resp = await window.solana.connect();
            setWalletAddress(resp.publicKey.toString());
            console.log(resp.publicKey.toString());
            
            setNetwork("Solana");
            getSolanaBalance(resp.publicKey);
          } catch (err) {
            console.error("Phantom wallet connection failed", err);
          }
        } else {
          alert("Phantom Wallet not detected. Please install it.");
        }
    };
    
    // Fetch Solana wallet balance
    const getSolanaBalance = async (publicKey) => {
        const connection = new Connection(clusterApiUrl("devnet")); // Use 'mainnet-beta' for production
        const balance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balance / 1e9); // Convert lamports to SOL
    };
    
    // Automatically detect which wallet to connect to
    const detectWallet = () => {
        if (window.solana && window.solana.isPhantom) {
          // If Phantom (Solana) is detected
          connectSolanaWallet();
        } else if (window.ethereum) {
          // If MetaMask (Ethereum) is detected
          connectEthereumWallet();
        } else {
          alert("No supported wallet found. Please install MetaMask or Phantom.");
        }
    };
    
    // Handle account changes
    useEffect(() => {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", () => connectEthereumWallet());
        }
        if (window.solana && window.solana.isPhantom) {
          window.solana.on("accountChanged", () => connectSolanaWallet());
        }
    }, []);
    




    return (
        <>
            <div className='navContainerConnect'>
                <div className="navContentConnectWallet">
                    <button id='closeConnectWallet' onClick={hideConnectWallet}><FaTimes className='faIcons'/></button>
                    <img src={require('../assets/imgs/Airdrop/binding.png')} alt="" />
                    <div className="nwccwaContainer">
                        <h5>CONNECT WALLET TO</h5>
                        <h4>TEXERACT NETWORK</h4>
                    </div>
                    <button id='triggerConnectWallet' onClick={detectWallet}><TbPlugConnected className='faIcons'/></button>
                </div>
            </div>
        </>
    )
}

export default ConnectWallet