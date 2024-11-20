import React, { useEffect, useState, useRef } from 'react'
import "../CSS/ecosystem.css";
import { Link } from 'react-router-dom';
import { XERAWalletData } from './XERAWalletDataContext';

const Ecosystem = () => {
    const {
        windowReload
    } = XERAWalletData();
    return (
        <div className='mainContainer ecosystem'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="texeractEcosystem top">
                {/* <h2>
                TEXERACT BLOCK <br />
                ECOSYSTEM
                </h2> */}
                <div className="txeContainer1">
                <span>
                    <img id='txec1Mobile' src={require('../assets/imgs/TexeractEcosystem.png')} alt="" />
                </span>
                <div>
                    <h3>
                    ALL NEW NETWORK, <br />
                    WIDE ECOSYSTEM
                    </h3>
                    <h6>
                    Texeract Network: Revolutionizing transactions with AI and Layer-2 solutions for low fees and unmatched scalability!
                    </h6>
                    <span>
                    <a>JOIN ECOSYSTEM</a>
                    <a>SUGGEST SOLUTION</a>
                    </span>
                </div>
                <img src={require('../assets/imgs/TexeractEcosystem.png')} alt="" />
                </div>
            </section>
            <section className="texeractEcosystem mid">
                <div className="txeContainer2">
                <h4>SUPPORTED CHAINS</h4>
                <div className="txeContent2">
                    <div>
                    <img src={require('../assets/imgs/Networks/Ethereum.png')} alt="" />
                    <p>Ethereum is a layer 1 Blockchain that powers thousands of decentralized applications.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Binance.png')} alt="" />
                    <p>BNB is one of the largest blockchains in terms of transaction volume and daily active users.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Avalanche.png')} alt="" />
                    <p>Avalanche is a future-proof and developer-friendly layer 1 Blockchain protocol.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Polygon.png')} alt="" />
                    <p>Polygon is a blockchain platform which aims to create a multi-chain blockchain system compatible with Ethereum.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Solana.png')} alt="" />
                    <p>Solana is a highly scalable layer 1 Blockchain built for mass adoption.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Tron.png')} alt="" />
                    <p>TRON is an ambitious project dedicated to building the infrastructure for a truly decentralized Internet.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Polkadot.png')} alt="" />
                    <p>Polkadot is a sharded protocol that enables blockchain networks to operate together seamlessly.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Networks/Near.png')} alt="" />
                    <p>Near Protocol is a climate-neutral, high-speed & low transaction fee layer-1 blockchain protocol.</p>
                    </div>
                </div><br /><br />
                <h4>ADOPTED LAYER-2 SOLUTIONS</h4>
                <div className="txeContent2">
                    <div>
                    <img src={require('../assets/imgs/Layer2/Cartesi.png')} alt="" />
                    <p>Cartesi is an application-specific rollup protocol with a Linux runtime.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Layer2/Gosh.png')} alt="" />
                    <p>GOSH is a decentralized git and Ethereum L2 that allows you to run smart contracts for free.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Layer2/Optimism.png')} alt="" />
                    <p>Optimism is a low-cost and lightning-fast Ethereum L2 blockchain.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Layer2/Starknet.png')} alt="" />
                    <p>StarkNet, a decentralized Validity-Rollup, operates as an Ethereum Layer-2 scaling solution.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Layer2/Arbitrum.png')} alt="" />
                    <p>Arbitrum is a low-cost, layer 2 solution that is ideal for building secure Ethereum Dapps.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Layer2/ZKSync.png')} alt="" />
                    <p>zkSync is a Layer-2 protocol that scales Ethereum with cutting-edge ZK tech.</p>
                    </div>
                </div><br /><br />
                <h4>COMPATIBLE WEB3 WALLETS</h4>
                <div className="txeContent2">
                    <div>
                    <img src={require('../assets/imgs/Wallets/Metamask.png')} alt="" />
                    <p>MetaMask is a popular EVM compatible crypto wallet.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/Trust.png')} alt="" />
                    <p>Trustwallet is one of the most used multi-chain wallets in Web3.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/OKX.png')} alt="" />
                    <p>OKX Wallet is the world's most powerful crypto wallet.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/Coinbase.png')} alt="" />
                    <p>Coinbase is an EVM compatible software wallet. </p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/Zerion.png')} alt="" />
                    <p>Cryptocurrency wallet that also lets users manage their DeFi and NFT portfolios. </p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/Safepal.png')} alt="" />
                    <p>SafePal is a crypto hardware wallet, and wallet manager.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Wallets/Phantom.png')} alt="" />
                    <p>Phantom is a leading multichain crypto wallet on Solana, Ethereum, and Polygon.</p>
                    </div>
                </div><br /><br />
                <h4>INFRASTRUCTURES</h4>
                <div className="txeContent2">
                    <div>
                    <img src={require('../assets/imgs/Infrastructure/Axelar.png')} alt="" />
                    <p>Axelar delivers secure cross-chain communication.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Infrastructure/IPFS.png')} alt="" />
                    <p>IPFS is a Web3-based distributed file storage protocol.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Infrastructure/Wagmi.png')} alt="" />
                    <p>Wagmi is a collection of React hooks for Ethereum applications to build and fetch functionality from open-source functions.</p>
                    </div>
                    <div>
                    <img src={require('../assets/imgs/Infrastructure/Sepolia.png')} alt="" />
                    <p>Sepolia is a Proof-of-Stake (PoS) testnet. Currently, Sepolia is the recommended default testnet for smart contract development.</p>
                    </div>
                </div>
                </div>
                <div className="txeContainer3">
                <h6>DISCLAIMER</h6>
                <p>
                    The listed projects are part of the Texeract Network ecosystem. Being on the list doesn't mean 
                    Texeract Network has partnership, endorses or approves any specific project. The provided projects 
                    are for convenience and information; inclusion doesn't endorse project content, products, services, 
                    or opinions.
                </p>
                <p></p>
                </div>
            </section>
        </div>
    )
}

export default Ecosystem