import { useDispatch, useSelector } from "react-redux";
import ItemList from "../ItemList/ItemList";
import { clearCart } from "../../utils/Redux Store/cartSlice";
import "./Cart.css";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems: ", cartItems);

  const { loggedInUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const Styling = styled.div`
    background-color: mistyrose;
    color: purple;
    padding: 20px;
  `;

  return (
    <div className="cartDesign">
      <h1>Cart Items</h1>
      <button className="clear_btn" onClick={handleClearCart}>
        Clear Cart
      </button>
      <hr></hr>
      {cartItems.length === 0 && (
        <h2 className="emptyCart">
          Your Cart is empty Add items to the cart !
        </h2>
      )}
      <div className="addedItems">
        
        <ItemList menuItem={cartItems} button = {false}/>
        <Styling>Craving {loggedInUser} !!</Styling>
      </div>
    </div>
  );
};

export default Cart;
