import React, { useState, useEffect } from "react";
import axios from 'axios';

function Whitelist() {
    // State to store the wallet address and points
    const storedWallet = window.localStorage.getItem('wallet');

    const [points, setPoints] = useState(0);
    const [wallet, setWalletAddress] = useState('');
    const [isTwitterFollowed, setIsTwitterFollowed] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isTweetPosted, setIsTweetPosted] = useState(false);
    const [referralId, setReferralId] = useState(null); // Define referralId state

    useEffect(() => {
        const storedPoints = localStorage.getItem('points');
        if (storedPoints !== null) {
            setPoints(parseInt(storedPoints));
        } else {
            localStorage.setItem('points', '0');
        }
    }, []);

    useEffect(() => {
      const fetchWalletId = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/users/getid', {
                  params: {
                    wallet: storedWallet
                  }
              });
              setReferralId(response.data._id);
              console.log(response.data);
          } catch (error) {
              console.error('Error fetching wallet ID:', error);
          }
      };
  
      if (storedWallet) {
          fetchWalletId();
      }
  }, [storedWallet])

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        if (wallet.length !== 42 ) {
            alert('Invalid address')
        } else {
            try {
                const response = await axios.post('http://localhost:8080/api/users',{wallet: wallet});
                if (response.status === 200) {
                    window.localStorage.setItem('wallet', wallet);
                }
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            } 
        }
    };
  
    const handleChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleTwitterFollow = () => {
      if (!isTwitterFollowed) {
        alert('Please Follow before joining');
        setIsTwitterFollowed(true);
        setPoints(prevPoints => prevPoints + 1);
        localStorage.setItem('points', (points + 1).toString());
    }
    if (!isTwitterFollowed) {

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
            {storedWallet ? (
                <div>
                    <p>Your wallet is: {storedWallet}</p>
                    <p>your referralId is :{referralId}</p>
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
                <header className="App-header">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Wallet Address:
                            <input
                                type="text"
                                placeholder="Enter wallet address"
                                value={wallet}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </header>
            </div>
            }
        </div>
    );
}

export default Whitelist;