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
    const IPChecker = process.env.REACT_APP_XERA_IPINFO
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

    const fetchXERAData1 = async () => {
        setDataLoading(true);
        try {
            // Get the access token
            const tokenResponse = await axios.post(`${baseURL}/generate/access-token`, api);
            const { accessToken, success } = tokenResponse.data;
    
            if (!success) return;
    
            // Define headers for future requests
            const headers = { Authorization: `Bearer ${accessToken}` };
    
            // Perform multiple API calls concurrently
            const [usersListRes, referralsRes, rankingRes, assetTokensRes] = await Promise.all([
                axios.get(`${baseURL}/users/users-list`, { headers }),
                axios.get(`${baseURL}/users/user-task/referrals`, { headers }),
                axios.get(`${baseURL}/users/user-tasks/ranking`, { headers }),
                axios.get(`${baseURL}/token/asset-tokens`, { headers })
            ]);
    
            // Process responses
            const allUsers = usersListRes.data.data || [];
            setXeraUserList(allUsers);
            setXeraUserNumber(allUsers.length);
    
            setReferralCounts(referralsRes.data.data || []);
            setProcessedData(rankingRes.data.data || []);
            setViewXERATokenList(assetTokensRes.data.data || []);
        } catch (error) {
            console.error('Error fetching XERA data:', error);
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
    }

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
        const fetchAllData = async () => {
            try {
                setWindowReload(true); // Start the loading state
    
                // Perform all fetches and wait for results
                const fetchRequests = [
                    fetchXERAData1(),
                    fetchFollowers(),
                    fetchBalance(),
                    fetchTask(),
                ];
    
                // Wait for all requests to resolve
                const responses = await Promise.allSettled(fetchRequests);
    
                // Check for successful requests (status === "fulfilled")
                const allSuccessful = responses.every(
                    (response) => response.status === "fulfilled"
                );
    
                if (allSuccessful) {
                    // Extract data from fulfilled promises
                    const [xeraData, followers, balance, tasks] = responses.map(
                        (response) => response.value
                    );
    
                    // Set state with fetched data
                    setUserTokenBalances(balance);
                    setUserTotalFollowers(followers);
                    setuserTask(tasks);
                    // Assuming fetchXERAData1 handles its internal state update
                } else {
                    console.error("One or more requests failed:", responses);
                }
    
                // Add a slight delay to ensure data renders visually
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setWindowReload(false); // Turn off reload once all requests are resolved
            } catch (error) {
                console.error("Error during fetching data:", error);
    
                // Ensure loading is stopped even on error
                setWindowReload(false);
            }
        };
    
        // Fetch data on component load or dependency change
        fetchAllData();
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
                windowReload,
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