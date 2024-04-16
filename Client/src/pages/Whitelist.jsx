import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {ethers} from 'ethers'
import axios from 'axios';

function Whitelist() {
    // State to store the wallet address and points
    const [points, setPoints] = useState(0);
    const [wallet, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
    const [isTwitterFollowed, setIsTwitterFollowed] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [BP, setBP] = useState()
    const [isTweetPosted, setIsTweetPosted] = useState(false);
    const [responseObj, setResponseObj] = useState(''); // State to store the response object

    const referralId = responseObj?.id;
    const location = useLocation();
    const referralLink = `https://localhost:5173/whitelist?r=${referralId}`
    const queryParams = new URLSearchParams(location.search);
    const r = queryParams.get('r'); // Accessing the query parameter 'r'

    const connectWallet = async ()=> {
      if (!connected) {
      try{
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);
        
        console.log(r)

      // Make the post request to save the wallet address
      const response = await axios.post(`http://localhost:8080/api/users/`, { wallet: _walletAddress }, {params: {r : r}});
      if (response.status === 200) {
        console.log('Wallet address saved successfully.');
        setResponseObj(response.data)
        setBP(response.data.points)
        console.log(id)
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
      } else {
        // Disconnect the wallet
        window.ethereum.selectedAddress = null;
        setConnected(false);
      }

    }

    const addPoints = async () => {
      try {
      const AP = await axios.post("http://localhost:8080/api/users/addpoints", { wallet: wallet} )
      if (AP.status === 200) {
        console.log('points added');
        setBP(AP.data.points)
        console.log( AP.data.points)
      }
      } catch (error) {
        console.error('Error adding points', error);
      }
    }
    // logic to handle db commpletion of task and saving state
    const handleTaskCompletion = async (taskName, setIsCompleted) => {
      try {
        // Make a backend request to check if the task is completed
        const response = await axios.get(`https://your-backend-url/check-task?task=${taskName}`);
        
        // Assuming the backend response contains a property indicating task completion
        const isTaskCompleted = response.data[taskName];
    
        // Update the state based on the task completion status
        setIsCompleted(isTaskCompleted);
    
        // If the task is not completed, you can perform additional actions
        if (!isTaskCompleted) {
          // Perform additional actions such as showing an alert or adding points
          if (taskName === "TwitterFollowed") {
            alert('Please Follow before joining');
            addPoints(); // Example function to add points
          } else if (taskName === "PostLiked") {
            alert('Please Like + RT before claiming');
          } else if (taskName === "TweetPosted") {
            alert('Please Post before claiming');
          }
        }
      } catch (error) {
        console.error(`Error checking task "${taskName}":`, error);
      }
    };
    const handleTwitterFollow = () => {
      if (!isTwitterFollowed) {
        alert('Please Follow before joining');
        addPoints()
        setIsTwitterFollowed(true);
    }
    };

    const handleIsPostLiked = () => {
        if (!isPostLiked) {
            alert('Please Like + RT before claiming');
            setIsPostLiked(true);
        }
    };

    const handleIsTweetPosted = () => {
        if (!isTweetPosted) {
        alert('Please Post before claiming');
        setIsTweetPosted(true);
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
                    <p> BP : {BP}</p>
                    <p>Complete the tasks to obtain whitelist</p>
                    <div className="tasks">
                        <p className="task-items">Follow <a href="https://x.com/doge_on__base/status/1777039882956706172" onClick={handleTwitterFollow} target="_blank" rel="noopener noreferrer" className='link'>Basebound</a> on X <p>+1 BP</p></p>
                        <p className="task-items">Repost and like this <a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsPostLiked} target="_blank" rel="noopener noreferrer" className='link'>Post </a> on X <p>+1 BP</p></p>
                        <p className="task-items"><a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsTweetPosted} target="_blank" rel="noopener noreferrer" className='link'>Post </a>about us on X <p>+1 BP</p></p>
                        <p className="task-items">Refer friends to join Basebound [1 bp per successful invite]
                        <button onClick={() => handleCopyToClipboard(referralLink)}>
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