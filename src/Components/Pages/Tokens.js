import React, { useEffect, useState } from 'react'
import "../CSS/tokens.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XERAWalletData } from './XERAWalletDataContext';



const Tokens = () => {
    const {
        windowReload,
        dataLoading,
        viewXERATokenList
    } = XERAWalletData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(viewXERATokenList);
    // Handle search input change
    
    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        
        const filtered = viewXERATokenList.filter(product =>
            product.token_name.toLowerCase().includes(value) ||
            product.token_symbol.toLowerCase().includes(value) ||
            product.token_id.toLowerCase().includes(value) 
        );
        
        setFilteredProducts(filtered);
        console.log(filteredProducts.length);
        
    };




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
                    <div className="tknspctContent">
                        <div className="tknspctc left">
                            <div className="tknspctclSearch">
                                <input type="text" placeholder='Search any Texeract Network based token...' onChange={handleSearchChange}/>
                                {/* <button onClick={handleSearchChange}>Search Token</button> */}
                            </div>
                            <div className="tknspctclTokens">
                                <h5>CURRENT TOKENS</h5>
                                <div className="tknspctcltCurrent">
                                    {dataLoading ? <>
                                        <div className="tknspctcltcLoading"></div>
                                        <div className="tknspctcltcLoading"></div>
                                        <div className="tknspctcltcLoading"></div>
                                        <div className="tknspctcltcLoading"></div>
                                    </>:<>
                                        {(filteredProducts.length > 0) ? <>
                                            {filteredProducts.map((data, i) => (
                                                <div className="tknspctcltc" key={i}>
                                                    <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                                    <div className="tknspctcltcInfo">
                                                        <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                                        <p>{data.token_info}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>:<>
                                            {viewXERATokenList.map((data, i) => (
                                                <div className="tknspctcltc" key={i}>
                                                    <img src={require(`../assets/imgs/TokenLogos/${data.token_logo}`)} alt="" />
                                                    <div className="tknspctcltcInfo">
                                                        <h6>{data.token_name} ({data.token_symbol}) <br /><span>{data.token_id}</span></h6>
                                                        <p>{data.token_info}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>}
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div className="tknspctc right">
                            <img id='tknspctcrrToken' src={require('../assets/imgs/TexeractCoinRealistic2.png')} alt="" />
                            <h5>XERA COIN</h5>
                            <p>
                                XERA Coin stands as the governance powerhouse of the Texeract Network, serving as the linchpin for seamless 
                                transactions and comprehensive governance. As the native coin of our network, XERA plays a pivotal role in 
                                facilitating transactions and interactions within the ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='tokensPageContainer mid'>
                <div className="tokensPageContent mid">
                    <div className="tknspcmContent">
                        <div className="tknspcmc left">

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tokens