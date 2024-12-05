import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {

    
    const apikey = process.env.REACT_APP_XERA_API
    const baseURL = process.env.REACT_APP_XERA_BASE_URL_API

    const api = {
        apikey: apikey
    }

    const [userLoggedData, setUserLogedData] = useState(null);
    const userStoredData = Cookies.get('authToken');
    const jwtDecode = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
        } catch (error) {
          throw new Error('Invalid token specified');
        }
    };

    useEffect(() => {
        if (userStoredData) {
            const userDecodedData = jwtDecode(userStoredData);
            setUserLogedData(userDecodedData.xeraJWT);
        }
    }, [!userStoredData]);

    

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
    const [xeraReferralCounts, setReferralCounts] = useState([]);
    const [xeraUserAirdrops, setXeraUserAirdrops] = useState([]);
    const [xeraUserFollowings, setXeraUserFollowings] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [TXERATransactions,setTXERATransaction] = useState(null)
    
    const [tokenBalances, setTokenBalances] = useState([]);
    const [userTotalFollowers,setUserTotalFollowers] = useState(null)

    const [processedData, setProcessedData] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            fetchTransaction();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchTransaction = () => {
        const apikey = process.env.REACT_APP_XERA_API

        const api = {
            apikey: apikey
        }

        try {
            axios.post(`${baseURL}/generate/access-token`,api)
            .then((res)=>{
                const accessToken = res.data.accessToken
                if (res.data.success) {

                    axios.get(`${baseURL}/token/faucet-transaction`,{
                        headers: {
                            "Authorization" : `Bearer ${accessToken}`
                        }
                    })
                    .then((response) => {
                        if (response.data.success) {
                            setTXERATransaction(response.data.data)
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    const fetchXERAData1 = async () => {
        setDataLoading(true)
        try {
            axios.post(`${baseURL}/generate/access-token`,api)
            .then((res)=>{
                const accessToken = res.data.accessToken
                
                if (res.data.success) {
                    axios.get(`${baseURL}/users/users-list`,{
                        headers: {
                            "Authorization" : `Bearer ${accessToken}`
                        }
                    })
                    .then((response) => {
                        const allusers = response.data.data
                        setXeraUserList(allusers)
                        setXeraUserNumber(allusers.length)
                    })

                    axios.get(`${baseURL}/users/user-task/referrals`,{
                        headers: {
                            "Authorization" : `Bearer ${accessToken}`
                        }
                    })
                    .then((response) => {
                        setReferralCounts(response.data.data);
                    })
                    
                    axios.get(`${baseURL}/users/user-tasks/ranking`,{
                        headers: {
                            "Authorization" : `Bearer ${accessToken}`
                        }
                    })
                    .then((response) => {
                        setProcessedData(response.data.data);
                    })
                    
                    axios.get(`${baseURL}/token/asset-tokens`,{
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }).then((res) => {
                        setViewXERATokenList(res.data.data)
                        setDataLoading(false)
                    })
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setDataLoading(false);
        }
    };
    const fetchBalance = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData?.myXeraAddress
        }
        axios.post(`${baseURL}/user/balance`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setTokenBalances(res.data.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    const fetchFollowers = () => {
        const cookies = Cookies.get('authToken')
        const userwallet = {
            user: userLoggedData?.myXeraAddress
        }
        axios.post(`${baseURL}/user/following`, userwallet, {
            headers: {
                'Authorization': `Bearer ${cookies}`
            }
        }).then((res) => {
            setUserTotalFollowers(res.data.data.filter(user => user.following === userLoggedData.myXeraUsername))
        }).catch((error) => {
            console.log(error);
        })
    }
    
    
    useEffect(() => {
        setWindowReload(true);
        const timeoutId = setTimeout(() => {
            setWindowReload(false);
        }, 5000);
        // fetchXERAAssets(userLoggedData);
        fetchXERAData1(userLoggedData);
        fetchBalance(userLoggedData);
        fetchFollowers(userLoggedData);
        // fetchXERAData2(userLoggedData);
        return () => clearTimeout(timeoutId);
    }, [userLoggedData]);


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
                // fetchXERAAssets,
                fetchXERAData1,
                // fetchXERAData2,
                viewXERATransactionList,
                viewXERATokenList,
                xeraUserNumber,
                userLoggedData,
                userTotalFollowers,
                tokenBalances,
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
                TXERATransactions,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);