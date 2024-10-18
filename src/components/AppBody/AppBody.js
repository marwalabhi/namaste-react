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
import previousA from "../../assets/previousArrow.png";
import nextA from "../../assets/nextArrow.png";

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
  const [isFastDelivery, setFastDelivery] = useState(false);
  const [isLessThan300, setLessThan300] = useState(false);
  const [buttonCount, setButtonCount] = useState(0);

  const [slider, moveSlider] = useState(0);
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

  // Clear all filters
  const clearFilter = () => {
    setButtonCount(0);
    setActive(false);
    setVeg(false);
    setFastDelivery(false);
    setLessThan300(false);
    setFilteredRestaurant(listofRestaurants);
  };

  // Fiter logic functions
  const filter4Rating = () => {
    setActive(!isActive);
    setButtonCount(isActive ? buttonCount - 1 : buttonCount + 1);
    if (isActive) {
      setFilteredRestaurant(listofRestaurants);
    } else {
      const ratingFilteredList = filteredRestaurants.filter(
        (res) => res.info.avgRating > 4
      );
      setFilteredRestaurant(ratingFilteredList);
    }
  };
  const filterFastDelivery = () => {
    setFastDelivery(!isFastDelivery);
    setButtonCount(isFastDelivery ? buttonCount - 1 : buttonCount + 1);
    if (isFastDelivery) {
      setFilteredRestaurant(listofRestaurants);
    } else {
      const fastDeliveryTimeResList = filteredRestaurants.filter(
        (res) => res.info.sla.deliveryTime < 26
      );
      setFilteredRestaurant(fastDeliveryTimeResList);
    }
  };
  const filterLessThan300 = () => {
    setLessThan300(!isLessThan300);
    setButtonCount(isLessThan300 ? buttonCount - 1 : buttonCount + 1);
    if (isLessThan300) {
      setFilteredRestaurant(listofRestaurants);
    } else {
      const lessThan300List = filteredRestaurants.filter((res) => {
        const costInNumber = parseInt(res.info.costForTwo.match(/\d+/)[0]);
        return !isNaN(costInNumber) && costInNumber < 300;
      });
      setFilteredRestaurant(lessThan300List);
    }
  };
  const filterVeg = () => {
    setVeg(!isVeg);
    setButtonCount(isVeg ? buttonCount - 1 : buttonCount + 1);
  };

  console.log("Body component rendered");

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
    // console.log(filteredImg);
    setFoodCategoryImg(filteredImg);
  };

  useEffect(() => {
    // called once after initial render (empty dependency array)
    fetchData();
    console.log(
      "useEffect: render-cycle completed successfully,   effect executed"
    );
    console.log(listofRestaurants);

    // document.title = `You clicked ${count} times`;
  }, []);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 className="netStatus">
        Looks like you are offline!! Please check your internet connection.
      </h1>
    );

  // console.log(foodCategoryImg);
  const slideToPrevious = () => {
    moveSlider(slider - 3);
  };
  const slideToNext = () => {
    slider < 9 && moveSlider(slider + 3);
  };

  // returning jsx

  return listofRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="bodySection">
      <div className="whatsOnYourMind">
        <div className="food-cat-heading">
          <span className="home-page-heading">What's on your mind?</span>
          <div className="pn-button-container">
            <button onClick={slideToPrevious}>
              <div className="previousBtn">
                <img
                  src={previousA}
                  className="pn-arrow"
                  alt="previous button"
                />
              </div>
            </button>
            <button onClick={slideToNext}>
              <div className="nextBtn">
                <img src={nextA} className="pn-arrow" alt="next button" />
              </div>
            </button>
          </div>
        </div>
        <div className="fcat-img-container">
          {foodCategoryImg.map((img) => (
            <span
              className="cont-for-each-img"
              key={img.id}
              style={{ transform: `translateX(-${slider * 100}%)` }}
            >
              <img
                className="f-cat-img"
                src={ImgCategory_CDN_URL + img.imageId}
              ></img>
            </span>
          ))}
        </div>
      </div>
      <hr className="hrline"></hr>
      <div className="search-filter-section">
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
            style={
              isActive || isVeg || isLessThan300 || isFastDelivery
                ? activeFilterStyle
                : buttonStyle
            }
          >
            {(isActive || isVeg || isLessThan300 || isFastDelivery) && (
              <span className="filterCount">{buttonCount}</span>
            )}

            <div>Filter</div>
            <span className="show_filter">
              <img src={filter} />
            </span>
          </button>

          <button
            className="filter-btn"
            onClick={filter4Rating}
            style={isActive ? activeButtonStyle : buttonStyle}
          >
            Rating 4.0+
            <span className="xSign" style={isActive ? withX : withoutX}>
              <img src={cross} alt="cross Sign" />
            </span>
          </button>
          <button
            onClick={filterFastDelivery}
            style={isFastDelivery ? activeButtonStyle : buttonStyle}
          >
            Fast Delivery
            {isFastDelivery && (
              <span className="xSign">
                <img src={cross} alt="cross Sign" />
              </span>
            )}
          </button>
          <button
            onClick={filterLessThan300}
            style={isLessThan300 ? activeButtonStyle : buttonStyle}
          >
            Less than Rs. 300
            {isLessThan300 && (
              <span className="xSign">
                <img src={cross} alt="cross Sign" />
              </span>
            )}
          </button>
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
          </button>
          <button className="clearAllFilter" onClick={clearFilter}>
            Clear all filters
          </button>
        </div>
      </div>

      <hr className="hrline"></hr>
      <h2 className="jaipurRes home-page-heading">
        Restaurants with online food delivery in Jaipur
      </h2>
      <div className="res-container">
        {/* list of restaurants rendering */}
        {filteredRestaurants.length === 0 && (
          <div className="notFindText">
            Sorry we couldn't find any matches for{" "}
            <span className="search-text-item">{searchText}</span> !! Search for
            restaurants or its dishes
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
