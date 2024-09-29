import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TelegramDataContext = createContext();

export const TelegramDataProvider = ({ children }) => {
    const userLoggedStorageData = localStorage.getItem('userData');
    const userLoggedData = JSON.parse(userLoggedStorageData);
    const XERAAirdropTelegramAPI = process.env.REACT_APP_XERA_USER_AIRDROP_TELEGRAM_API;
    const [telegramID, setTelegramID] = useState('');
    const [telegramUsername, setTelegramUsername] = useState('');
    const [telegramStatus, setTelegramStatus] = useState('');
    const [verifyingLoader, setVerifyingLoader] = useState(false);
    const botToken = '7718108921:AAEWL7qcrnA2nwMsn1fc-rBALXie9Ulwrlw'; // Your Telegram bot token
    const chatId = '-1002441033567'; // The group or channel chat_id



    const submitTelegramDetails = async () => {
        setVerifyingLoader(true);

        const formTelegramDetails = {
            telegramID: telegramID,
            username: userLoggedData.myXeraUsername,
            wallet: userLoggedData.myXeraAddress,
        };

        const jsonTelegramDetails = JSON.stringify(formTelegramDetails);
        console.log(jsonTelegramDetails);

        try {
            const submitAirdropTelegramResponse = await axios.post(XERAAirdropTelegramAPI, formTelegramDetails);
            const responseMessage = submitAirdropTelegramResponse.data;
    
            if (responseMessage.success) {
                // console.log(responseMessage.message);
                localStorage.setItem('telegramTask', 'completed')
                setTelegramStatus(responseMessage.message);
                setVerifyingLoader(false);
                setTelegramID('');
            } else {
                // console.log(responseMessage.message);
                setTelegramStatus(responseMessage.message);
                setVerifyingLoader(false);
            }
    
        } catch (error) {
            console.error(error);
        }
    };




    const checkTelegramMembership = async () => {
        setVerifyingLoader(true);

        try {
            // Ensure the user_id is a numeric ID (not username)
            if (!telegramID) {
                setVerifyingLoader(false);
                setTelegramStatus('User ID is required');
                return;
            }
        
            // Send a request to Telegram API to check membership
            const response = await axios.get(
                `https://api.telegram.org/bot${botToken}/getChatMember`,
                {
                params: {
                    chat_id: chatId,
                    user_id: telegramID, // Must be user_id, not username
                },
                }
            );
        
            const memberStatus = response.data.result.status;
            const username = response.data.result.user.username;
            // setJoinedTelegram(true);
            setTelegramUsername(username);
            submitTelegramDetails();
        //   setTelegramStatus(`User @${username} is ${memberStatus} in the group.`); // Will return 'member', 'administrator', etc.
        } catch (error) {
            console.log(telegramID);
            console.error('Error checking membership:', error);
            setTelegramStatus('Error or user is not in the group.');
            setVerifyingLoader(false);
        }
    };


    return (
        <TelegramDataContext.Provider value={{ 
            telegramID, 
            setTelegramID,
            checkTelegramMembership,
            telegramUsername,
            telegramStatus,
            verifyingLoader,
            }}>
            {children}
        </TelegramDataContext.Provider>
    );
};

export const TelegramData = () => useContext(TelegramDataContext);