import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERATransactionListAPI = process.env.REACT_APP_XERA_ALL_TRANSACTIONS_LIST_API;
    const XERAAssetTokenListAPI = process.env.REACT_APP_XERA_ASSET_TOKEN_LIST_API;

    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const XERAWalletsListAPI = process.env.REACT_APP_XERA_USER_WALLETS_LIST_API;
    const XERADisplayListAPI = process.env.REACT_APP_XERA_USER_DISPLAYS_LIST_API;
    const XERAFollowingListAPI = process.env.REACT_APP_XERA_USER_FOLLOWING_LIST_API;
    const XERAReferralsListAPI = process.env.REACT_APP_XERA_USER_REFERRALS_API;
    const XERAAirdropListAPI = process.env.REACT_APP_XERA_USER_AIRDROP_API;
    
    const userLoggedStorageData = localStorage.getItem('userData');
    const userLoggedData = JSON.parse(userLoggedStorageData);

    const [windowReload, setWindowReload] = useState(false);

    const [viewXERATransactionList, setViewXERATransactionList] = useState([])
    const [viewXERATokenList, setViewXERATokenList] = useState([])

    const [veiwUnderDevelopment, setViewUnderDevelopment] = useState(false);
    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [viewConnectWallet, setViewConnectWallet] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);
    const [xeraUserNumber, setXeraUserNumber] = useState([]);
    const [xeraUserProfile, setXeraUserProfile] = useState([]);
    const [xeraUsersProfiles, setXeraUsersProfiles] = useState([]);
    const [xeraUserWallets, setXeraUserWallets] = useState([]);
    // const [xeraUserReferrals, setXeraUserReferrals] = useState([]);
    const [xeraReferralCounts, setReferralCounts] = useState([]);
    const [xeraUserAirdrops, setXeraUserAirdrops] = useState([]);
    const [xeraUserFollowings, setXeraUserFollowings] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    


    const fetchXERAAssets = async () => {
        setDataLoading(true)
        try {
            // Fetch Texeract Network Transactions
            const xeraTransactions = await axios.get(XERATransactionListAPI);
            let sortedTransactions = xeraTransactions.data.sort((a, b) => 
                new Date(b.transaction_date) - new Date(a.transaction_date) // Descending order
            );
            setViewXERATransactionList(sortedTransactions);


            // Fetch XERA Token Asset
            const xeraAssetTokenRes = await axios.get(XERAAssetTokenListAPI);
            setViewXERATokenList(xeraAssetTokenRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setDataLoading(false);
        }
    }

    const fetchXERAData1 = async () => {
        setDataLoading(true)
        try {
            // Set up intervals for the first two APIs
            if (!userLoggedData) {
                const intervalId = setInterval(async () => {
                    try {
                        // const [userListResponse, walletsListResponse, displayListResponse] = await Promise.all([
                            const [userListResponse, displayListResponse] = await Promise.all([
                            axios.get(XERACreateWalletAccountAPI),
                            // axios.get(XERAWalletsListAPI),
                            axios.get(XERADisplayListAPI)
                        ]);
                
                        const userListData = userListResponse.data;

                        // const userWalletsListData = walletsListResponse.data;
                        const displayListData = displayListResponse.data;
                
                        // Combine data based on the same 'xera_wallet'
                        const combinedData = userListData.map(user => {
                            const displayData = displayListData.find(display => display.xera_wallet === user.xera_wallet);
                            return {
                                ...user,
                                display: displayData ? displayData.xera_nft_meta : null // Attach the matching display data
                            };
                        });
                
                        // Set the combined data to state
                        setXeraUserList(combinedData);
                        setXeraUsersProfiles(combinedData);
                        setXeraUserNumber(combinedData.length)

                        // Fetch airdrops list
                        const airdropsResponse = await axios.get(XERAAirdropListAPI);
                        const userAirdropsListData = airdropsResponse.data;
                        setXeraUserAirdrops(userAirdropsListData);
                        
                        const referralTaskCounts = userAirdropsListData.reduce((acc, task) => {
                            if (task.xera_task === 'Referral Task') {
                            acc[task.username] = (acc[task.username] || 0) + 1;
                            }
                            return acc;
                        }, {});

                        // Convert the result into an array of objects for display
                        const referralCountArray = Object.keys(referralTaskCounts)
                        .map(username => ({
                            username,
                            referrals: referralTaskCounts[username]
                        }))
                        .filter(user => user.referrals > 0)  // Filter out users with 0 referrals
                        .sort((a, b) => b.referrals - a.referrals); // Sort by referrals
                        const refSumDetails = referralCountArray.map(user => {
                            const userBasic = combinedData.find(ref => ref.username === user.username)
                            return {
                                ...user, userBasic
                            }
                        })
                        setReferralCounts(refSumDetails);
                        
                
                    } catch (error) {
                        console.error(error);
                    }
                }, 1000);
                
                return () => clearInterval(intervalId);
            }
    
            const [baseListResponse, displayListResponse] = await Promise.all([
                axios.get(XERACreateWalletAccountAPI),
                axios.get(XERADisplayListAPI)
            ]);
            const userListData = baseListResponse.data;
            const displayListData = displayListResponse.data;
            const combinedData = userListData.map(user => {
                const displayData = displayListData.find(display => display.xera_wallet === user.xera_wallet);
                return {
                    ...user,
                    display: displayData ? displayData.xera_nft_meta : null // Attach the matching display data
                };
            });
            
            setXeraUsersProfiles(combinedData);

            // Fetch profile data once
            const profileData = combinedData.find(user => user.xera_wallet === userLoggedData.myXeraAddress);
            setXeraUserProfile(profileData);
            setXeraUserNumber(combinedData.length);

            // Fetch followings list
            const followingsResponse = await axios.get(XERAFollowingListAPI);
            const userFollowingsListData = followingsResponse.data;
            const userFollowers = combinedData.map(user => {
                const follower = userFollowingsListData.find(wallet => wallet.xera_wallet === user.xera_wallet);
                return {
                    ...user, following: follower ? follower.following : ''
                }
            })
            setXeraUserFollowings(userFollowers);

            // Fetch airdrops list
            const airdropsResponse = await axios.get(XERAAirdropListAPI);
            const userAirdropsListData = airdropsResponse.data;
            setXeraUserAirdrops(userAirdropsListData);
            
            const referralTaskCounts = userAirdropsListData.reduce((acc, task) => {
                if (task.xera_task === 'Referral Task') {
                  acc[task.username] = (acc[task.username] || 0) + 1;
                }
                return acc;
            }, {});

            // Convert the result into an array of objects for display
            const referralCountArray = Object.keys(referralTaskCounts)
            .map(username => ({
                username,
                referrals: referralTaskCounts[username]
            }))
            .filter(user => user.referrals > 0)  // Filter out users with 0 referrals
            .sort((a, b) => b.referrals - a.referrals); // Sort by referrals
            const refSumDetails = referralCountArray.map(user => {
                const userBasic = combinedData.find(ref => ref.username === user.username)
                return {
                    ...user, userBasic
                }
            })
            setReferralCounts(refSumDetails);

            // Proceed only if data is present
            if (userAirdropsListData && userLoggedData.myXeraUsername) {
                // Filter and find based on username
                const userAirdropPhase1 = userAirdropsListData.filter(user => user.username === userLoggedData.myXeraUsername);
                const userTelegramVerify = userAirdropPhase1.find(telegram => telegram.xera_telegram_id);
                const userTwitterVerify = userAirdropPhase1.find(telegram => telegram.xera_twitter_username);

                // If the condition is met, set the localStorage item
                if (userTelegramVerify) {
                    localStorage.setItem('telegramTask', 'completed');
                }

                // If the condition is met, set the localStorage item
                if (userTwitterVerify) {
                    localStorage.setItem('twitterTask', 'pending');
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            setDataLoading(false);
        }
    };

    const fetchXERAData2 = async () => {
        if(!userLoggedData){
            return;
        }
        // Fetch profile data once
        const userWalletResponse = await axios.get(XERAWalletsListAPI);
        const profileWalletData = userWalletResponse.data.find(user => user.xera_wallet === userLoggedData.myXeraAddress);
        setXeraUserWallets(profileWalletData);
        if(profileWalletData.eth_wallet || profileWalletData.sol_wallet){
            localStorage.setItem('walletTask', 'completed');
        }
    }
    

    useEffect(() => {
        setWindowReload(true);
        const timeoutId = setTimeout(() => {
            setWindowReload(false);
        }, 5000);

        fetchXERAAssets();
        fetchXERAData1();
        fetchXERAData2();

        return () => clearTimeout(timeoutId);
    }, []);

    
    const [processedData, setProcessedData] = useState([]);
    useEffect(() => {
        const processTaskData = () => {
            const result = {};

            xeraUserAirdrops.forEach(({ username, xera_task, xera_points }) => {
                if (!result[username]) {
                result[username] = { username, totalPoints: 0, referralTaskCount: 0 };
                }
                result[username].totalPoints += Number(xera_points);
        
                // Count "Referral Task"
                if (xera_task === "Referral Task") {
                result[username].referralTaskCount += 1;
                }
            });
    
            // Convert result to an array
            let sortedData = Object.values(result).map((item) => {
                // Find the corresponding user profile from xeraUsersProfiles
                const userProfile = xeraUsersProfiles.find(
                (profile) => profile.username === item.username
                );

                // Merge the profile data with the ranking data
                return userProfile ? { ...item, ...userProfile } : null;
            });

            // Filter out entries without xera_wallet and re-sort by totalPoints
            sortedData = sortedData
                .filter((item) => item && item.xera_wallet)
                .sort((a, b) => b.totalPoints - a.totalPoints);

            // Add rank after filtering and sorting
            const rankedData = sortedData.map((item, index) => ({
                ...item,
                rank: index + 1,
            }));

            setProcessedData(rankedData);
        };
    
        processTaskData();
    }, [xeraUserAirdrops, xeraUsersProfiles]);







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
                veiwUnderDevelopment, 
                setViewUnderDevelopment,
                dataLoading,
                windowReload,
                fetchXERAAssets,
                fetchXERAData1,
                fetchXERAData2,
                viewXERATransactionList,
                viewXERATokenList,
                xeraUserNumber,
                userLoggedData,
                xeraUserProfile,
                viewWalletCreate, 
                setViewWalletCreate,
                viewLoginAccount, 
                setViewLoginAccount,
                viewConnectWallet, 
                setViewConnectWallet,
                xeraUserWallets,
                xeraUserList,
                processedData,
                xeraReferralCounts,
                xeraUserAirdrops,
                xeraUserFollowings,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);