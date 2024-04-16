import React from "react";

import '../components/navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
   
  return (
    <header class = 'header'>
    <div className="navbar">
    <p className="basebound"> BaseBound </p>
    <Link to ="/">Home</Link>
    <a href = "#"> NFT</a>
    <a href = "#"> The Bound</a>
    <a href = "#"> $Bound</a>
    </div>
    </header> 
  )
}

export default Navbar;