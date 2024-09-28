import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TelegramDataContext = createContext();

export const TelegramDataProvider = ({ children }) => {
    const [telegramID, setTelegramID] = useState('');
    const [telegramUsername, setTelegramUsername] = useState('');
    const [telegramStatus, setTelegramStatus] = useState('');
    const [joinedTelegram, setJoinedTelegram] = useState(false);
    const botToken = '7718108921:AAEWL7qcrnA2nwMsn1fc-rBALXie9Ulwrlw'; // Your Telegram bot token
    const chatId = '-1002441033567'; // The group or channel chat_id

    const checkTelegramMembership = async () => {
        try {
          // Ensure the user_id is a numeric ID (not username)
          if (!telegramID) {
            setJoinedTelegram(false);
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
          setJoinedTelegram(true);
          setTelegramUsername(username)
          setTelegramStatus(`User @${username} is ${memberStatus} in the group.`); // Will return 'member', 'administrator', etc.
        } catch (error) {
            console.log(telegramID);
            
            console.error('Error checking membership:', error);
            setTelegramStatus('Error or user is not in the group.');
            setJoinedTelegram(false);
        }
    };


    return (
        <TelegramDataContext.Provider value={{ 
            telegramID, 
            setTelegramID,
            checkTelegramMembership,
            telegramUsername,
            telegramStatus,
            joinedTelegram
            }}>
            {children}
        </TelegramDataContext.Provider>
    );
};

export const TelegramData = () => useContext(TelegramDataContext);