import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import ShimmerUI from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const AppBody = () => {
  // Local state variable - Super powerful variable ~ listofRestaurants is state variable why bcoz react is keeping an eye on it, track it. whenever it updates react will trigger its diff algorithm.
  const [listofRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  // const [count, setCount] = useState(0);

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
  };

  // Conditional Rendering

  // if (listofRestaurants.length === 0) { // it means the API doesn't responded yet
  //   return (
  //     <>
  //     <h1 className="loading">Looking for great food near you ...</h1>
  //       <ShimmerUI />
  //       <ShimmerUI />
  //     </>
  //   );
  // }
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className="netStatus">
        Looks like you are offline!! Please check your internet connection.
      </h1>
    );
  return listofRestaurants.length === 0 ? (
    <>
      <h1 className="loading">Looking for great food near you ...</h1>
      <ShimmerUI />
      <ShimmerUI />
    </>
  ) : (
    <div className="bodySection">
      <div className="search">
        <input
          type="text"
          placeholder="Search for restaurants and food"
          className="searchBox"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            // Filter the restaurant cards and update the UI
            // searchtext
            console.log(searchText);

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
          className="filter-btn"
          onClick={() => {
            const ratingFilteredList = filteredRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(ratingFilteredList);
          }}
        >
          Rating 4.0+
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/menu/" + restaurant.info.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBody;
