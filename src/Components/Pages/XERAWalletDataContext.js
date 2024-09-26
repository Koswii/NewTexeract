import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const XERAWalletDataContext = createContext();

export const XERAWalletDataProvider = ({ children }) => {
    const XERACreateWalletAccountAPI = process.env.REACT_APP_XERA_USER_LIST_API;
    const [viewWalletCreate, setViewWalletCreate] = useState(false);
    const [viewLoginAccount, setViewLoginAccount] = useState(false);
    const [xeraUserList, setXeraUserList] = useState([]);


    const fetchUserList = async () => {
        try {
            // const intervalId = setInterval(async () => {
                const response = await axios.get(XERACreateWalletAccountAPI);
                const userListData = response.data;
                setXeraUserList(userListData);
                console.log(userListData);
                
            // }, 1000);
            // return () => clearInterval(intervalId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserList();
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
            fetchUserList
            }}>
            {children}
        </XERAWalletDataContext.Provider>
    );
};

export const XERAWalletData = () => useContext(XERAWalletDataContext);