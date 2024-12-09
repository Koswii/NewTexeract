import React from 'react'
import "../CSS/nav.css";
import { 
  FaTelegramPlane,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaDiscord
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { 
  RiSearchLine,
  RiTelegram2Line,
  RiTwitterXFill,
  RiBlueskyLine,
  RiTiktokFill,
  RiFacebookFill    
} from "@remixicon/react";

const Footer = () => {
  return (
    <div className="footerContainer">
      <section className="footerContent">
        <div className="fcontent left">
          <div>
            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
            <h5>TEXERACT NETWORK</h5>
          </div>
          <p>Texeract Network was a Layer 1 blockchain network that focuses on interchain technology, eliminating its gas fees and securing transactions using a built-in Layer 2 network solution.</p>
          <div>
            <input type="text" placeholder='Your Email Address'/>
            <button>Subscribe</button>
          </div><br />
          <div>
            <a href='https://t.me/TexeractNetwork' target='blank'><RiTelegram2Line className='faIcons'/></a>
            <a href='https://t.me/TexeractNetworkCommunity' target='blank'><RiTelegram2Line className='faIcons'/></a>
            <a><RiFacebookFill className='faIcons'/></a>
            <a href='https://www.tiktok.com/@xeranetwork' target='blank'><RiTiktokFill  className='faIcons'/></a>
            <a href='https://twitter.com/TexeractNetwork' target='blank'><RiTwitterXFill className='faIcons'/></a>
            <a href='https://bsky.app/profile/texeractnetwork.bsky.social' target='blank'><RiBlueskyLine className='faIcons'/></a>
          </div>
        </div>
        <div className="fcontent right">
          <div>
            <h6>DEPLOYMENT</h6>
            <ul>
              <li><Link to="/TestnetFaucet" className='active'>TXERA Faucet</Link></li>
              <li><Link>Deploy DApp</Link></li>
              <li><Link>Mint Token</Link></li>
              <li><Link>Mint NFT</Link></li>
              <li><Link>Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h6>FEATURES</h6>
            <ul>
              <li><Link to='/Tokens' className='active'>Tokens</Link></li>
              <li><Link>DApps</Link></li>
              <li><Link>Nodes</Link></li>
              <li><Link>Wallet</Link></li>
              <li><Link>Bridge</Link></li>
              <li><Link>Marketplace</Link></li>
            </ul>
          </div>
          <div>
            <h6>RESOURCES</h6>
            <ul>
              <li><Link to='/Leaderboards' className='active'>Leaderboards</Link></li>
              <li><Link to='/Whitepaper' className='active'>Whitepaper</Link></li>
              <li><Link to='/Ecosystem' className='active'>Ecosystem</Link></li>
              <li><Link to='/Tokenomics' className='active'>Tokenomics</Link></li>
              <li><Link>XERAScan</Link></li>
              <li><Link>FAQs</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="footerContentBot">
        <p>Texeract Network || All Rights Reserve 2024</p>
      </section>
    </div>
  )
}

export default Footer;