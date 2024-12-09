import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {

    
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
    const apikey = process.env.REACT_APP_XERA_API
    const baseURL = process.env.REACT_APP_XERA_BASE_URL_API
    const cookies = Cookies.get('authToken');
    const api = {
        apikey: apikey
    }

    const [userLoggedData, setUserLogedData] = useState(null);

    useEffect(() => {
        if (cookies) {
            const userDecodedData = jwtDecode(cookies);
            setUserLogedData(userDecodedData.xeraJWT);
        }
    }, [!cookies]);

    
    

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
    const [xeraReferralCounts, setReferralCounts] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [TXERATransactions,setTXERATransaction] = useState(null)

    
    const [userTask,setuserTask] = useState(null)
    const [userTotalFollowers,setUserTotalFollowers] = useState(null)
    const [usertokenBalances, setUserTokenBalances] = useState([]);
    
    const [processedData, setProcessedData] = useState([]);

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
    };
    useEffect(() => {
        const intervalId = setInterval(async () => {
            fetchTransaction();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);


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
                        setViewXERATokenList(res.data.data);
                        setDataLoading(false);
                    })
                }else{
                    return
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setDataLoading(false);
        }
    };
    const fetchFollowers = async () => {
        if (!cookies || !userLoggedData) {
            return; // Wait until cookies and userLoggedData are ready
        }
    
        const userWallet = { user: userLoggedData?.myXeraAddress };
        try {
            const res = await axios.post(`${baseURL}/user/following`, userWallet, {
                headers: { Authorization: `Bearer ${cookies}` },
            });
            const followers = res.data.data.filter(
                (user) => user.following === userLoggedData?.myXeraUsername
            );
            return followers; // Return the fetched data
        } catch (error) {
            console.error("Error fetching followers:", error);
            return [];
        }
    };
    const fetchBalance = async () => {
        if (!cookies || !userLoggedData) {
            return; // Wait until cookies and userLoggedData are ready
        }
    
        const userWallet = { user: userLoggedData?.myXeraAddress };
        try {
            const res = await axios.post(`${baseURL}/user/balance`, userWallet, {
                headers: { Authorization: `Bearer ${cookies}` },
            });
    
            // Ensure the returned value is an array
            return Array.isArray(res.data.data) ? res.data.data : []; 
        } catch (error) {
            console.error("Error fetching balance:", error);
            return []; // Return an empty array in case of an error
        }
    };
    const fetchTask = async () => {
        if (!cookies || !userLoggedData) {
            return; // Wait until cookies and userLoggedData are ready
        }
    
        const userWallet = { user: userLoggedData?.myXeraUsername };
        try {
            const res = await axios.post(`${baseURL}/users/user-tasks/all-task`, userWallet, {
                headers: { Authorization: `Bearer ${cookies}` },
            });
            return res.data.data; // Return the fetched data
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    };
    
    
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setWindowReload(true); // Start the loading state
    
                // Perform all fetches in parallel
                const [xeraData, followers, balance, tasks] = await Promise.all([
                    fetchXERAData1(),
                    fetchFollowers(),
                    fetchBalance(),
                    fetchTask(),
                ]);
    
                // Set state for all fetched data (sequentially, ensuring state updates)
                setUserTokenBalances(balance);
                setUserTotalFollowers(followers);
                setuserTask(tasks);
                // Assuming fetchXERAData1 updates its data internally
    
                // All state updates are complete; now stop the loading state
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Add a 5000ms delay
                setWindowReload(false); // Turn off reload
            } catch (error) {
                console.error("Error fetching data:", error);
                setWindowReload(false); // Stop loading even if there's an error
            }
        };
    
        fetchAllData(); // Call the async function
    }, [cookies, userLoggedData]);


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
                fetchXERAData1,
                fetchTask,
                viewXERATransactionList,
                viewXERATokenList,
                xeraUserNumber,
                userLoggedData,
                userTotalFollowers,
                userTask,
                usertokenBalances,
                xeraUserProfile,
                viewWalletCreate, 
                setViewWalletCreate,
                viewLoginAccount, 
                setViewLoginAccount,
                viewConnectWallet, 
                setViewConnectWallet,
                xeraUserList,
                processedData,
                xeraReferralCounts,
                TXERATransactions,
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);