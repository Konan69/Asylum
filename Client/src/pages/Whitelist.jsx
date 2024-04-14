import React, { useState, useEffect } from "react";
import {ethers} from 'ethers'
import axios from 'axios';

function Whitelist() {
    // State to store the wallet address and points
    

    const [points, setPoints] = useState(0);
    const [wallet, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
    const [isTwitterFollowed, setIsTwitterFollowed] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [BP, setBP] = useState(0)
    const [isTweetPosted, setIsTweetPosted] = useState(false);
    const [responseObj, setResponseObj] = useState(''); // State to store the response object

    const referralId =responseObj.id
  

    const connectWallet = async ()=> {
      if (!connected) {
      try{
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);

      // Make the post request to save the wallet address
      const response = await axios.post('http://localhost:8080/api/users', { wallet: _walletAddress });
      if (response.status === 200) {
        console.log('Wallet address saved successfully.');
        setResponseObj(response.data)
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
      } else {
        // Disconnect the wallet
        window.ethereum.selectedAddress = null;
        setConnected(false);
        setWalletAddress("");
      }

    }
    useEffect(() => {
        const storedPoints = localStorage.getItem('points');
        if (storedPoints !== null) {
            setPoints(parseInt(storedPoints));
        } else {
            localStorage.setItem('points', '0');
        }
    }, []);

    useEffect(() => {
      if (responseObj !== null) {
        console.log(responseObj);
      }
    }, [responseObj]);
    
    const handleTwitterFollow = () => {
      if (!isTwitterFollowed) {
        alert('Please Follow before joining');
        setIsTwitterFollowed(true);
        setPoints(prevPoints => prevPoints + 1);
        localStorage.setItem('points', (points + 1).toString());
    }
    };

    const handleIsPostLiked = () => {
        if (!isPostLiked) {
            alert('Please Like + RT before claiming');
            setIsPostLiked(true);0
            setPoints(prevPoints => prevPoints + 1);
            localStorage.setItem('points', (points + 1).toString());
        }
    };

    const handleIsTweetPosted = () => {
        if (!isTweetPosted) {
        alert('Please Post before claiming');
        setIsTweetPosted(true);
        setPoints(prevPoints => prevPoints + 1);
        localStorage.setItem('points', (points + 1).toString());  
        }
    };
    const handleCopyToClipboard = (content) => {
      navigator.clipboard.writeText(content)
          .then(() => alert('Copied to clipboard'))
          .catch((error) => console.error('Error copying to clipboard:', error));
  };

    return (
        <div>
            {connected ? (
                <div>
                    <p>Your wallet is: {wallet}</p>
                    <p>your referralId is : {referralId}</p>
                    <p> BP : {points}</p>
                    <p>Complete the tasks to obtain whitelist</p>
                    <div className="tasks">
                        <p className="task-items">Follow <a href="https://x.com/doge_on__base/status/1777039882956706172" onClick={handleTwitterFollow} target="_blank" rel="noopener noreferrer" className='link'>Basebound</a> on X</p>
                        <p className="task-items">Repost and like this <a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsPostLiked} target="_blank" rel="noopener noreferrer" className='link'>Post</a> on X</p>
                        <p className="task-items"><a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsTweetPosted} target="_blank" rel="noopener noreferrer" className='link'>Post </a>about us on X</p>
                        <p className="task-items">Refer friends to join Basebound [1 bp per successful invite]
                        <button onClick={() => handleCopyToClipboard(storedWallet)}>
                            <img src="copy-icon.png" alt="Copy to Clipboard" />
                        </button> </p>
                    </div>
                </div>
            ) 
            :
            <div className="wallet">
            <button className="btn" onClick={connectWallet}> Connect Wallet
          </button>
            </div>
            }
        </div>
    );
}

export default Whitelist;