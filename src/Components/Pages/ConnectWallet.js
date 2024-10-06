import React, { useState, useEffect } from 'react'
import "../CSS/connectWallet.css";
import { ethers } from "ethers"; // For Ethereum connection
import Web3 from "web3";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
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
        fetchXERAData2,
    } = XERAWalletData();


    const hideConnectWallet = () => {
        setViewConnectWallet(false)
        setBindErrorResponse(false)
    }

    
    const XERAAddWalletAPI = process.env.REACT_APP_XERA_USER_ADD_WALLETS_API;
    const userWalletTask = localStorage.getItem("walletTask");

    const [walletAccount, setWalletAccount] = useState(null);
    const [ethBasedWallet, setEthBasedWallet] = useState('');
    const [avaxBasedWallet, setAvaxBasedWallet] = useState('');
    const [bscBasedWallet, setBscBasedWallet] = useState('');
    const [polBasedWallet, setPolBasedWallet] = useState('');
    const [arbBasedWallet, setArbBasedWallet] = useState('');
    const [opBasedWallet, setOpBasedWallet] = useState('');
    const [zksBasedWallet, setzksBasedWallet] = useState('');
    const [nearBasedWallet, setNearBasedWallet] = useState('');
    const [solBasedWallet, setSolBasedWallet] = useState('');
    const [walletType, setWalletType] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [bindErrorResponse, setBindErrorResponse] = useState('')



    // Function to detect and connect to MetaMask, force Ethereum Chain (ID 1) if not already connected
    const connectMetaMask = async () => {
        if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);

            // Get the current network's chain ID
            let network = await provider.getNetwork();
            const currentChainId = network.chainId;

            // Check if the user is on Ethereum network (chainId 1)
            if (currentChainId !== 1) {
            // If not Ethereum, prompt the user to switch to Ethereum (chainId 1)
                await switchToEthereumNetwork();
            }

            // Set wallet and chain data after ensuring Ethereum network
            const finalNetwork = await provider.getNetwork();
            setWalletAccount(accounts[0]);
            setWalletType("EVM Wallet (Ethereum)");
            setChainId(finalNetwork.chainId);
            submitBindWalletDetails({
                ethWallet: accounts[0],      // Pass the public key directly
            });
            // Save chain ID to localStorage
            localStorage.setItem("metaMaskChainId", finalNetwork.chainId);
            // updateWalletBasedOnNetwork(finalNetwork.chainId);
        } catch (err) {
            console.error("EVM Wallet connection failed", err);
        }
        } else {
        alert("EVM Wallet not installed!");
        }
    };

    // Function to switch the MetaMask network to Ethereum (ChainID 1)
    const switchToEthereumNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x1" }] // ChainID 1 in hexadecimal (Ethereum Mainnet)
            });
        } catch (error) {
        // Handle error if user rejects network switch
            if (error.code === 4902) {
                console.log("Ethereum network not added to MetaMask.");
            } else {
                console.error("Failed to switch to Ethereum network:", error);
            }
        }
    };
    const updateWalletBasedOnNetwork = (chainId) => {
        if (chainId === 1) {
            console.log("Ethereum Mainnet");
        } else if (chainId === 56) {
            console.log("Binance Smart Chain");
        } else if (chainId === 43114) {
            console.log("Avalanche");
        } else if (chainId === 42161) {
            console.log("Arbitrum");
        } else if (chainId === 137) {
            console.log("Polygon");
        } else if (chainId === 10) {
            console.log("Optimism");
        } else if (chainId === 324) {
            console.log("zkSync");
        } else if (chainId === 397) {
            console.log("Near Protocol");
        } else {
            console.log("Network is not yet supported");
            setWalletType("Unsupported Network");
        }
    };

    // Function to connect to Phantom (Solana)
    // Function to connect to Phantom (Solana)
    const connectPhantom = async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const solana = window.solana;
                const network = solana.networkVersion;
                const resp = await solana.connect();
                const publicKey = resp.publicKey.toString();
                
                // Set state values
                setSolBasedWallet(publicKey);
                setWalletType("Phantom (Solana)");

                // Trigger wallet binding once the Solana wallet is connected
                submitBindWalletDetails({
                    solWallet: publicKey,      // Pass the public key directly
                });
            } catch (err) {
                console.error("Phantom connection failed", err);
            }
        } else {
            alert("Phantom Wallet not installed!");
        }
    };


    // Function to detect and connect to the available wallet
    const detectAndConnectWallet = async () => {
        
        if (window.solana && window.solana.isPhantom) {
            connectPhantom();
        } else if (window.ethereum) {
            connectMetaMask();
        } else {
            alert("No supported wallet found. Please install MetaMask or Phantom.");
        }

    };
    // Handle MetaMask network (chain ID) changes
    const handleNetworkChange = (newChainId) => {
        const chainIdAsNumber = Number(newChainId); // Convert chainId to number
        setChainId(chainIdAsNumber); // Update chainId in state

        // Save the new chainId to localStorage
        localStorage.setItem("metaMaskChainId", chainIdAsNumber);

        // Update wallet information based on the new network
        updateWalletBasedOnNetwork(chainIdAsNumber);
    };

    // Load chainId from localStorage and listen for network changes
    useEffect(() => {
        const storedChainId = localStorage.getItem("metaMaskChainId");

        // Initialize chainId if stored in localStorage
        if (storedChainId) {
            const storedChainIdAsNumber = Number(storedChainId);
            setChainId(storedChainIdAsNumber);
            updateWalletBasedOnNetwork(storedChainIdAsNumber);
        }

        // Listen for MetaMask network changes
        if (window.ethereum) {
            window.ethereum.on("chainChanged", handleNetworkChange);
        }

        // Cleanup on component unmount
        return () => {
        if (window.ethereum) {
            window.ethereum.removeListener("chainChanged", handleNetworkChange);
        }
        };
    }, []);

    
    const submitBindWalletDetails = async (walletDetails) => {

        const formBindWalletDetails = {
            xeraWallet: userLoggedData.myXeraAddress,
            ethWallet: walletDetails.ethWallet || ethBasedWallet,
            solWallet: walletDetails.solWallet || solBasedWallet,
        };

        const text = JSON.stringify(formBindWalletDetails)
        console.log(text);
        

        try {
            const submitBindResponse = await axios.post(XERAAddWalletAPI, formBindWalletDetails);
            const responseMessage = submitBindResponse.data;
    
            if (responseMessage.success) {
                console.log(responseMessage.message);
                localStorage.setItem('walletTask', 'completed');
                setViewConnectWallet(false)
                fetchXERAData2();
            } else {
                console.log(responseMessage.message);
                setBindErrorResponse(responseMessage.message)
            }
    
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='navContainerConnect'>
                <div className="navContentConnectWallet">
                    <button id='closeConnectWallet' onClick={hideConnectWallet}><FaTimes className='faIcons'/></button>
                    {bindErrorResponse && 
                        <div className="nccwErrorRes">
                            <p>Error: {bindErrorResponse}</p>
                        </div>
                    }
                    <img src={require('../assets/imgs/Airdrop/binding.png')} alt="" />
                    <div className="nwccwaContainer">
                        <h5>CONNECT WALLET TO</h5>
                        <h4>TEXERACT NETWORK</h4>
                    </div>
                    {!userWalletTask && <button id='triggerConnectWallet' onClick={detectAndConnectWallet}><TbPlugConnected className='faIcons'/></button>}
                </div>
            </div>
        </>
    )
}

export default ConnectWallet