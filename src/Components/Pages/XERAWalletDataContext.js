import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const XERAWalletsListAPI = process.env.REACT_APP_XERA_USER_WALLETS_LIST_API;
    const XERAReferralsListAPI = process.env.REACT_APP_XERA_USER_REFERRALS_API;
    
    const LoginWallet = localStorage.getItem('myXeraAddress');
    const LoginState = localStorage.getItem('isLoggedIn');
    const LoginType = localStorage.getItem('loginState');

    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);
    const [xeraUserProfile, setXeraUserProfile] = useState([]);
    const [xeraUserReferrals, setXeraUserReferrals] = useState([]);
    const [xeraWalletsList, setXeraWalletsList] = useState([]);

    const userProfileUsername = xeraUserProfile.username

    const fetchUserList = async () => {
        try {
            const intervalId = setInterval(async () => {
                const response = await axios.get(XERACreateWalletAccountAPI);
                const userListData = response.data;
                setXeraUserList(userListData);
            }, 1000);
            
            const response = await axios.get(XERACreateWalletAccountAPI);
            const profileData = response.data.find(user => user.xera_wallet === LoginWallet);
            setXeraUserProfile(profileData);
            
            return () => clearInterval(intervalId);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchUserWalletsList = async () => {
        try {
            const intervalId = setInterval(async () => {
                const response = await axios.get(XERAWalletsListAPI);
                const userWalletsListData = response.data;
                setXeraWalletsList(userWalletsListData);
            }, 1000);
            return () => clearInterval(intervalId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUserReferralsList = async () => {
        
            try {
                const response = await axios.get(XERAReferralsListAPI);
                const userReferralsListData = response.data;
                const userTotalReferral = userReferralsListData.filter(user => user.xera_referral === userProfileUsername)
                setXeraUserReferrals(userTotalReferral);
                
            } catch (error) {
                console.error(error);
            }
        };


        fetchUserList();
        fetchUserWalletsList();
        fetchUserReferralsList();
    }, [userProfileUsername]);


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
            fetchUserList,
            xeraWalletsList,
            fetchUserWalletsList,
            xeraUserReferrals,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);