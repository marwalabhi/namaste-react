import MenuShimmerUI from "../MenuShimmerUI/MenuShimmerUI";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import MenuCategory from "../MenuCategory/MenuCategory";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [showIndex, setShowIndex] = useState(0);
  const [isfalse, setFalse] = useState(true);
  
  // Passing resId to Custom hook to fetch restaurant details and returns it
  const resMenu = useRestaurantMenu(resId);

  // return !resMenu ? (<MenuShimmerUI />) : ();

  if (resMenu === null) return <MenuShimmerUI />;

  const { name, cuisines, costForTwoMessage, areaName, locality, veg } =
    resMenu?.cards[2]?.card?.card?.info;

  // const menuItem =
  //   resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  // const { itemCards = []} =true ?
  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card :
  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0];

  // console.log(resInfo?.cards[4]?.groupedCard);
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

  console.log(resMenu);
  console.log(allCards);
  console.log("Filtered: ", itemCategies);

  // const itemCardNew = menuItem.itemCards || menuItem.categories[0].itemCards;

  // if category > 0 then fetch from it otherwise from 1st
  // console.log(resMenu);

  return (
    <div className="menu">
      <h1> {name}</h1>
      <div className="sevices">
        <div>{locality + ", " + areaName}</div>
        {veg && <div className="veg">Pure Veg </div>}
        <p className="cuisine">
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
      </div>
      <div>
        <h2 className="menuHead">MENU</h2>

        {/* categories accordian  */}

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
