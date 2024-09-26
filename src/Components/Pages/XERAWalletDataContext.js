import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const XERAWalletsListAPI = process.env.REACT_APP_XERA_USER_WALLETS_LIST_API;
    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);
    const [xeraWalletsList, setXeraWalletsList] = useState([]);


    const fetchUserList = async () => {
        try {
            const intervalId = setInterval(async () => {
                const response = await axios.get(XERACreateWalletAccountAPI);
                const userListData = response.data;
                setXeraUserList(userListData);
            }, 10000);
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
            }, 10000);
            return () => clearInterval(intervalId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserList();
        fetchUserWalletsList();
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
            viewWalletCreate, 
            setViewWalletCreate,
            viewLoginAccount, 
            setViewLoginAccount,
            xeraUserList,
            fetchUserList,
            xeraWalletsList,
            fetchUserWalletsList
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);