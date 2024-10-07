import ItemList from "../ItemList/ItemList";
import arrow from "../../assets/arrow.svg";
import "./MenuCategory.css";

const ItemCategory =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

const MenuCategory = ({ data, showItems, setShowIndex, setFalse }) => {
  const handleClick = () => {
    setShowIndex();
    setFalse();
  };
  const count = data?.itemCards?.length;
  console.log("data", data);
  
  const type = data["@type"];

  return (
    <section className="resMenuCategory">
      <div className="accordian">
        <div className="accordianHeader">
          <button onClick={handleClick} className="category_btn">
            <span className="categoryName">
              {data.title} {type === ItemCategory && "(" + count + ")"}
            </span>
            <span className="icon">
              <img src={arrow} />
            </span>
          </button>
        </div>
        <div className="menuCategoryBody">
          {/* restaurant food for each category */}
          {showItems && <ItemList menuCategory={data.itemCards} />}
        </div>
      </div>
    </section>
  );
};

export default MenuCategory;
