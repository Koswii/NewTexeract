import React, { useEffect, useState } from 'react'
import "../CSS/tokens.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';
import { 
    TbSwitchHorizontal,
    TbPhotoVideo,
    TbExchange,
    TbInfoCircle,
    TbCircleCheckFilled,
    TbHourglassEmpty,
    TbLock,
    TbArrowUpRight,
    TbCube,
    TbReceiptOff,
    TbShoppingCartOff,
    TbCurrencyEthereum,
    TbCurrencySolana,  
    TbExternalLink,  
    TbSendOff,
    TbSend,  
    TbDeviceIpadDollar,
    TbCircleArrowDownLeft,
} from "react-icons/tb";


const TextSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return (
      <>{truncatedText}</>
    );
};
const Tokens = () => {
    const {
        windowReload,
        dataLoading,
        viewXERATokenList,
        fetchXERAData1
    } = XERAWalletData();
    const mainToken = viewXERATokenList.filter(token => token.token_type === 'Main')
    const testToken = viewXERATokenList.filter(token => token.token_type === 'Testnet')
    const memeToken = viewXERATokenList.filter(token => token.token_type === 'Meme')
    // Handle search input change

    // console.log(mainToken);
    
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
    const filteredTokenInfos = viewXERATokenList.filter(product => 
        product.token_name.toLowerCase().includes(searchTerm) ||
        product.token_symbol.toLowerCase().includes(searchTerm) ||
        product.token_id.toLowerCase().includes(searchTerm) ||
        product.token_type.toLowerCase().includes(searchTerm) 
    );



    return (
        <div className='mainContainer tokens'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="tokensPageContainer top">
                <div className="tokensPageContent top">
                    <div className="tknspcHeader">
                        <h4>TEXERACT NETWORK TOKENS</h4>
                        <h6>Overview of Token Minting Powered by the Texeract Network</h6>
                    </div>
                    <div className="tknspcContent">
                        <div className="tknspccSearch">
                            <input type="text" placeholder='Search any Texeract Network based token...' onChange={handleSearchChange}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tokensPageContainer mid">
                <div className="tokensPageContent mid">
                    <div className="tknpcmContents">
                        {(searchTerm && filteredTokenInfos.length > 0) ? <>
                            <h5>RESULT FOR "{searchTerm}"</h5>
                            <div className="tknpcmcTokens">
                                {filteredTokenInfos.map((data, i) => (
                                    <div key={i} className='tknpcmct'>
                                        <button><TbExternalLink className='faIcons'/></button>
                                        <div className="tknpcmctContents">
                                            <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                            <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                            <p><TextSlicer text={`${data.token_info}`} maxLength={130} /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>:<>
                            <div className="tknpcmcTokens">
                                {mainToken.map((data, i) => (
                                    <div key={i} className='tknpcmct'>
                                        <button><TbExternalLink className='faIcons'/></button>
                                        <div className="tknpcmctContents">
                                            <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                            <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                            <p><TextSlicer text={`${data.token_info}`} maxLength={130} /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h5>TESTNET TOKENS</h5>
                            <div className="tknpcmcTokens">
                                {testToken.map((data, i) => (
                                    <div key={i} className='tknpcmct'>
                                        <button><TbExternalLink className='faIcons'/></button>
                                        <div className="tknpcmctContents">
                                            <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                            <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                            <p><TextSlicer text={`${data.token_info}`} maxLength={130} /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h5>MEME TOKENS</h5>
                            <div className="tknpcmcTokens">
                                {memeToken.map((data, i) => (
                                    <div key={i} className='tknpcmct'>
                                        <button><TbExternalLink className='faIcons'/></button>
                                        <div className="tknpcmctContents">
                                            <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                            <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                            <p><TextSlicer text={`${data.token_info}`} maxLength={130} /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tokens