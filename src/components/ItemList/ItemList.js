import { useDispatch } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import {
  addItem,
  removeItem,
  clearCart,
} from "../../utils/Redux Store/cartSlice";
import "./ItemList.css";
import { useState } from "react";
import menuStar from "../../assets/menuItemStar.svg";
import bestSellerB from "../../assets/best-seller-badge-icon.png";

const ItemList = ({ menuItem, button }) => {
  
  const [itemAdded, setItemAdded] = useState(false);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
    setItemAdded(true);
  };

  return (
    <>
      {menuItem?.length == 0 ? (
        <></>
      ) : (
        menuItem.map((item, index) => (
          <div key={item?.card?.info?.id}>
            <div className="accBody">
              <div className="dish_Container">
                <div className="dish_details">
                  <div className="dish-detail-badge-cont">
                    <div className="vegnonveg-icon-svg-like">
                      {item.card.info.isVeg ? (
                        <div className="veg-icon-menu">VEG</div>
                      ) : (
                        <div className="nonveg-icon-menu">NON-VEG</div>
                      )}
                    </div>

                    {item?.card?.info?.isBestseller && (
                      <div className="best-seller-badge">
                        <img
                          className="best-seller-befor-badge"
                          src={bestSellerB}
                        />
                        {item?.card?.info?.ribbon?.text}
                      </div>
                    )}
                  </div>

                  <span className="dish-name-title">
                    {item?.card?.info?.name}
                  </span>

                  <span className="dishPrice">
                    <span>
                      {item.card.info.price
                        ? item?.card?.info?.price / 100
                        : item?.card?.info?.defaultPrice / 100}
                    </span>
                  </span>
                  <div className="rating-container">
                    {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                      <span className="star-container-menu">
                        <img src={menuStar} />
                      </span>
                    )}

                    {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                      <span className="rating-int">
                        {item?.card?.info?.ratings?.aggregatedRating?.rating}
                      </span>
                    )}
                    {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                      <span className="rating-count-con">
                        (
                        {
                          item?.card?.info?.ratings?.aggregatedRating
                            ?.ratingCountV2
                        }
                        )
                      </span>
                    )}
                  </div>

                  <p className="dishDescription">
                    {item?.card?.info?.description}
                  </p>
                </div>
                <div className="dishImage">
                  <div className="isImage">
                    {item?.card?.info?.imageId && (
                      <img
                        src={CDN_URL + item?.card?.info?.imageId}
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        fetchpriority="high"
                      />
                    )}
                  </div>
                  <div className="addButtonContainer">
                    {button && (
                      <button
                        className="add_btn"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {index + 1 < menuItem.length && (
              <div className="categoryHRLine"></div>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default ItemList;
