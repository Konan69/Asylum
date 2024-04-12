import React from "react";
import { useState } from 'react'
import { useEffect } from 'react'
// import './App.css'
import axios  from 'axios'
// import { response } from 'express'

function Whitelist() {
    // State to store the wallet address
    const [wallet, setWalletAddress] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission
      try {
        // Make a POST request to your API endpoint
        const response = await axios.post('/api/users',{wallet: wallet});
  
        // Handle the response here (e.g., show a success message)
        console.log(response.data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error:', error);
      }
    };
  
    // Function to handle changes in the wallet address input
    const handleChange = (event) => {
      setWalletAddress(event.target.value);
    };
  
  return <div>
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

  </div>
}

export default Whitelist;