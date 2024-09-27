import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const XERAWalletsListAPI = process.env.REACT_APP_XERA_USER_WALLETS_LIST_API;
    const XERADisplayListAPI = process.env.REACT_APP_XERA_USER_DISPLAYS_LIST_API;
    const XERAReferralsListAPI = process.env.REACT_APP_XERA_USER_REFERRALS_API;
    
    const LoginWallet = localStorage.getItem('myXeraAddress');
    const LoginState = localStorage.getItem('isLoggedIn');
    const LoginType = localStorage.getItem('loginState');

    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);
    const [xeraUserProfile, setXeraUserProfile] = useState([]);
    const [xeraUserReferrals, setXeraUserReferrals] = useState([]);

    const fetchXERAData1 = async () => {
        try {
            // Set up intervals for the first two APIs
            const intervalId = setInterval(async () => {
                try {
                    const [userListResponse, walletsListResponse, displayListResponse] = await Promise.all([
                        axios.get(XERACreateWalletAccountAPI),
                        axios.get(XERAWalletsListAPI),
                        axios.get(XERADisplayListAPI)
                    ]);
            
                    const userListData = userListResponse.data;
                    const userWalletsListData = walletsListResponse.data;
                    const displayListData = displayListResponse.data;
            
                    // Combine data based on the same 'xera_wallet'
                    const combinedData = userListData.map(user => {
                        const userWallet = userWalletsListData.find(wallet => wallet.xera_wallet === user.xera_wallet);
                        const displayData = displayListData.find(display => display.xera_wallet === user.xera_wallet);
                        
                        return {
                            ...user,
                            wallet: userWallet ? userWallet : null, // Attach the matching wallet data
                            display: displayData ? displayData : null // Attach the matching display data
                        };
                    });
            
                    // Set the combined data to state
                    setXeraUserList(combinedData);
            
                } catch (error) {
                    console.error(error);
                }
            }, 1000);
    
            // Fetch profile data once
            const userListResponse = await axios.get(XERACreateWalletAccountAPI);
            const profileData = userListResponse.data.find(user => user.xera_wallet === LoginWallet);
            setXeraUserProfile(profileData);
    
            // Fetch referrals list
            const referralsResponse = await axios.get(XERAReferralsListAPI);
            const userReferralsListData = referralsResponse.data;
            setXeraUserReferrals(userReferralsListData);
    
            return () => clearInterval(intervalId);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        fetchXERAData1();
    }, []);


    if(
        viewWalletCreate == true ||
        viewLoginAccount == true
    ){
        window.document.body.style.overflow = 'hidden';
    } else{
        window.document.body.style.overflow = 'auto';
    }

    return (
        <XERAWalletDataContext.Provider value={{ 
            LoginWallet,
            LoginState,
            LoginType,
            xeraUserProfile,
            viewWalletCreate, 
            setViewWalletCreate,
            viewLoginAccount, 
            setViewLoginAccount,
            xeraUserList,
            xeraUserReferrals,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);