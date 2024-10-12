import React from 'react'
import "../CSS/underDevelopment.css";
import { XERAWalletData } from './XERAWalletDataContext';

const UnderDevelopment = () => {
    const {
      setViewUnderDevelopment,
    } = XERAWalletData();
    
    const handleHideUnderDevelopment = () => {
        setViewUnderDevelopment(false);
    }

    return (
        <div className="underDevelopment" onClick={handleHideUnderDevelopment}>
            <div className="udevContainer">
                <div className="udevc">
                <h4>COMING <br /> SOON</h4>
                <p>STAY CONNECTED FOR MORE UPDATES</p>
                </div>
            </div>
        </div>
    )
}

export default UnderDevelopment