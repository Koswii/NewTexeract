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
            <a><FaTelegramPlane className='faIcons'/></a>
            <a><FaTelegramPlane className='faIcons'/></a>
            <a><FaFacebookF className='faIcons'/></a>
            <a><FaTwitter className='faIcons'/></a>
            <a><FaTiktok className='faIcons'/></a>
          </div>
        </div>
        <div className="fcontent right">
          <div>
            <h6>DEPLOYMENT</h6>
            <ul>
              <li><Link to="/TestnetFaucet">TXERA Faucet</Link></li>
              <li><Link>Deploy DApp</Link></li>
              <li><Link>Mint Token</Link></li>
              <li><Link>Mint NFT</Link></li>
              <li><Link>Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h6>FEATURES</h6>
            <ul>
              <li><Link>DApps</Link></li>
              <li><Link>Tokens</Link></li>
              <li><Link>Nodes</Link></li>
              <li><Link>Wallet</Link></li>
              <li><Link>Bridge</Link></li>
              <li><Link>Marketplace</Link></li>
            </ul>
          </div>
          <div>
            <h6>RESOURCES</h6>
            <ul>
              <li><Link to='/Leaderboards'>Leaderboards</Link></li>
              <li><Link>Tokenomics</Link></li>
              <li><Link>Ecosystem</Link></li>
              <li><Link>Whitepaper</Link></li>
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