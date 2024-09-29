import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const XERAWalletsListAPI = process.env.REACT_APP_XERA_USER_WALLETS_LIST_API;
    const XERADisplayListAPI = process.env.REACT_APP_XERA_USER_DISPLAYS_LIST_API;
    const XERAFollowingListAPI = process.env.REACT_APP_XERA_USER_FOLLOWING_LIST_API;
    const XERAReferralsListAPI = process.env.REACT_APP_XERA_USER_REFERRALS_API;
    const XERAAirdropListAPI = process.env.REACT_APP_XERA_USER_AIRDROP_API;
    
    const userLoggedStorageData = localStorage.getItem('userData');
    const userLoggedData = JSON.parse(userLoggedStorageData);

    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);
    const [xeraUserProfile, setXeraUserProfile] = useState([]);
    const [xeraUserReferrals, setXeraUserReferrals] = useState([]);
    const [xeraUserAirdrops, setXeraUserAirdrops] = useState([]);
    const [xeraUserFollowings, setXeraUserFollowings] = useState([]);

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
                            wallets: userWallet ? userWallet : null, // Attach the matching wallet data
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
            const profileData = userListResponse.data.find(user => user.xera_wallet === userLoggedData.userLoggedData);
            setXeraUserProfile(profileData);
    
            // Fetch referrals list
            const referralsResponse = await axios.get(XERAReferralsListAPI);
            const userReferralsListData = referralsResponse.data;
            setXeraUserReferrals(userReferralsListData);

            // Fetch airdrops list
            const airdropsResponse = await axios.get(XERAAirdropListAPI);
            const userAirdropsListData = airdropsResponse.data;
            setXeraUserAirdrops(userAirdropsListData);

            // Proceed only if data is present
            if (userAirdropsListData && userLoggedData.myXeraUsername) {
                // Filter and find based on username
                const userAirdropPhase1 = userAirdropsListData.filter(user => user.username === userLoggedData.myXeraUsername);
                const userTelegramVerify = userAirdropPhase1.find(telegram => telegram.xera_telegram_id);

                // If the condition is met, set the localStorage item
                if (userTelegramVerify) {
                localStorage.setItem('telegramTask', 'completed');
                }
            }

            

            // Fetch followings list
            const followingsResponse = await axios.get(XERAFollowingListAPI);
            const userFollowingsListData = followingsResponse.data;
            setXeraUserFollowings(userFollowingsListData);
    
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
            userLoggedData,
            xeraUserProfile,
            viewWalletCreate, 
            setViewWalletCreate,
            viewLoginAccount, 
            setViewLoginAccount,
            xeraUserList,
            xeraUserReferrals,
            xeraUserAirdrops,
            xeraUserFollowings,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);