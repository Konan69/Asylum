
import React from "react";
import { Link } from "react-router-dom";
import '../Styles/navbar.css'

function Navbar({ handleNavButtonClick }) {
  return (
    <header className="header">
      <div className="basebound"> <Link to="/">BASEBOUND</Link> </div>
      <div className="navbar">
        <button className="nav-button" onClick={() => handleNavButtonClick(1)}>NFT</button>
        <button className="nav-button" onClick={() => handleNavButtonClick(2)}>The Bound</button>
        <button className="nav-button" onClick={() => handleNavButtonClick(3)}>$BOUND</button>
      </div>
    </header>
  );
}

export default Navbar;