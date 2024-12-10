import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
    const IPChecker = process.env.REACT_APP_XERA_IPINFO
    const apikey = process.env.REACT_APP_XERA_API
    const baseURL = process.env.REACT_APP_XERA_BASE_URL_API
    const cookies = Cookies.get('authToken');

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
    const [userTask,setUserTask] = useState(null)
    const [userTotalFollowers,setUserTotalFollowers] = useState(null)
    const [usertokenBalances, setUserTokenBalances] = useState([]);
    
    const [processedData, setProcessedData] = useState([]);
    const lastFetchTimeRef = useRef(null);

    const fetchXERAData1 = async () => {
        setDataLoading(true); // Start the loading state
        try {
            const api = { apikey };

            // Perform API calls concurrently
            const apiCalls = [
                axios.post(`${baseURL}/users/users-list`, api),
                axios.post(`${baseURL}/users/user-task/referrals`, api),
                axios.post(`${baseURL}/users/user-tasks/ranking`, api),
                axios.post(`${baseURL}/token/asset-tokens`, api),
            ];

            const responses = await Promise.allSettled(apiCalls);

            const newData = {
                userList: [],
                userNumber: 0,
                referrals: [],
                ranking: [],
                tokens: [],
            };

            // Process successful responses
            responses.forEach((response, index) => {
                if (response.status === "fulfilled") {
                    const data = response.value.data.data || [];
                    switch (index) {
                        case 0: // Users list
                            newData.userList = data;
                            newData.userNumber = data.length;
                            break;
                        case 1: // Referrals
                            newData.referrals = data;
                            break;
                        case 2: // Ranking
                            newData.ranking = data;
                            break;
                        case 3: // Asset tokens
                            newData.tokens = data;
                            break;
                        default:
                            break;
                    }
                } else {
                    console.error(`Error fetching API #${index + 1}:`, response.reason);
                }
            });

            console.log("All data loaded successfully");
            saveDataToCache(newData); // Save fetched data to local storage
        } catch (error) {
            console.error("Error fetching XERA data:", error.message);
        } finally {
            setDataLoading(false); // Ensure loading state is reset
            setWindowReload(false); // Ensure window reload spinner is stopped
        }
    };

    const saveDataToCache = (data) => {
        const now = Date.now();
        const cache = {
            timestamp: now,
            data,
        };
        localStorage.setItem("xeraCache", JSON.stringify(cache));
        // Update state with the new data
        setXeraUserList(data.userList);
        setXeraUserNumber(data.userNumber);
        setReferralCounts(data.referrals);
        setProcessedData(data.ranking);
        setViewXERATokenList(data.tokens);
    };

    const loadDataFromCache = () => {
        const cache = localStorage.getItem("xeraCache");
        if (cache) {
            const { timestamp, data } = JSON.parse(cache);
            const now = Date.now();
            const tenMinutes = 5 * 60 * 1000;

            if (now - timestamp < tenMinutes) {
                // Use cached data if it's less than 10 minutes old
                // console.log("Loading data from cache");
                setXeraUserList(data.userList);
                setXeraUserNumber(data.userNumber);
                setReferralCounts(data.referrals);
                setProcessedData(data.ranking);
                setViewXERATokenList(data.tokens);
                return true; // Cache is valid
            } else {
                // console.log("Cache expired");
            }
        }
        return false; // No valid cache
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setWindowReload(true); // Ensure the spinner shows during initial load
            const cacheLoaded = loadDataFromCache(); // Try loading from cache
            if (!cacheLoaded) {
                await fetchXERAData1(); // Fetch new data if cache is invalid
            } else {
                setWindowReload(false); // Stop the spinner if cache is loaded
            }
        };

        fetchAllData(); // Run fetch logic on mount
    }, [cookies, userLoggedData]);
    
    
    const fetchTask = async () => {
        if (!cookies || !userLoggedData) {
            return; // Wait until cookies and userLoggedData are ready
        }
    
        const userWallet = { user: userLoggedData?.myXeraUsername };
        
        try {
            const res = await axios.post(`${baseURL}/users/user-tasks/all-task`, userWallet, {
                headers: { Authorization: `Bearer ${cookies}` },
            });

            setUserTask(res.data.data);
            // return res.data.data; // Return the fetched data
        } catch (error) {
            // console.error("Error fetching tasks:", error);
            return [];
        }
    }
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
            
            setUserTotalFollowers(followers);
            // return followers; // Return the fetched data
        } catch (error) {
            // console.error("Error fetching followers:", error);
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
            setUserTokenBalances((res.data.data) ? res.data.data : []);
            // return Array.isArray(res.data.data) ? res.data.data : []; 
        } catch (error) {
            // console.error("Error fetching balance:", error);
            return []; // Return an empty array in case of an error
        }
    };
    const fetchTransaction = () => {
        const api = {
            apikey: apikey,
        }
        try {
            axios.post(`${baseURL}/token/faucet-transaction`, api)
            .then((response) => {
                if (response.data.success) {
                    setTXERATransaction(response.data.data)
                }
            })
        } catch (error) {
            // console.log(error);
        }
    };
    // const checkVPN = async () => {
    //     try {
    //       const response = await axios.get(`https://api.ipregistry.co/138.199.43.146?key=ira_TTtoHRdyIhFKuyqXVYiAWP3gvOKflL3Eo34Q`);
    //       const { data } = response;
    
    //       console.log({
    //         isVPN: data.security.is_vpn,
    //         organization: data.company?.name || "N/A",
    //         location: `${data.location.city}, ${data.location.country.name}`,
    //       });
    //     } catch (err) {
    //         console.log("Unable to fetch IP information. Please check the IP address or your API key.");
    //     }
    //  };

    useEffect(() => {
        fetchFollowers();
        fetchBalance();
        fetchTask();
        fetchTransaction();
        // checkVPN() // Uncomment if required
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
                setWindowReload,
                windowReload,
                loadDataFromCache,
                fetchXERAData1,
                fetchTask,
                fetchTransaction,
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