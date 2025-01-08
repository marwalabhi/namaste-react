import { useDispatch, useSelector } from "react-redux";
import ItemList from "../ItemList/ItemList";
import { clearCart } from "../../utils/Redux Store/cartSlice";
import "./Cart.css";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";

const Styling = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid grey;
  color: purple;
  padding: 20px;
  cursor: pointer;
  font-weight: 580;
`;

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const prices = cartItems.map((item) =>
    item.item.card.info.price
      ? item.item.card.info.price / 100
      : item.item.card.info.defaultPrice / 100
  );
  const quantities = cartItems.map((item) => item.quantity);
  const totalPrice = prices.reduce((acc, curr, index) => {
    return acc + curr * quantities[index];
  }, 0);

  return (
    <div className="cartDesign">
      <div className="c-cart-head-contaier">
        <div className="c-your-cart-heading">Your Cart</div>
        <button className="clear_btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <hr className="cartHrLine"></hr>
      {cartItems.length === 0 ? (
        <div className="c-empty-Cart">
          Your Cart is empty Add items to the cart !
        </div>
      ) : (
        <div className="addedItems">
          <ItemList menuItem={cartItems} isCartView={true} />
          <Styling>
            <div className="c-to-pay-cont ">
              <span className="c-to-pay-heading ">TO PAY</span>
              <span className="c-total-price-value font-inter">
                {totalPrice}
              </span>
            </div>
          </Styling>
        </div>
      )}
    </div>
  );
};

export default Cart;
