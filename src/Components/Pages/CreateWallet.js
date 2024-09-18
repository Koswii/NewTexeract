import React, { useState, useEffect } from 'react'
import "../CSS/createWallet.css";
import { 
    FaTimes
} from 'react-icons/fa';
import { 
    TbDownload 
} from "react-icons/tb";
import { XERAWalletData } from '../Pages/XERAWalletDataContext';
const wordList = [
    'apple', 'grape', 'mango', 'berry', 'peach', 'plum', 'lemon', 'fig', 'pear', 'kiwi',
    'papaya', 'melon', 'date', 'lime', 'olive', 'cherry', 'raisin', 'onion', 'carrot', 'ginger',
    'basil', 'radish', 'wheat', 'barley', 'oats', 'corn', 'millet', 'rye', 'quinoa', 'rice',
    'daisy', 'iris', 'lily', 'rose', 'tulip', 'violet', 'hyacinth', 'pansy', 'fern', 'ivy',
    'maple', 'oak', 'pine', 'elm', 'birch', 'cedar', 'yew', 'fir', 'ash', 'spruce',
    'stone', 'brick', 'glass', 'steel', 'bronze', 'metal', 'gold', 'silk', 'wool', 'nylon',
    'glove', 'hat', 'shoe', 'sock', 'belt', 'scarf', 'coat', 'pants', 'shirt', 'dress',
    'table', 'chair', 'couch', 'lamp', 'stool', 'desk', 'shelf', 'fan', 'clock', 'rug',
    'plane', 'train', 'bus', 'car', 'bike', 'ship', 'boat', 'raft', 'truck', 'taxi',
    'paper', 'pencil', 'pen', 'book', 'notebook', 'binder', 'ruler', 'glue', 'eraser', 'tape',
    'violin', 'piano', 'drums', 'flute', 'guitar', 'horn', 'harp', 'banjo', 'cello', 'bass',
    'apple', 'mango', 'kiwi', 'melon', 'fig', 'berry', 'lime', 'date', 'peach', 'plum',
    'cheese', 'butter', 'cream', 'yogurt', 'milk', 'bread', 'cake', 'pie', 'jam', 'honey',
    'chair', 'table', 'desk', 'couch', 'lamp', 'stool', 'shelf', 'fan', 'clock', 'bed',
    'cloud', 'rain', 'snow', 'wind', 'storm', 'fog', 'sun', 'haze', 'frost', 'mist',
    'sword', 'bow', 'axe', 'knife', 'spear', 'mace', 'dagger', 'staff', 'whip', 'shield',
    'robot', 'laser', 'drone', 'probe', 'alien', 'ship', 'saturn', 'star', 'moon', 'mars',
    'spice', 'curry', 'pepper', 'salt', 'clove', 'ginger', 'garlic', 'nutmeg', 'onion', 'thyme',
    'shirt', 'hat', 'sock', 'coat', 'pants', 'scarf', 'glove', 'dress', 'belt', 'jacket',
    'fruit', 'bread', 'milk', 'cheese', 'butter', 'honey', 'cake', 'pie', 'sugar', 'candy',
    'wheat', 'rice', 'barley', 'oats', 'corn', 'rye', 'quinoa', 'millet', 'sorghum', 'bran',
    'sun', 'rain', 'snow', 'wind', 'fog', 'haze', 'cloud', 'frost', 'mist', 'storm',
    'plane', 'train', 'car', 'bus', 'bike', 'boat', 'raft', 'taxi', 'truck', 'ship',
    'fish', 'shrimp', 'crab', 'lobster', 'clam', 'salmon', 'trout', 'cod', 'squid', 'eel',
    'sword', 'bow', 'knife', 'axe', 'spear', 'mace', 'staff', 'shield', 'whip', 'dagger',
    'clock', 'lamp', 'fan', 'bed', 'stool', 'rug', 'couch', 'desk', 'table', 'chair',
    'robot', 'laser', 'drone', 'probe', 'alien', 'mars', 'star', 'ship', 'saturn', 'moon',
    'apple', 'grape', 'peach', 'plum', 'lemon', 'berry', 'lime', 'date', 'kiwi', 'fig',
    'shirt', 'sock', 'coat', 'pants', 'hat', 'scarf', 'dress', 'belt', 'glove', 'shoe',
    'cloud', 'rain', 'sun', 'wind', 'snow', 'fog', 'storm', 'frost', 'mist', 'haze',
    'stone', 'brick', 'metal', 'glass', 'silk', 'wool', 'nylon', 'gold', 'bronze', 'steel',
    'spice', 'curry', 'pepper', 'salt', 'clove', 'garlic', 'ginger', 'onion', 'thyme', 'nutmeg',
    'apple', 'kiwi', 'mango', 'fig', 'melon', 'berry', 'lime', 'date', 'peach', 'plum',
    'sword', 'bow', 'knife', 'spear', 'axe', 'mace', 'staff', 'shield', 'whip', 'dagger',
    'plane', 'train', 'bus', 'car', 'bike', 'ship', 'taxi', 'truck', 'raft', 'boat',
    'cloud', 'rain', 'sun', 'snow', 'wind', 'fog', 'storm', 'frost', 'haze', 'mist',
    'chair', 'desk', 'lamp', 'fan', 'couch', 'stool', 'rug', 'clock', 'table', 'shelf',
    'shirt', 'hat', 'sock', 'coat', 'pants', 'scarf', 'glove', 'dress', 'belt', 'shoe',
    'fruit', 'milk', 'bread', 'cheese', 'butter', 'cake', 'pie', 'sugar', 'honey', 'candy',
    'stone', 'brick', 'glass', 'steel', 'silk', 'wool', 'gold', 'metal', 'bronze', 'nylon',
    'wheat', 'rice', 'oats', 'corn', 'rye', 'barley', 'quinoa', 'millet', 'sorghum', 'bran',
    'fish', 'crab', 'shrimp', 'clam', 'lobster', 'salmon', 'trout', 'cod', 'squid', 'eel',
    'violin', 'piano', 'flute', 'drums', 'guitar', 'horn', 'banjo', 'harp', 'bass', 'cello',
    'robot', 'laser', 'drone', 'probe', 'alien', 'mars', 'star', 'moon', 'ship', 'saturn',
    'cloud', 'sun', 'rain', 'snow', 'wind', 'fog', 'storm', 'haze', 'frost', 'mist',
    'chair', 'lamp', 'stool', 'desk', 'couch', 'rug', 'fan', 'table', 'clock', 'shelf',
    'plane', 'train', 'car', 'bus', 'bike', 'taxi', 'ship', 'boat', 'raft', 'truck',
    'fish', 'shrimp', 'crab', 'salmon', 'trout', 'clam', 'lobster', 'squid', 'cod', 'eel',
    'balloon', 'blanket', 'mustard', 'eyelash', 'airport', 'factory', 'thunder', 'rainbow', 'diamond', 'harvest',
    'emerald', 'festival', 'horizon', 'journal', 'leopard', 'spinach', 'yogurt', 'lettuce', 'capture', 'oatmeal',
    'package', 'soldier', 'plastic', 'caramel', 'sunrise', 'pottery', 'fortune', 'brother', 'dolphin', 'picture',
    'blanket', 'fortune', 'justice', 'mission', 'shallow', 'venture', 'protein', 'stretch', 'antique', 'archive',
    'boulder', 'cousins', 'dancing', 'fiction', 'giraffe', 'hostage', 'lantern', 'monster', 'passion', 'pioneer',
    'running', 'shuttle', 'teacher', 'uniform', 'victory', 'warning', 'wildcat', 'zombie', 'butters', 'cabbage',
    'channel', 'delight', 'desktop', 'dragons', 'gallery', 'gateway', 'grammar', 'healthy', 'horizon', 'illusion',
    'justice', 'library', 'monster', 'opinion', 'organic', 'painting', 'pattern', 'planet', 'pottery', 'rainbow',
    'rockets', 'sandwich', 'silence', 'stadium', 'sunrise', 'treetop', 'venture', 'village', 'whisper', 'wolfpack',
    'algebra', 'biscuit', 'circuit', 'compass', 'crystal', 'diagram', 'diamond', 'fantasy', 'giraffe', 'granite',
    'hatchet', 'journal', 'kangaro', 'luggage', 'mystery', 'napkins', 'optical', 'pioneer', 'planter', 'plunger',
    'reactor', 'shallow', 'species', 'treetop', 'uniform', 'upscale', 'vulture', 'warning', 'warrior', 'whistle'
];

const CreateWallet = () => {
    const {
      viewWalletCreate, 
      setViewWalletCreate
    } = XERAWalletData();
    const [createWalletModal, setCreateWalletModal] = useState(true);
    const [successCreateModal, setSuccessCreateModal] = useState(false);

    const [privateKey, setPrivateKey] = useState('');
    const [publicKey, setPublicKey] = useState('');

    const [seedPhrase, setSeedPhrase] = useState([]);
    const [viewCreateAccount, setViewCreateAccount] = useState(true);
    const [viewSeedPhrase, setViewSeedPhrase] = useState(false);
    const [viewVerifyWallet, setViewVerifyWallet] = useState(false);
    const [xeraUsername, setXERAUsername] = useState('');
    const [xeraPassword, setXERAPassword] = useState('');
    const [xeraReferrer, setXERAReferrer] = useState('');
    
    const [xeraUsernameError, setXERAUsernameError] = useState(false);
    const [xeraUsernameErrorResponse, setXERAUsernameErrorResponse] = useState('');
    const [xeraUsernameErrorResponse1, setXERAUsernameErrorResponse1] = useState('');
    const [xeraUsernameResponse, setXERAUsernameResponse] = useState(false);
    const [xeraPasswordError, setXERAPasswordError] = useState(false);
    const [xeraPasswordErrorResponse, setXERAPasswordErrorResponse] = useState('');
    const [xeraPasswordErrorResponse1, setXERAPasswordErrorResponse1] = useState('');
    const [xeraPasswordResponse, setXERAPasswordResponse] = useState(false);

    const [userInputs, setUserInputs] = useState(Array(12).fill(''));
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [seedError, setSeedError] = useState(false);
    const [seedComplete, setSeedComplete] = useState(false);


    const generateSeedPhrase = () => {
        let selectedWords = [];
        const wordListCopy = [...wordList];
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * wordListCopy.length);
            selectedWords.push({ number: i + 1, word: wordListCopy[randomIndex] });
            wordListCopy.splice(randomIndex, 1);
        }
        setSeedPhrase(selectedWords);
    };
    const generateRandomKey = (length) => {
        let randomKey = '';
        const characters = 'abcdef0123456789'; // Hexadecimal characters
    
        for (let i = 0; i < length; i++) {
          randomKey += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        return randomKey;
    };
    const generateKeys = () => {
        const privateKeyLength = 64 - 4; // Total length minus "XERA" (4 chars)
        const publicKeyLength = 42 - 4;  // Total length minus "XERA" (4 chars)
    
        const newPrivateKey = 'XERA' + generateRandomKey(privateKeyLength);
        const newPublicKey = 'XERA' + generateRandomKey(publicKeyLength);
    
        setPrivateKey(newPrivateKey);
        setPublicKey(newPublicKey);
    };
    const handleInputChange = (index, e) => {
        const { value } = e.target;
        setUserInputs(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = value;
            return newInputs;
        });
    };
    const handleConfirm = () => {
        const indicesToCheck = [3, 6, 7]; // 4th, 7th, and 8th words (0-based indices)
        const isMatch = indicesToCheck.every(index => seedPhrase[index].word === userInputs[index]);

        if(isMatch === false) {
            setSeedError(true);
            setSeedComplete(false);
            
        } else {
            setSeedError(false);
            setSeedComplete(true);
            setIsConfirmed(isMatch);
            submitWalletDetails();
        }
    };
    const submitWalletDetails = async () => {
        const seedKeys = {};
        seedPhrase.forEach((item, index) => {
            seedKeys[`seedKey${index + 1}`] = item.word;
        });

        const formWalletDetails = {
            username: xeraUsername,
            password: xeraPassword,
            referral: xeraReferrer,
            privateAddress: privateKey,
            publicAddress: publicKey,
            ...seedKeys,
        };

        // const jsonWalletDetails = JSON.stringify(formWalletDetails);
        // console.log(jsonWalletDetails);

        setSuccessCreateModal(true)
        setCreateWalletModal(false)
    };
    const handleDownloadXERAWallet = () => {
        const username = xeraUsername; // Example values, replace with actual data
        const privateAddress = privateKey;
        const publicAddress = publicKey;
        
        // Format the text content without seed keys
        let textContent = `Username: ${username}\nPrivate Key: ${privateAddress}\nPublic Key: ${publicAddress}\n`;

        // Create a Blob from the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a download link and trigger it programmatically
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'xera-wallet-details.txt';
        link.click();
    };

    const indicesToCheck = [3, 6, 7]; // 4th, 7th, and 8th words (0-based indices)
    const handleCloseCreate = () => {
        setViewWalletCreate(false)
        setSuccessCreateModal(false)
        setViewCreateAccount(true)
        setViewSeedPhrase(false)
        setViewVerifyWallet(false)
        setXERAUsername('')
        setXERAPassword('')
        setXERAPasswordError(false)
        setXERAPasswordErrorResponse('')
    }

    const handleCheckUsername = (e) => {
        const userUsername = e.target.value;
        // Regular expression to check for non-alphanumeric characters
        const specialCharRegex = /[^a-zA-Z0-9]/;
        setXERAUsername(userUsername);

        // Always check for empty input first
        if (userUsername.length === 0) {
            setXERAUsernameError(true);
            setXERAUsernameResponse(false);
            setXERAUsernameErrorResponse('Username cannot be empty');
            setXERAUsernameErrorResponse1('');
        } 
        // Check if username contains special characters
        else if (specialCharRegex.test(userUsername)) {
            setXERAUsernameError(true);
            setXERAUsernameResponse(false);
            setXERAUsernameErrorResponse('No special characters or symbols');
            setXERAUsernameErrorResponse1('');
        }
        // Check if the username is too short
        else if (userUsername.length < 4) {
            setXERAUsernameError(true);
            setXERAUsernameResponse(false);
            setXERAUsernameErrorResponse('Username too short');
            setXERAUsernameErrorResponse1('');
        } 
        // Valid username
        else {
            setXERAUsernameError(false);
            setXERAUsernameResponse(true);
            setXERAUsernameErrorResponse('');
            setXERAUsernameErrorResponse1('');
        }
    };
    const handleCheckPassword = (e) => {
        const userPassword = e.target.value;
    
        setXERAPassword(userPassword);
        // Always check for empty input first
        if (userPassword.length === 0) {
            setXERAPasswordError(true);
            setXERAPasswordResponse(false);
            setXERAPasswordErrorResponse('Password cannot be empty');
            setXERAPasswordErrorResponse1('');
        } 
        // Check if the password is too short
        else if (userPassword.length < 8) {
            setXERAPasswordError(true);
            setXERAPasswordResponse(false);
            setXERAPasswordErrorResponse('At least 8-16 characters required');
            setXERAPasswordErrorResponse1('');
        } 
        // Check for valid password length but still too short
        else if (userPassword.length >= 8 && userPassword.length < 12) {
            setXERAPasswordError(false);
            setXERAPasswordResponse(true);
            setXERAPasswordErrorResponse('');
            setXERAPasswordErrorResponse1('Password too short');
        } 
        // Valid password
        else {
            setXERAPasswordError(false);
            setXERAPasswordResponse(true);
            setXERAPasswordErrorResponse('');
            setXERAPasswordErrorResponse1('');
        }
    };

    const handleDefaultPage = () => {
        setViewCreateAccount(true)
        setViewSeedPhrase(false)
        setViewVerifyWallet(false)
    }
    const handlePage2 = () => {
        if (xeraUsername && xeraPassword && !xeraUsernameError && !xeraPasswordError) {
            setViewCreateAccount(false);
            setViewSeedPhrase(true);
            setViewVerifyWallet(false);
            generateSeedPhrase();
            generateKeys();
        } else {
            // Ensure it doesn't allow proceeding if there are validation errors
            console.log('Validation failed. Cannot proceed.');
        }
    }
    const handlePage3 = () => {
        setViewCreateAccount(false)
        setViewSeedPhrase(false)
        setViewVerifyWallet(true)
    }
    
    


    return (
        <>
            <div className='navContainerWallet'>
                {successCreateModal && <div className="navWalletSuccess">
                    <button id='closeCreateWallet' onClick={handleCloseCreate}><FaTimes className='faIcons'/></button>
                    <div className="nwsContainer">
                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                        <h6>XERA WALLET<br /><span>CREATED SUCCESSFULLY</span></h6>
                        <button onClick={handleDownloadXERAWallet}><TbDownload className='faIcons'/> XERA WALLET</button>
                    </div>
                </div>}
                {createWalletModal && <div className="navWalletContent">
                    <button id='closeCreateWallet' onClick={handleCloseCreate}><FaTimes className='faIcons'/></button>
                    <div className="ncwcHeader">
                        <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />
                        <span>
                            <h6>CREATE XERA WALLET</h6>
                            <p>TEXERACT NETWORK</p>
                        </span>
                    </div>
                    <div className="ncwcNavDots">
                        <span className={viewCreateAccount ? 'active' : ''}></span>
                        <hr />
                        <span className={viewSeedPhrase ? 'active' : ''}></span>
                        <hr />
                        {viewVerifyWallet ?
                            <img src={require('../assets/imgs/TexeractLogoWhite.png')} alt="" />:
                            <span></span>
                        }
                    </div>
                    <div className="ncwcNavContent">
                        <p className={viewCreateAccount ? 'active' : ''}>Create Account</p>
                        <p className={viewSeedPhrase ? 'active' : ''}>Seed Phrase</p>
                        <p className={viewVerifyWallet ? 'active' : ''}>Verify Wallet</p>
                    </div>
                    <div className="ncwcContents">
                        {viewCreateAccount && <div className='ncwcc createAccount'>
                            <h6>CREATE ACCOUNT</h6>
                            <p>This account will only allow you to check and view your current balance and transactions.</p>
                            <div className='ncwcccaContent'>
                                <div>
                                    <label htmlFor="">Username 
                                        {(xeraUsernameError && xeraUsernameErrorResponse) && <span id='nameErrorResponse'>{xeraUsernameErrorResponse}</span>}
                                    </label>
                                    <input 
                                        className={(xeraUsernameError && xeraUsernameErrorResponse) ? 'error' : ''} 
                                        id={(xeraUsernameErrorResponse1 || xeraUsernameResponse) ? 'correctUsername' : 'wrongUsername'}
                                        type="text" 
                                        placeholder='Ex. Loki' 
                                        value={xeraUsername}
                                        onChange={handleCheckUsername}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Password 
                                        {(xeraPasswordError && xeraPasswordErrorResponse) && <span id='passErrorResponse'>{xeraPasswordErrorResponse}</span>}
                                        {(xeraPasswordErrorResponse1) && <span id='passErrorResponse1'>{xeraPasswordErrorResponse1}</span>}
                                    </label>
                                    <input 
                                        className={(xeraPasswordError && xeraPasswordErrorResponse) ? 'error' : ''} 
                                        id={(xeraPasswordErrorResponse1 || xeraPasswordResponse) ? 'correctPassword' : 'wrongPassword'}
                                        type="password"  
                                        placeholder='********' 
                                        value={xeraPassword}
                                        onChange={handleCheckPassword}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Referrer (Optional)</label>
                                    <input type="text" placeholder='Ex. Sylvie' onChange={(e) => setXERAReferrer(e.target.value)}/>
                                </div>
                            </div>
                        </div>}
                        {viewSeedPhrase && <div className="ncwcc seedPhrase">
                            <h6>WRITE DOWN YOUR <br /> SECRET RECOVERY PHRASE</h6>
                            <p>Please store this seed phrase securely. Do not share it with anyone.</p>
                            <div className='ncwccsp'>
                                {seedPhrase.map((data, i) => (
                                    <div key={i}>
                                        <h5><span>{data.number}.</span> {data.word}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        {viewVerifyWallet && <div className="ncwcc verifyWallet">
                            <h6>VERIFY SEED PHRASE<br />TO PROCEED</h6>
                            <p>Complete the seed phrase, and your XERA Wallet will be ready to go.</p>
                            <div className='ncwccsp'>
                                {seedPhrase.map((data, index) => (
                                    <div key={index}>
                                        <h5>
                                            <span>{data.number}.</span>
                                            {indicesToCheck.includes(index) ? (
                                                <input
                                                    type="text"
                                                    className={seedError ? 'active' : ''}
                                                    id={seedComplete && 'correctSeed'}
                                                    value={userInputs[index]}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    placeholder={`Word ${data.number}`}
                                                />
                                            ) : (
                                                data.word
                                            )}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                    <div className="ncwcNote">
                        <p>Creating a XERA Wallet allows you to access all the features of the Texeract Network</p>
                    </div>
                    <div className="ncwcButtons">
                        {viewCreateAccount && <>
                            {((xeraUsername && xeraPassword && !xeraUsernameError && !xeraPasswordError)) ?
                            <button className='active' onClick={handlePage2}>Next</button> :
                            <button disabled>Next</button>}
                        </>}
                        {viewSeedPhrase && <>
                            <button className='active' onClick={handleDefaultPage}>Prev</button>
                            <button className='active' onClick={handlePage3}>Next</button>
                        </>}
                        {viewVerifyWallet && <>
                            <button className='active' onClick={handleConfirm}>Create</button>
                        </>}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default CreateWallet