import star from "../../assets/star.svg";
import { CDN_URL } from "../../utils/constants";
import "./RestaurantCard.css";

const RestaurantCard = ({ resData }) => {
  const { info, analytics, cta, widgetId } = resData;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    sla,
    cuisines,
    areaName,
    costForTwo,
  } = info;

  return (
    <div data-testid="#resCard" className="res-card">
      <div className="card_box">
        <img className="foodImg" src={CDN_URL + cloudinaryImageId} />
        <div className="content">
          <div className="res_name">{name}</div>
          <div className="starRating_duration">
            <img src={star} />
            <span className="rating">{avgRating} •</span>
            <div className="duration">{sla?.slaString}</div>
          </div>
          <div className="xy1 fn">{cuisines.join(", ")} </div>
          <div className="xy1">{areaName}</div>
          <div className="price">{costForTwo}</div>
        </div>
      </div>
    </div>
  );
};

// Higher Order Component

// input - RestaurantCard ==> RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    const isOpen = resData?.info?.availability?.opened;
    return (
      <div>
        <label className="promoted">{isOpen ? "Open Now" : "Closed"}</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
