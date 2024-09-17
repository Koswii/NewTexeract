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



const ContentSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <>{truncatedText}</>
  );
};
const Home = () => {
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
              <Link>Get Started</Link>
              <Link>Learn More</Link>
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
      <section className="homePageContainer mid">
        <div className="homePageContent mid1">
          <p>DEVELOPERS FROM</p>
          <div className="hmpcm1Contents">
            <img src={require('../assets/imgs/Developers/Consensys.png')} alt="" />
            <img src={require('../assets/imgs/Developers/EthereumFoundation.png')} alt="" />
            <img src={require('../assets/imgs/Developers/SolanaLabs.png')} alt="" />
            <img src={require('../assets/imgs/Developers/BinanceLabs.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Alchemy.png')} alt="" />
            <img src={require('../assets/imgs/Developers/Parity.png')} alt="" />
            <img src={require('../assets/imgs/Developers/NearProtocol.png')} alt="" />
            <img src={require('../assets/imgs/Developers/BlockGeeks.png')} alt="" />
          </div>
        </div>
        <div className="homePageContent mid2">
          {/* <img src={require('../assets/imgs/TexeractInterchain.gif')} alt="" /> */}
          {/* <h5>THE FUTURE OF INTERCHAIN TECHNOLOGY</h5>
          <p>Transact from different blockchain networks and platforms easily.</p> */}
          {/* <div className="hmpcm2Content1">

          </div>
          <div className="hmpcm2Content2">

          </div>
          <div className="hmpcm2Content3">

          </div>
          <div className="hmpcm2Content4">

          </div> */}
        </div>
      </section>
    </div>
  )
}

export default Home;