import React, { useEffect, useState, useRef } from 'react'
import "../CSS/whitepaper.css";
import { XERAWalletData } from './XERAWalletDataContext';
import { Link } from 'react-router-dom';
import { 
  RiArrowDownSFill,
  RiArrowUpSFill 
} from "react-icons/ri";

const Whitepaper = () => {
    const {
        windowReload
    } = XERAWalletData();
    const [viewWhat, setViewWhat] = useState(true)
    const [veiwFork, setViewFork] = useState(false)
    const [viewObjestive, setViewObjective] = useState(false)
    const [viewL2Solution, setViewL2Solution] = useState(false)
    const [viewXERA, setViewXERA] = useState(false)
    const [viewRoadmap, setViewRoadmap] = useState(false)
    const [viewConsensus, setViewConsensus] = useState(false)
    const [viewEVMCompatibility, setViewEVMCompatibility] = useState(false)
    const [AIVerify, setViewAIVerify] = useState(false)

    const [viewMobNavWP, setViewMobNavWP] = useState(false)



    const handleViewWhat = () => {
        setViewWhat(true)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewFork = () => {
        setViewWhat(false)
        setViewFork(true)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewObjective = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(true)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewL2Solution = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(true)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewXERA = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(true)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewRoadmap = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(true)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewConsensus = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(true)
        setViewEVMCompatibility(false)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewEVMCompatibility = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(true)
        setViewAIVerify(false)
        setViewMobNavWP(false)
    }
    const handleViewAIVerify = () => {
        setViewWhat(false)
        setViewFork(false)
        setViewObjective(false)
        setViewL2Solution(false)
        setViewXERA(false)
        setViewRoadmap(false)
        setViewConsensus(false)
        setViewEVMCompatibility(false)
        setViewAIVerify(true)
        setViewMobNavWP(false)
    }
    const handleMobileNav = () => {
        setViewMobNavWP(true)
    }
    const handleCloseMobileNav = () => {
        setViewMobNavWP(false)
    }

    return (
        <div className='mainContainer whitepaper'>
            <div className={windowReload ? "profileReload active" :  "profileReload disable"}>
                <div>
                    <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                </div>
            </div>
            <section className="texeractWhitepaper">
                <div className="txrdContainer left">
                    <button className='mainBtns'><h6>TEXERACT NETWORK <RiArrowDownSFill className='faIcons'/></h6></button>
                    <div>
                        <button onClick={handleViewWhat} className={viewWhat ? 'active' : ''}><p>What is Texeract Network ?</p></button>
                        <button onClick={handleViewFork} className={veiwFork ? 'active' : ''}><p>Is it Ethereum Fork?</p></button>
                        <button onClick={handleViewObjective} className={viewObjestive ? 'active' : ''}><p>Texeract Network: The Objectives</p></button>
                        <button onClick={handleViewXERA} className={viewXERA ? 'active' : ''}><p>Texeract Network: XERA Coin</p></button>
                        <button onClick={handleViewRoadmap} className={viewRoadmap ? 'active' : ''}><p>Texeract Network: Roadmap</p></button>
                        <button onClick={handleViewL2Solution} className={viewL2Solution ? 'active' : ''}><p>Texeract Network: Layer 2 Solution</p></button>
                        <button onClick={handleViewConsensus} className={viewConsensus ? 'active' : ''}><p>Technology Mechanism</p></button>
                        <button onClick={handleViewEVMCompatibility} className={viewEVMCompatibility ? 'active' : ''}><p>EVM Compatibility: Interchain</p></button>
                        <button onClick={handleViewAIVerify} className={AIVerify ? 'active' : ''}><p>AI Sequencer Verification</p></button>
                    </div>
                    <button className='mainBtns'><h6>CORE FEATURES <span>COMING SOON</span> <RiArrowDownSFill className='faIcons'/></h6></button>
                    <div>
                        <button className='hidden' disabled><p>Roll-up Functionalities</p></button>
                        <button className='hidden' disabled><p>ZK Libraries</p></button>
                        <button className='hidden' disabled><p>Network Bridges</p></button>
                        <button className='hidden' disabled><p>XERA Staking</p></button>
                        <button className='hidden' disabled><p>NFT Marketplace</p></button>
                        <button className='hidden' disabled><p>On-chain Wallet</p></button>
                        <button className='hidden' disabled><p>On-chain Trading</p></button>
                        <button className='hidden' disabled><p>Token Minting</p></button>
                        <button className='hidden' disabled><p>NFT Minting</p></button>
                        <button className='hidden' disabled><p>Smart Contract Creation</p></button>
                        <button className='hidden' disabled><p>Stake Pot Transfer</p></button>
                        <button className='hidden' disabled><p>XERA Moderators</p></button>
                    </div>
                    <button className='mainBtns'><h6>LAYER-2 SOLUTIONS <span>MAINNET</span> <RiArrowDownSFill className='faIcons'/></h6></button>
                    <div>
                        <button className='hidden' disabled><p>Optimism</p></button>
                        <button className='hidden' disabled><p>Starknet</p></button>
                        <button className='hidden' disabled><p>zkSync</p></button>
                        <button className='hidden' disabled><p>Arbitrum</p></button>
                        <button className='hidden' disabled><p>Cartesi</p></button>
                        <button className='hidden' disabled><p>Gosh</p></button>
                    </div>
                </div>
                <div className="txrdContainer mobile">
                    <div className="mobNav">
                        {!viewMobNavWP ?
                        <h6 onClick={handleMobileNav}><RiArrowDownSFill className='faIcons'/></h6>:
                        <h6 onClick={handleCloseMobileNav}><RiArrowUpSFill className='faIcons'/></h6>}
                    </div>
                    {viewMobNavWP &&<div className='mobNavBtn'>
                        <button onClick={handleViewWhat} className={viewWhat ? 'active' : ''}><p>What is Texeract Network ?</p></button>
                        <button onClick={handleViewFork} className={veiwFork ? 'active' : ''}><p>Is it Ethereum Fork?</p></button>
                        <button onClick={handleViewObjective} className={viewObjestive ? 'active' : ''}><p>Texeract Network: The Objectives</p></button>
                        <button onClick={handleViewXERA} className={viewXERA ? 'active' : ''}><p>Texeract Network: XERA Coin</p></button>
                        <button onClick={handleViewRoadmap} className={viewRoadmap ? 'active' : ''}><p>Texeract Network: Roadmap</p></button>
                        <button onClick={handleViewL2Solution} className={viewL2Solution ? 'active' : ''}><p>Texeract Network: Layer 2 Solution</p></button>
                        {/* <button onClick={handleViewEVMCompatibility} className={viewEVMCompatibility ? 'active' : ''}><p>EVM Compatibility: Interchain</p></button> */}
                        {/* <button onClick={handleViewAIVerify} className={AIVerify ? 'active' : ''}><p>AI Sequencer Verification</p></button> */}
                        <button onClick={handleViewConsensus} className={viewConsensus ? 'active' : ''}><p>Technology Mechanism</p></button>
                    </div>}
                </div>
                <div className="txrdContainer right" onClick={handleCloseMobileNav}>
                    {viewWhat &&<div>
                        <h5>What is Texeract Network?</h5>
                        <span>
                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                        </span>
                        <p>
                            Texeract Network was a Layer 1 blockchain network that focused on eliminating gas fees and securing transactions 
                            using a built-in Layer 2 network solution. Leveraging the fundamental work and functionalities of ZK-Rollups and 
                            Optimistic Rollup, Texeract Network promised scalability, validity-proof, and fraud-proof transactions. <br /><br />
                            Texeract Network boldly stepped into the blockchain arena, brandishing its prowess as a Layer 1 powerhouse 
                            that not only shattered the chains of gas fees but also erected an impenetrable fortress of transaction security 
                            through a seamlessly integrated Layer 2 network solution. Picture this: a dynamic fusion of cutting-edge ZK-Rollups 
                            and Optimistic Rollups technologies, strategically infused into Texeract's DNA, promising not just scalability but 
                            a symphony of validity-proof, fraud-proof transactions. <br /><br />
                            The Texeract revolution commenced by redefining the cost dynamics of blockchain transactions. Gas fees, long 
                            considered the bane of crypto enthusiasts, found their nemesis in Texeract's Layer 2 network solution. This wasn't 
                            just about making transactions affordable; it was a commitment to liberate users from the financial shackles that 
                            often accompanied blockchain interactions. But how did Texeract accomplish this feat? Enter ZK-Rollups, a cryptographic 
                            marvel that leverages Zero-Knowledge Proofs to roll up multiple transactions into a single succinct proof, drastically 
                            reducing the computational overhead and, consequently, gas fees. <br /><br />
                            Optimistic Rollups, another cornerstone of Texeract's architecture, injected a dose of optimism into the scalability 
                            narrative. This technology operates on the premise of presuming the validity of transactions unless proven otherwise, 
                            mitigating the need for extensive computational work during the validation process. In the Texeract ecosystem, 
                            Optimistic Rollups served as the catalyst for an efficient and streamlined transaction experience. This approach not 
                            only bolstered scalability but also laid the foundation for a network where transactions were not just swift but also 
                            accompanied by an inherent layer of trust. <br /><br />
                            Moreover, Texeract Network was no stranger to collaboration, adopting layer-2 solutions from existing networks to 
                            further enhance its capabilities. By building upon the successes and lessons of established layer-2 solutions, Texeract 
                            seamlessly integrated battle-tested technologies into its framework, ensuring a robust and user-friendly experience. 
                            The adoption of these solutions reinforced Texeract's commitment to practicality, realism, and innovation, showcasing 
                            a willingness to stand on the shoulders of giants to propel the blockchain industry forward. <br /><br />
                            In essence, Texeract Network's journey was a captivating saga of technological ingenuity, where ZK-Rollups and Optimistic 
                            Rollups weren't just buzzwords but the dynamic keystones of a network that shattered the norms. Through a strategic 
                            blend of revolutionary technologies and a collaborative spirit, Texeract emerged not just as a blockchain platform but 
                            as a vanguard, leading the charge towards a future where transactions were not just economical but also marked by an 
                            unprecedented level of security and trust. <br /><br />
                        </p>
                    </div>}
                    {veiwFork &&<div>
                        <h5>Is it Ethereum Fork?</h5>
                        <span>
                            <img src={require('../assets/imgs/TexeractEcosystem.png')} alt="" />
                        </span>
                        <p>
                            Texeract Network's journey unfolds as a narrative of innovation, distinctly steering away from the well-trodden path of 
                            Ethereum forks. In a resounding declaration, Texeract asserts its identity as a standalone network with aspirations that 
                            transcend the confines of traditional blockchain capabilities. Far from being another clone, Texeract envisions a realm 
                            of uniqueness and independence, a testament to its commitment to charting unexplored territories in the blockchain landscape. 
                            This departure from the beaten path reflects Texeract's audacious ambition to redefine what a blockchain can achieve. <br /><br />
                            A pivotal aspect of Texeract's mission is addressing the inherent challenges plaguing Ethereum forks, particularly the 
                            persistent problems of scalability and gas fees. While Ethereum forks often find themselves entangled in the web of these 
                            issues, Texeract sets out on a different trajectory, propelled by the promise of scalability, cost-effectiveness, and secure 
                            transactions through the integration of ZK-Rollups and Optimistic Rollups technologies. By tackling these problems head-on, 
                            Texeract aims to position itself as a beacon of practicality, offering a solution where others merely replicated existing 
                            challenges. <br /><br />
                            Texeract Network boldly charts its course as a standalone entity, distinct from Ethereum forks by eschewing the Ethereum 
                            Virtual Machine (EVM) as its core. Instead, Texeract opts for a strategic approach of EVM compatibility, fostering a seamless 
                            coexistence with EVM-based networks. This deliberate choice signifies Texeract's commitment to inclusivity and collaboration, 
                            allowing developers to transition effortlessly while unlocking a gateway to a broader ecosystem of decentralized applications 
                            (DApps) and smart contracts. <br /><br />
                            In transcending the limitations of typical blockchain capabilities, Texeract not only addresses the perennial problems of 
                            scalability and gas fees but also positions itself as a nexus for innovation. The network's design fosters expansion and the 
                            creation of cutting-edge solutions beyond the established standards of early networks. Texeract emerges as a dynamic canvas 
                            for developers and users alike, encouraging a vibrant ecosystem of diverse applications while preserving its own unique 
                            identity. <br /><br />
                            By steering away from the EVM as its core, Texeract Network underscores its independence while building upon the strengths 
                            of Ethereum-based networks. This bold approach echoes the network's ethos of progress and adaptability, setting the stage 
                            for a new era in blockchain technology. Texeract's compatibility with EVM networks represents a paradigm shift, offering a 
                            harmonious coexistence between tradition and innovation, and establishing the network as a forward-thinking and collaborative 
                            force in the ever-evolving blockchain landscape. <br /><br />
                            In essence, Texeract Network emerges not as an echo but as a distinctive voice in the blockchain realm. Its divergence from 
                            Ethereum forks, coupled with a steadfast commitment to solving the industry's perennial challenges, paints a compelling 
                            picture of a network that not only envisions a different future but actively forges the path to get there. Texeract's journey 
                            is an ode to innovation, collaboration, and a bold departure from the status quo, setting the stage for a blockchain narrative 
                            that goes beyond replication and into the realm of true transformation.
                        </p>
                    </div>}
                    {viewObjestive &&<div>
                        <h5>Texeract Network: The Objectives</h5>
                        <span>
                            <img src={require('../assets/imgs/TEXERACTLanding.png')} alt="" />
                        </span>
                        <p>
                            Texeract Network undertakes a transformative journey with a multifaceted objective aimed at reshaping the landscape of 
                            blockchain technology. At its core, Texeract's primary goal is to serve as a secure starting point for newcomers venturing 
                            into the intricacies of the blockchain space. By prioritizing the protection of user funds during transactions, Texeract 
                            ensures a safe and user-friendly entry point for beginners, fostering a sense of confidence and trust in the decentralized 
                            ecosystem. <br /><br />
                            In tandem with this commitment to security, Texeract Network aspires to revolutionize and extend beyond the conventional 
                            practices observed in early blockchain networks. The integration of cutting-edge technologies, such as ZK-Rollups and 
                            Optimistic Rollups, underscores Texeract's dedication to addressing the longstanding challenges of scalability and gas fees. 
                            By pushing the boundaries of what is deemed possible in the blockchain realm, Texeract envisions a future where transactions 
                            are not only efficient and cost-effective but also inherently secure. <br /><br />
                            Furthermore, Texeract positions itself as a dynamic platform that goes beyond the ordinary. The network's compatibility 
                            with the Ethereum Virtual Machine (EVM) and strategic embrace of EVM-created networks solidify Texeract's commitment to 
                            collaboration and inclusivity. This unique approach not only facilitates a seamless transition for developers but also 
                            contributes to the creation of a vibrant and diverse ecosystem of decentralized applications. <br /><br />
                            In essence, Texeract Network's objectives are twofold: to provide a secure on-ramp for blockchain novices and to spearhead 
                            a transformative wave of innovation within the industry. By setting out to redefine conventional practices and offering a 
                            secure haven for beginners, Texeract emerges as a beacon of change, symbolizing the next frontier in the evolution of 
                            blockchain networks. Through these objectives, Texeract aims not only to meet current industry standards but to surpass them, 
                            setting a new paradigm for the decentralized future.
                        </p>
                    </div>}
                    {viewXERA &&<div>
                        <h5>Texeract Network: XERA Coin</h5>
                        <span>
                            <img src={require('../assets/imgs/TexeractCoinRealistic.png')} alt="" />
                        </span>
                        <p>
                            XERA Coin stands as the governance powerhouse of the Texeract Network, serving as the linchpin for seamless 
                            transactions and comprehensive governance. As the native coin of our network, XERA plays a pivotal role in 
                            facilitating transactions and interactions within the ecosystem. Users rely on XERA Coin not only for swift 
                            and secure transactions but also to actively participate in the governance of the Texeract Network. Empowering 
                            stakeholders with decision-making authority, XERA Coin embodies the essence of our network, fostering a 
                            decentralized and democratic environment where every participant contributes to the collective growth and 
                            evolution of the Texeract ecosystem.
                        </p>
                    </div>}
                    {viewRoadmap &&<div>
                        <h5>Texeract Network: Roadmap Phases</h5><br />
                        <h6 className='roadmapPassed'>Phase 1 : TEXERACT NETWORK PLANNING AND DEVELOPMENT - PASSED</h6>
                        <p>
                            <ul>
                                <li>TEXERACT Network Developer assembly</li>
                                <li>TEXERACT Project Assesment</li>
                                <li>Community Surveys</li>
                                <li>Investor Open Funding</li>
                            </ul>
                        </p>
                        <h6 className='roadmapPassed'>Phase 2 : TEXERACT NETWORK ALPHA PRIVATE TESTNET LAUNCH - PASSED</h6>
                        <p>
                            <ul>
                                <li>TEXERACT Testnet Alpha Launching</li>
                                <li>Community Testnet Events</li>
                                <li>TEXERACT Bridge Testnet</li>
                                <li>Community Testnet Events</li>
                                <li>AI Receits & Layer-2 Solution Testing</li>
                                <li>Sepolia Tokens to tXERA Coin Bridge</li>
                                <li>XERAScan Explorer Alpha Testnet Launch</li>
                            </ul>
                        </p>
                        <h6 className='roadmapPassed'>Phase 3 : TEXERACT NETWORK ENHANCEMENTS AND ADJUSTMENTS - PASSED</h6>
                        <p>
                            <ul>
                                <li>PERFORMANCE (increasing Texeract Network Transaction Speed)</li>
                                <li>SCALABILITY (increasing the capacity of each transaction size with help of Layer-2 Solution)</li>
                                <li>INFRASTRUCTURE (improving Texeract tools and introduce new services on the top of the Texeract Network)</li>
                                <li>DECENTRALIZATION (improving and adding new ZK-promts to the system's AI Validators to secure the Network)</li>
                                <li>SECURITY (improving and enhancing the risk management framework of the Network)</li>
                                <li>ROLLUPS (improving and adopting new norms and characteristics developed by new rollups)</li>
                                <li>COMPATIBILITY (adopting more blockchain network setup for network bridging)</li>
                            </ul>
                        </p>
                        <h6>Phase 4 : TEXERACT NETWORK BETA LAUNCH - ON GOING</h6>
                        <p>
                            <ul>
                                <li>Re-run enhancements and adjustments</li>
                                <li>XERA Wallet Launching</li>
                                <li>Texeract Core Feature Launch</li>
                                <li>TXERA Faucet Launching</li>
                                <li>Open-Network-Bridging (ETH and SOL)</li>
                                <li>Community Testnet Events</li>
                                <li>Claim, Send and Receive Wallet Feature</li>
                                <li>Genesis Node Airdrop</li>
                            </ul>
                        </p>
                        <h6>Phase 5 : TEXERACT NETWORK MAINNET LAUNCH</h6>
                        <p>
                            <ul>
                                <li>TEXERACT Mainnet Launching</li>
                                <li>XERA Wallet network expansion</li>
                                <li>Smart Contract Open Deployments</li>
                                <li>Texeract Network Trading Market</li>
                            </ul>
                        </p>
                        <h6>Phase 6 : TEXERACT NETWORK EXPANSION</h6>
                        <p>
                            <ul>
                                <li>Plan to be announced after mainnet</li>
                            </ul>
                        </p>
                    </div>}
                    {viewL2Solution &&<div>
                        <h5>Texeract Network: Layer 2 Solution (Roll-ups)</h5>
                        <span>
                            <img src={require('../assets/imgs/TexeractLayer2Solution.png')} alt="" />
                        </span>
                        <p>
                            Texeract Network is embracing a transformative journey, leveraging state-of-the-art AI technology and a specialized 
                            consensus mechanism to seamlessly integrate and adapt proven Layer-2 scaling solutions. Through this innovative approach, 
                            Texeract Network is set to elevate its infrastructure, providing unparalleled improvements in scalability, stability, 
                            and overall network performance. By harnessing the strengths of established Layer-2 solutions such as Optimism, Starknet, Arbitrum,
                            zkSync, Gosh, and Cartesi, Texeract Network aims to surpass traditional Layer-1 blockchains, delivering a superior blockchain 
                            experience that is both adaptive and forward-thinking. <br /><br />
                            Building on the foundation of a specialized consensus mechanism and AI-driven validation, Texeract Network further cements its 
                            commitment to scalability and innovation by incorporating cutting-edge Layer-2 scaling solutions. Optimism, Starknet, Arbitrum, 
                            zkSync, Gosh, and Cartesi emerge as integral components of Texeract's transformative journey, seamlessly integrated to enhance 
                            the network's performance on multiple fronts. <br /><br />
                            Optimism, with its optimistic rollup approach, contributes to reducing transaction fees and improving throughput by processing 
                            transactions off-chain before submitting a succinct proof to the main network. This strategic integration not only addresses 
                            scalability concerns but also ensures a cost-effective and efficient transaction environment for users on the Texeract Network. <br /><br />
                            Starknet, known for its zk-rollup technology, introduces a layer of privacy to the network, utilizing zero-knowledge proofs to secure 
                            and verify transactions without compromising sensitive information. This privacy-centric approach aligns seamlessly with Texeract's 
                            commitment to fostering a secure and confidential environment for its users. <br /><br />
                            Arbitrum, zkSync, Gosh, and Cartesi each bring their unique strengths to the table, collectively contributing to Texeract's goal 
                            of surpassing traditional Layer-1 blockchains. Whether it's the utilization of rollup techniques, sharding, or off-chain computations, 
                            each Layer-2 solution adds a layer of specialization, ensuring Texeract Network remains at the forefront of the blockchain landscape. <br /><br />
                            Texeract's adaptive and forward-thinking approach not only encompasses a cutting-edge consensus mechanism and AI technology but 
                            also integrates proven Layer-2 scaling solutions, marking a significant leap towards a superior blockchain experience. As Texeract 
                            Network continues to evolve, this comprehensive integration of technologies sets the stage for a decentralized ecosystem that excels 
                            in scalability, stability, and user experience, redefining the standards for the next generation of blockchain networks.
                        </p>
                        <span>
                            <img src={require('../assets/imgs/TexeractLayer2.png')} alt="" />
                        </span>
                        <p>    
                            Adopted Layer-2 Network Solution <br /><br />
                            Optimism: Optimism is a Layer-2 scaling solution that utilizes optimistic rollups to increase transaction throughput and 
                            reduce fees on Ethereum. By aggregating multiple transactions off-chain and then submitting a single proof to the Ethereum 
                            mainnet, Optimism aims to enhance scalability without sacrificing security. <br /><br />
                            Starknet: Starknet is a Layer-2 scaling solution developed by StarkWare that utilizes zk-rollups to increase transaction 
                            throughput and reduce costs on Ethereum. It enables developers to build scalable decentralized applications with privacy 
                            features while leveraging Ethereum's security and network effects. <br /><br />
                            ZKSync: ZKSync is a Layer-2 scaling solution that employs zero-knowledge proofs to process transactions off-chain and then 
                            generate succinct proofs for on-chain verification. By batching transactions and compressing proofs, ZKSync aims to enhance 
                            Ethereum's scalability and reduce transaction costs. <br /><br />
                            Arbitrum: Arbitrum is a Layer-2 scaling solution that aims to improve Ethereum's scalability and throughput while maintaining 
                            compatibility with existing Ethereum smart contracts. It uses a rollup technique to batch transactions off-chain and then 
                            settle them on-chain, reducing congestion and costs. <br /><br />
                            Cartesi: Cartesi enables complex computations to be performed off-chain while ensuring the final outcome is verified on the blockchain. It allows developers 
                            to build decentralized applications (DApps) with off-chain computation capabilities, enhancing scalability and cost-effectiveness. <br /><br />
                            Gosh: Gosh (Guardians of the Sacred Humble) is a Layer-2 scaling solution that focuses on improving the throughput and scalability 
                            of blockchain networks. It employs techniques such as sharding and sidechains to process transactions off-chain and then periodically 
                            commit them to the main blockchain.
                        </p>
                    </div>}
                    {viewConsensus &&<div>
                        <h5>Technology Mechanism</h5>
                        <span>
                            <img src={require('../assets/imgs/TexeractConsensus.png')} alt="" />
                        </span>
                        <p>
                            Texeract Network proudly adopts the groundbreaking Proof-of-History (PoH) technology mechanism, inspired by the success 
                            of the Solana Blockchain. PoH introduces a crucial layer of innovation by incorporating a verifiable and unique 
                            timestamping system for every transaction. Unlike traditional blockchains that rely on timestamping through a sequence 
                            of events, PoH enables transactions to be ordered with an inherent timestamp, significantly enhancing the network's 
                            overall efficiency. This approach ensures a robust and reliable transaction history while minimizing the risk of forks 
                            and enhancing the speed of transaction processing. <br /><br />
                            At the heart of Texeract Network's implementation is the seamless integration of AI technology to replace or combine conventional 
                            node validators. This strategic choice allows for the intelligent verification of PoH timestamps, optimizing the network's 
                            performance and reliability. AI-driven validators can adapt dynamically to varying network conditions, ensuring accurate 
                            and efficient timestamp verification. This not only accelerates transaction processing but also adds a layer of 
                            adaptability that sets Texeract apart in the realm of blockchain consensus mechanisms. <br /><br />
                            By fusing Proof-of-History with AI-driven validation, Texeract Network pioneers a new era in blockchain technology. 
                            The amalgamation of these cutting-edge technologies not only ensures a secure and transparent transaction history but 
                            also positions Texeract as a leader in speed, scalability, and resilience. As we embrace the future of decentralized 
                            networks, Texeract stands at the forefront, delivering a sophisticated and intelligent technology mechanism that redefines 
                            the benchmarks of efficiency in the blockchain landscape.
                        </p>
                    </div>}
                </div>
            </section>
        </div>
    )
}

export default Whitepaper