import RestaurantCard, {
  withPromotedLabel,
} from "../RestaurantCard/RestaurantCard";
import resList from "../../utils/mockData";
import { useState, useEffect } from "react";
import ShimmerUI from "../Shimmer/Shimmer";
import { json, Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import cross from "../../assets/cross1.svg";
import filter from "../../assets/filter.svg";
import "./AppBody.css";
import { ImgCategory_CDN_URL } from "../../utils/constants";

const AppBody = () => {
  // Local state variable - Super powerful variable ~ listofRestaurants is state variable why bcoz react is keeping an eye on it, track it. whenever it updates react will trigger its diff algorithm.
  const [listofRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  // const [count, setCount] = useState(0);
  const [foodCategoryImg, setFoodCategoryImg] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  const [isActive, setActive] = useState(false);
  const [isVeg, setVeg] = useState(false);

  const handleButtonClick = () => {
    setActive(!isActive);
    if (isActive) {
      setFilteredRestaurant(listofRestaurants);
    } else {
      const ratingFilteredList = filteredRestaurants.filter(
        (res) => res.info.avgRating > 4
      );
      setFilteredRestaurant(ratingFilteredList);
    }
  };

  // Styling when state changes

  const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid rgba(2, 6, 12, 0.15)",
  };
  const activeButtonStyle = {
    backgroundColor: "rgb(240, 240, 245)",
    border: "1px solid rgba(6, 6, 6, 0.75)",
  };
  const activeFilterStyle = {
    backgroundColor: "rgba(2, 6, 12, 0.15)",
  };
  const withX = {
    display: "flex",
  };
  const withoutX = {
    display: "none",
  };
  // filter logic

  const clearFilter = () => {
    setActive(false);
    setVeg(false);
    setFilteredRestaurant(listofRestaurants);
  };
  const filterVeg = () => {
    setVeg(!isVeg);
  };
  console.log("Body component rendered");

  useEffect(() => {
    // called once after initial render (empty dependency array)
    fetchData();
    console.log(
      "useEffect: render-cycle completed successfully,   effect executed"
    );

    // document.title = `You clicked ${count} times`;
  }, []);

  const fetchData = async () => {
    // getRestaurants()
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8947446&lng=75.8301169&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    if (data) console.log("Data fetched");

    const json = await data.json();
    setListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log("Coverted and stored in json");

    const filteredImg = json.data.cards[0].card.card.imageGridCards.info;
    console.log(filteredImg);
    setFoodCategoryImg(filteredImg);
    
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 className="netStatus">
        Looks like you are offline!! Please check your internet connection.
      </h1>
    );


  
    console.log(foodCategoryImg);
    



  // returning jsx

  return listofRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="bodySection">
      <div className="whatsOnYourMind">
      {foodCategoryImg.map((img)=> (
        <span key={img.id}><img src={ImgCategory_CDN_URL + img.imageId}></img></span>
      ))}
      </div>
      <hr className="hrline"></hr>
      <div className="search">
        <input
          type="text"
          placeholder="Search for restaurants and food"
          className="searchBox"
          data-testid="searchInput"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search_btn"
          onClick={() => {
            // Filter the restaurant cards and update the UI
            // searchtext
            console.log(searchText.length);
            if (searchText.length > 0) {
              const searchFilteredList = listofRestaurants.filter(
                (res) =>
                  res.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  res.info.cuisines
                    .join()
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(searchFilteredList);
            }
          }}
        >
          Search
        </button>
        {/* <div>
          <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        </div> */}
      </div>
      <div className="filter">
        <button
          className="filterCountBtn"
          style={isActive || isVeg ? activeFilterStyle : buttonStyle}
        >
          {(isActive || isVeg) && <span className="filterCount">2</span>}

          <div>Filter</div>
          <span className="show_filter">
            <img src={filter} />
          </span>
        </button>

        <button
          className="filter-btn"
          onClick={handleButtonClick}
          style={isActive ? activeButtonStyle : buttonStyle}
        >
          Rating 4.0+
          <span className="xSign" style={isActive ? withX : withoutX}>
            <img src={cross} alt="cross Sign" />
          </span>
        </button>
        <button>Fast Delivery</button>
        <button>Less than Rs. 300</button>
        <button
          onClick={filterVeg}
          style={isVeg ? activeButtonStyle : buttonStyle}
        >
          Pure Veg
          {isVeg && (
            <span className="xSign">
              <img src={cross} alt="cross Sign" />
            </span>
          )}
          {/* <span className="xSign" style={isVeg ? withX : withoutX}>
            <img src={cross} alt="cross Sign" />
          </span> */}
        </button>
        <button className="clearAllFilter" onClick={clearFilter}>
          Clear all filters
        </button>
      </div>
      <hr className="hrline"></hr>
      <h2 className="jaipurRes">
        Restaurants with online food delivery in Jaipur
      </h2>
      <div className="res-container">
        {filteredRestaurants.length === 0 && (
          <div className="notFindText">
            Can't find for text you searched for !! Search for restaurants or its dishes
          </div>
        )}
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            style={{ textDecoration: "none", color: "unset" }}
            to={"/menu/" + restaurant.info.id}
          >
            {/* If the restaurant is opened now then add a open now label to it */}
            {restaurant.info.availability.opened ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBody;
