import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import { addItem, removeItem } from "../../utils/Redux Store/cartSlice";
import "./ItemList.css";
import menuStar from "../../assets/menuItemStar.svg";
import bestSellerB from "../../assets/best-seller-badge-icon.png";

const ItemList = ({ menuItem, isCartView }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  // Check item quantity in the cart
  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(
      (item) => item?.item?.card?.info?.id === itemId
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  };
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <>
      {menuItem?.length == 0 ? (
        <></>
      ) : (
        menuItem.map((item, index) => {
          const itemData = isCartView ? item.item : item;
          const itemQuantity = isCartView
            ? item.quantity
            : getItemQuantity(itemData?.card?.info?.id);

          return (
            <div key={itemData?.card?.info?.id}>
              <div className="accBody">
                <div className="dish_Container">
                  <div className="dish_details">
                    <div className="dish-detail-badge-cont">
                      <div className="vegnonveg-icon-svg-like">
                        {itemData.card.info.isVeg ? (
                          <div className="veg-icon-menu">VEG</div>
                        ) : (
                          <div className="nonveg-icon-menu">NON-VEG</div>
                        )}
                      </div>

                      {itemData?.card?.info?.isBestseller && (
                        <div className="best-seller-badge">
                          <img
                            className="best-seller-befor-badge"
                            src={bestSellerB}
                          />
                          {itemData?.card?.info?.ribbon?.text}
                        </div>
                      )}
                    </div>

                    <span className="dish-name-title">
                      {itemData?.card?.info?.name}
                    </span>

                    <span className="dishPrice">
                      <span>
                        {itemData.card.info.price
                          ? itemData?.card?.info?.price / 100
                          : itemData?.card?.info?.defaultPrice / 100}
                      </span>
                    </span>
                    <div className="rating-container">
                      {itemData?.card?.info?.ratings?.aggregatedRating
                        ?.rating && (
                        <span className="star-container-menu">
                          <img src={menuStar} />
                        </span>
                      )}

                      {itemData?.card?.info?.ratings?.aggregatedRating
                        ?.rating && (
                        <span className="rating-int">
                          {
                            itemData?.card?.info?.ratings?.aggregatedRating
                              ?.rating
                          }
                        </span>
                      )}
                      {itemData?.card?.info?.ratings?.aggregatedRating
                        ?.rating && (
                        <span className="rating-count-con">
                          (
                          {
                            itemData?.card?.info?.ratings?.aggregatedRating
                              ?.ratingCountV2
                          }
                          )
                        </span>
                      )}
                    </div>

                    <p className="dishDescription">
                      {itemData?.card?.info?.description}
                    </p>
                  </div>
                  <div className="dishImage">
                    <div className="isImage">
                      {itemData?.card?.info?.imageId && (
                        <img
                          src={CDN_URL + itemData?.card?.info?.imageId}
                          loading="lazy"
                          role="presentation"
                          decoding="async"
                          fetchpriority="high"
                        />
                      )}
                    </div>
                    <div className="addButtonContainer">
                      {isCartView || itemQuantity > 0 ? (
                        <div className="i-quantity-controller">
                          <button
                            className="i_minus_btn"
                            onClick={() => handleRemoveItem(itemData)}
                          >
                            -
                          </button>
                          <span className="i-item-quantity">
                            {itemQuantity}
                          </span>
                          <button
                            className="i_plus_btn"
                            onClick={() => handleAddItem(itemData)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add_btn"
                          onClick={() => handleAddItem(itemData)}
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
          );
        })
      )}
    </>
  );
};

export default ItemList;
