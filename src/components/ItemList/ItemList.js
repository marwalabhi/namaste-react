import { useDispatch } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import {
  addItem,
  removeItem,
  clearCart,
} from "../../utils/Redux Store/cartSlice";
import "./ItemList.css";
import { useState } from "react";

const ItemList = ({ menuCategory }) => {


  const [itemAdded, setItemAdded] = useState(false);
  console.log("menuCategory", menuCategory);
  
  
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
    setItemAdded(true);
  };

  return (
    <>
      {menuCategory.map((item) => (
        <div className="accBody" key={item.card.info.id}>
          <div className="dish_Container">
            <div className="dish_details">
              <span>{item.card.info.name}</span>
              <span className="rating">
                {item.card.info.ratings.aggregatedRating?.rating}
              </span>
              <span className="dishPrice">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
              <p className="dishDescription">{item.card.info.description}</p>
            </div>
            <div className="dishImage">
              <img
                src={CDN_URL + item.card.info.imageId}
                loading="lazy"
                role="presentation"
                decoding="async"
                fetchpriority="high"
              />
              <button className="add_btn" onClick={() => handleAddItem(item)}>
                ADD
              </button>
              {itemAdded && (
                <button className="add_btn">
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemList;
