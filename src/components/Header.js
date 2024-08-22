import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [btnName, setBtnName] = useState("Sign In");

  return (
    <div className="header">
      <div className="logo-container">
        <span className="brown">
          खम्मा <span className="brown">घणी सा !</span>{" "}
        </span>
      </div>
      <span className="raj">
        <span className="green">FIND</span> YOUR FAVORITE{" "}
        <span className="pink">RAJASTHANI</span> FOOD
      </span>
      <div className="nav-items">
        <ul className="navOptions">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                btnName === "Sign In"
                  ? setBtnName("Sign Out")
                  : setBtnName("Sign In");
                console.log(btnName);
              }}
            >
              {btnName}
            </a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
