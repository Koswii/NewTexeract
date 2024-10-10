import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import learnAbout from "../JSON/learnAbout.json"
import LandingLights from "../assets/vids/TexeractBGLights.mp4"
import { 
  RiSearchLine
} from "react-icons/ri";
import { 
  TbCircleArrowLeft,
  TbCircleArrowRight
} from "react-icons/tb";
import { 
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";
import { XERAWalletData } from './XERAWalletDataContext';



const ContentSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <>{truncatedText}</>
  );
};
const ScrambleText = ({ targetText, scrambleSpeed = 80, revealSpeed = 200 }) => {
    const [scrambledText, setScrambledText] = useState([]);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  
    useEffect(() => {
      const lines = targetText.split('\n'); // Split text by line breaks
      const scrambleLines = lines.map(() => ''); // Initialize scrambled text for each line
      let iteration = 0;
  
      const scrambleInterval = setInterval(() => {
        setScrambledText((prev) => {
          return lines.map((line, index) => {
            const progress = iteration / (targetText.length * 2);
            const scrambled = line
              .split('')
              .map((char, i) => (i < progress * line.length ? char : characters[Math.floor(Math.random() * characters.length)]))
              .join('');
            return scrambled;
          });
        });
  
        iteration++;
        if (iteration > targetText.length * 2) clearInterval(scrambleInterval);
      }, scrambleSpeed);
  
      return () => clearInterval(scrambleInterval);
    }, [targetText, scrambleSpeed]);

    return <h6 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1vw', fontWeight: '700', color: 'white',textAlign: 'left', whiteSpace: 'pre-line' }}>{scrambledText.join('\n')}</h6>;
};
const formatNumberToK = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
  }
  return num.toString();
};
const NumberFormatter = ({ number }) => {
  return <>{formatNumberToK(number)}</>;
};
const Home = () => {
  const {
    xeraUserNumber,
    userLoggedData,
    setViewWalletCreate
  } = XERAWalletData();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [viewXERATopics, setViewXERATopics] = useState(false)
  const [viewTopicContent, setViewTopicContent] = useState(null)
  const [viewActiveContent, setViewActiveContent] = useState(false)


  const handleViewXERATopics = () => {
    setViewXERATopics(true)
  }
  const handleHideXERATopics = () => {
    setViewXERATopics(false)
  }
  const handleViewFullInfo = (infoTitle) => {
    const fullInfo = learnAbout.find(topic => topic.Title === infoTitle)
    setViewTopicContent(fullInfo ? fullInfo.Content : null);
    setViewActiveContent(fullInfo.Title);
  }

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredTopics = learnAbout.filter(topic => 
    topic.Title.toLowerCase().includes(searchTerm)
  );

  // console.log(learnAbout);

  const handleViewCreateWallet = () => {
    setViewWalletCreate(true)
  }
  


  return (
    <div className='mainContainer home'>
      <section className="homePageContainer top">
        {/* <div className="homePageContentBG">
          <video autoPlay muted loop>
            <source src={LandingLights} type="video/mp4" />
          </video>
        </div> */}
        <div className="homePageContent top1">
          <div className="homePCTop1">
            <img src={require('../assets/imgs/TEXERACTLanding.png')} alt="" />
            <h5>TEXERACT NETWORK</h5>
            <p>THE BLOCK FOR INTERCHAIN SPACE</p>
            <div className="homepct1Btns">
              {!userLoggedData ? 
                <Link onClick={handleViewCreateWallet}>Get Started</Link>:
                <Link to={`/p/${userLoggedData.myXeraAddress}`}>Get Started</Link>
              }
              <Link onClick={handleViewXERATopics}>Learn More</Link>
            </div>
          </div>
          <div className="homepct1LearnContainer">
            <div className={viewXERATopics ? "homepct1Learn active" : "homepct1Learn"}>
              <div className="hmpct1lSearch">
                <h6><RiSearchLine className='faIcons'/></h6>
                <input type="text" placeholder='Learn about Texeract Network' value={searchTerm} onChange={handleSearchChange}/>
              </div>
              {(!searchTerm || !filteredTopics.length) ? <>
                <h5>Suggested Topics</h5>
                <div className="hmpct1lContainer">
                  {learnAbout.slice(0, 6).map((data, i) => (
                    <div className={(viewActiveContent === data.Title) ? "hmpct1lContents active" : "hmpct1lContents"} key={i} onClick={() => handleViewFullInfo(data.Title)}>
                      <h6>{data.Title}</h6>
                      <p>
                        {viewTopicContent && viewTopicContent === data.Content ? (
                          data.Content
                        ) : (
                          <ContentSlicer text={data.Content} maxLength={80} />
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </>:<>
                <div className="hmpct1lContainer">
                  {filteredTopics.slice(0, 10).map((data, i) => (
                    <div className={(viewActiveContent === data.Title) ? "hmpct1lContents active" : "hmpct1lContents"} key={i} onClick={() => handleViewFullInfo(data.Title)}>
                      <h6>{data.Title}</h6>
                      <p>
                        {viewTopicContent && viewTopicContent === data.Content ? (
                          data.Content
                        ) : (
                          <ContentSlicer text={data.Content} maxLength={80} />
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </>}
            </div>
            {!viewXERATopics ? 
              <button onClick={handleViewXERATopics}><FaAngleDoubleRight className='faIcons'/></button>:
              <button onClick={handleHideXERATopics}><FaAngleDoubleLeft className='faIcons'/></button>}
          </div>
          <div className="homepct1ShortDescription">
            <h6>
              THE INTERCHAIN SOLUTION <br /><br />
              <span>
                Enjoy instant, fee-free, and secure fund transfers within or outside the chain, providing a 
                swift solution to the hurdles of traditional transactions.
              </span>
            </h6>
            <hr />
          </div>
        </div>
      </section>
      <section className="homePageContainer mid1">
        <div className="homePageContent mid1">
          <p>DEVELOPERS FROM</p>
          <div className="hmpcm1Contents">
            <img src={require('../assets/imgs/Developers/EthereumFoundation.png')} alt="" />
            <img src={require('../assets/imgs/Developers/SolanaLabs.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Optimism.png')} alt="" />
            <img src={require('../assets/imgs/Developers/BinanceLabs.png')} alt="" />
            <img src={require('../assets/imgs/Developers/NearProtocol.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Consensys.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Alchemy.png')} alt="" />
            <img src={require('../assets/imgs/Developers/IBCProtocol.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Parity.png')} alt="" />
            <img src={require('../assets/imgs/Developers/BlockGeeks.png')} alt="" />
          </div>
        </div>
      </section>
      <section className="homePageContainer mid234">
        <div className="homePageContent mid2">
          <div className="hpcm2Contents left">
              <h4>EMPOWERING THE MULTIVERSE OF BLOCKCHAINS</h4>
              <h6>SCALABLE SOLUTION ACROSS BLOCKCHAIN NETWORKS</h6>
              <p>
                Texeract Network integrates the Inter-Blockchain Communication (IBC) Protocol, 
                allowing seamless asset and data transfers between independent, decentralized 
                blockchains. This breakthrough enables users to exchange value freely across 
                multiple blockchain ecosystems.
              </p>
          </div>
          <div className="hpcm2Contents right">
            <img src={require('../assets/imgs/TexeractEcosystem.png')} alt="" />
          </div>
        </div>
        <div className="homePageContent mid3">
          <div className="hpcm3Contents left">
            <div className="hpcm3cl wallet">
              <span><p>COMING SOON</p></span>
              <img src={require('../assets/imgs/TexeractBox4.png')} alt="" />
              <div>
                <Link><h5>BRIDGE COIN</h5></Link>
                <p>Bridge any coin and get gas fee rebates, giving you more value with every transaction.</p>
              </div>
            </div>
            <div className="hpcm3cl bridge">
              <span><p>COMING SOON</p></span>
              <img id='hpcm3clMint' src={require('../assets/imgs/TexeractBox8.png')} alt="" />
              <div>
                <Link><h5>MINT TOKEN</h5></Link>
                <p>Token minting made easy by just giving only the details and then the token allocation.</p>
              </div>
            </div>
          </div>
          <div className="hpcm3Contents right">
            <h6>SCALE YOUR VISION: DEPLOY DAPPS FROM THE ASSETS YOU CONTROL</h6>
            <p>Maximize your investment by turning your existing resources into powerful applications that grow with you—no need for costly new assets. Take full control of your project's future and deploy faster, smarter, and bigger.</p>
            <div>
              <Link>Deploy DApp</Link>
              <Link>Documentations</Link>
              <Link>DApps</Link>
            </div>
          </div>
        </div>
        <div className="homePageContent mid4">
          <div className="hpcm4Contents left">
              <img src={require('../assets/imgs/TexeractWallet.png')} alt="" />
          </div>
          <div className="hpcm4Contents right">
              <h4>SIMPLIFY YOUR CRYPTO JOURNEY</h4>
              <h6>BROWSER-BASED BLOCKCHAIN WALLET FOR ALL</h6>
              <p>
                Access your blockchain wallet from any browser, without the need for extensions or installations. Enjoy a seamless, secure, and user-friendly experience designed for everyone—whether you're a crypto beginner or a seasoned expert.
              </p>
          </div>
        </div>
      </section>
      <section className="homePageContainer mid5">
        <div className="homePageContent mid5">
          <span>
            <h4>1000</h4>
            <p>Sepolia Testnet<br />Participants</p>
          </span>
          <span>
            <h4><NumberFormatter number={xeraUserNumber}/></h4>
            <p>XERA Wallet<br />Created</p>
          </span>
          <span>
            <h4>8</h4>
            <p>Supported <br />Networks</p>
          </span>
          <span>
            <h4>4</h4>
            <p>Upcoming DApp<br />Projects</p>
          </span>
        </div>
      </section>
      <section className="homePageContainer mid6">
        <div className="homePageContent mid6">
          <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
          <h5>STAY CONNECTED FOR MORE UPDATES</h5>
          <p>AIRDROP ON-GOING</p>
        </div>
      </section>
    </div>
  )
}

export default Home;