import React from "react";
import ReactDOM from "react-dom/client";

import IRCTCLogo from "./assets/img/IRCTC-Logo.png";
import userIcon from "./assets/img/usericon2.png";

const HeaderComponent = () => (
  <nav className="header">
    <div className="logo">
    <img src = {IRCTCLogo} alt="logo"></img>
    </div>
    <div className="searchBar">
      <input type="text" placeholder="Enter PNR no." ></input>
    </div>
    <div className="userIcon">
      <img src = {userIcon} alt="userIcon" />
      <b>Login</b>
    </div>
  </nav>
  
);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeaderComponent />);
