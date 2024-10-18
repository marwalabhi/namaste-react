import MenuShimmerUI from "../MenuShimmerUI/MenuShimmerUI";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import MenuCategory from "../MenuCategory/MenuCategory";
import "./RestaurantMenu.css";
import pureVeg from "../../assets/pureVeg.svg";
import { CDN_URL } from "../../utils/constants";
import star from "../../assets/star.svg";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [showIndex, setShowIndex] = useState(0);
  const [isfalse, setFalse] = useState(true);

  // Passing resId to Custom hook to fetch restaurant details and returns it
  const resMenu = useRestaurantMenu(resId);

  // return !resMenu ? (<MenuShimmerUI />) : ();

  if (resMenu === null) return <MenuShimmerUI />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    locality,
    cloudinaryImageId,
    avgRating,
    labels,
    sla,
    totalRatingsString,
  } = resMenu?.cards[2]?.card?.card?.info;

  // const { itemCards = []} =true ?
  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card :
  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0];

  const allCards = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const ItemCategory =
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
  const NestedItemCategory =
    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

  const itemCategies = allCards.filter(
    (c) =>
      c.card?.card?.["@type"] === ItemCategory ||
      c.card?.card?.["@type"] === NestedItemCategory
  );

  // console.log(resMenu);
  // console.log(allCards);
  // console.log("Filtered: ", itemCategies);

  // const itemCardNew = menuItem.itemCards || menuItem.categories[0].itemCards;

  return (
    <div className="menu-page-cont">
      <div className="res-menu-header">
        <div className="res-details-menu">
          <div className="res-name-menu"> {name}</div>
          <div className="sevices">
            <div>
              <span className="outlet-font">Outlet </span>
              {areaName}
            </div>
            <p className="cuisine">
              {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            <div className="rating-cont-res-info">
              <span className="star-svg-cont-res">
                <img src={star} />
              </span>
              <span className="avg-rating-str">
                {avgRating} ({totalRatingsString})
              </span>
            </div>
            <div className="res-address-cont">
              <span className="address-label">{labels[1]?.title}:</span>{" "}
              {labels[1]?.message}
            </div>
            <div className="delivery-time-str-resInfo">
              Deliverable in
              {" " + sla.slaString}
            </div>
          </div>
        </div>
        <div className="res-img-menu-design-cont">
          <img className="res-img-in-menu" src={CDN_URL + cloudinaryImageId} />
        </div>
      </div>

      <div>
        <h2 className="menuHead">MENU</h2>

        {itemCategies.map((category, index) => (
          // Controlled component
          <MenuCategory
            key={category?.card?.card?.title}
            data={category?.card}
            showItems={index === showIndex && isfalse}
            setShowIndex={() => setShowIndex(index)}
            setFalse={() =>
              setFalse(isfalse && index === showIndex ? false : true)
            } // making show Items false
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
