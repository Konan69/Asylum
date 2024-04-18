import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import {ethers} from 'ethers'
import axios from 'axios';

import '../Styles/whitelist.css'

function Whitelist() {
    // State to store the wallet address and points
    const [wallet, setWalletAddress] = useState('');
    const [connected, setConnected] = useState(false);
    const [BP, setBP] = useState()
    const [responseObj, setResponseObj] = useState({});
    const [showClaimedDiv, setShowClaimedDiv] = useState(false);
    const [showAlreadyWl, setShowAlreadywl] = useState(false);
    const [showNotEnoughPointsDiv, setShowNotEnoughPointsDiv] = useState(false);

    const referralId = responseObj?.id;
    const whitelistStatus = responseObj?.Whitelist
    const location = useLocation();
    const referralLink = `https://localhost:5173/whitelist?r=${referralId}`
    const queryParams = new URLSearchParams(location.search);
    const r = queryParams.get('r'); // Accessing the query parameter 'r'
    // console.log(responseObj["TwitterFollowed"])

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
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
      } else {
        // // Disconnect the wallet
        // window.ethereum.selectedAddress = null;
        // setConnected(false);
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

    const claimWhitelist = async () => {
      if(!whitelistStatus) {
        if (responseObj.points >= 15 ){
          try {
          const updateWl = await axios.post(`http://localhost:8080/api/users/claim-wl`, { wallet: wallet })
          if (updateWl.status === 200) {
          console.log('whitelist updated.');
          setShowClaimedDiv(true)
          }        
          } catch (error) {
            console.log({'error caliming wl ':error})
          }
        } else {
        setShowNotEnoughPointsDiv(true); 
        }
      } else {
        setShowAlreadywl(true)
      }
    } 

   

    // logic to handle db commpletion of task and saving stat
  const completeTask =  async (taskName) => {
        const result = await axios.post('http://localhost:8080/api/users/updatetask', {wallet: wallet, taskName : taskName})
        addPoints()
        setResponseObj(result.data)
      }

    const handleTwitterFollow = async () => {
      if (!responseObj["TwitterFollowed"]) {
        alert('Please Follow before joining');
        completeTask("TwitterFollowed")
    }
    };

    const handleIsPostLiked = async () => {
        if (!responseObj["PostLiked"]) {
          alert('Please Like + RT before claiming');
          completeTask("PostLiked")
        }
    };

    const handleIsTweetPosted = async () => {
        if (!responseObj["TweetPosted"]) {
          alert('Please Post before claiming');
          completeTask("TweetPosted")
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
                    <p>Referrals Count: {referralId}</p>

                    <div className="Claim-content "> <div className="Claim">Claim Boundlist </div> <div className="totalBP"> Total BP : {BP}</div> </div>
                    <div className="complete">Complete task to obtain whitelist. Must have at least 15 BP(BoundPoints) to be eligible to mint NFT</div>
                    <div className= "alltasks">
                    <div className="tasks">
                        <div className="task-items">Follow <a href="https://x.com/doge_on__base/status/1777039882956706172" onClick={handleTwitterFollow} target="_blank" rel="noopener noreferrer" className='link'>Basebound</a> on X</div> <div className="BP">+1 BP</div> </div>
                    <div className="tasks">
                        <div className="task-items">Repost and like this <a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsPostLiked} target="_blank" rel="noopener noreferrer" className='link'>Post </a> on X</div>  <div className="BP">+1 BP</div></div>
                    <div className="tasks">
                        <div className="task-items"><a href="https://x.com/doge_on__base/status/1777039882956706133" onClick={handleIsTweetPosted} target="_blank" rel="noopener noreferrer" className='link'>Post </a>about us on X </div>  <div className="BP">+1 BP</div></div>
                    <div className="tasks">
                        <div className="task-items">Refer friends to join Basebound [1 BP per invite]
                        <div className="copy-icon" onClick={ () => handleCopyToClipboard(referralLink)}><FaRegCopy /></div></div>
                       </div>
                    </div>
                    <div className="claim-btn">
                       <button className ="claimWhitelist" onClick={claimWhitelist}> claim Whitelist </button>
                       {showClaimedDiv && <div style={{ marginTop: '10px' }}>Whitelist claimed</div>}
                       {showNotEnoughPointsDiv && <div style={{ marginTop: '10px' }}>Not enough points to claim whitelist</div>}
                       {showAlreadyWl && <div style={{ marginTop: '10px' }}>Wallet Already Whitelisted</div>}
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