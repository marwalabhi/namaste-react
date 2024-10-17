import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import plate from "../../assets/plate.svg";
import grocery from "../../assets/groce.svg";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";
import Login from "../Login/Login.js";
import offerSvg from "../../assets/offers.png";

export const Header = () => {
  console.log("header render");

  const [showLogin, setShowLogin] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };
  return (
    <>
      <Login onClose={() => setShowLogin(false)} isLogin={showLogin} />
      <header>
        <div className="logo-container">
          <Link
            to={"/"}
            reloadDocument={true}
            style={{ textDecoration: "none" }}
          >
            <span className="brown">
              खम्मा <span className="brown">घणी सा !</span>
            </span>
          </Link>
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
              <Link to="/offers">
                <div className="offerContainer">
                  <img className="offerPng" src={offerSvg} />
                  <span>Offers</span>
                  <sup className="newOffer"> NEW </sup>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/grocery">
                <div className="grocerySection">
                  <span className="grocery_String">Grocery</span>
                  <img
                    className="groceryImg"
                    src={grocery}
                    alt="grocery Image"
                  />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link onClick={handleLoginClick}>Sign In</Link>
            </li>
            <li>
              <Link to={"/cart"}>
                <div className="cart">
                  <span className="plate_cart">
                    <img className="plateSvg" src={plate} />
                    <span className="plate_count">{cartItems.length}</span>
                  </span>
                  <span className="cartString">Cart</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
