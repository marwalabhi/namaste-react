import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import plate from "../../assets/plate.svg";
import grocery from "../../assets/groce.svg";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";

export const Header = () => {
  console.log("header render");

  const [toggle, setToggle] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);

  const showSideMenu = () => {
    setToggle(true);
  };
  const hideSideMenu = () => {
    setToggle(false);
  };
  const loginStyle = {
    transform: toggle ? "translateX(0%)" : "translateX(100%)",
    transition: "transform ease-out .3s",
  };
  return (
    <>
      <div
        className="black-overlay"
        style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
        }}
        onClick={hideSideMenu}
      >
        <div
          onClick={(evt) => evt.stopPropagation()}
          className="overlay-sidebar"
          style={loginStyle}
        >
          <h2>Login or Create an accont</h2>
          <input type="number" placholder="Phone number"></input>
          <button style={{ backgroundColor: "orange" }}>Login</button>
        </div>
      </div>
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
              <Link to="/offers">Offers <sup className="newOffer"> NEW </sup></Link>
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
              <Link onClick={() => showSideMenu()}>Sign In</Link>
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
