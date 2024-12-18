import ItemList from "../ItemList/ItemList";
import arrow from "../../assets/arrow.svg";
import "./MenuCategory.css";
import { useState } from "react";

const ItemCategory =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

const NestedItemCategory =
  "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

const MenuCategory = ({ data, showItems, setShowIndex, setFalse }) => {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const handleClick = (index) => {
    setCategoryIndex(index);
    setShowIndex();
    setFalse();
  };

  const count = data?.card?.itemCards?.length || data?.categories?.length;
  const dataType = data?.card["@type"];

  const { itemCards } = data?.card["@type"] === ItemCategory && data.card;

  const nestedItemCards =
    data.card["@type"] === NestedItemCategory &&
    data?.card?.categories?.length > 0
      ? data?.card?.categories.map((d) => d.itemCards)
      : [];

  return dataType === ItemCategory ? (
    <section className="resMenuCategory">
      <div className="accordian">
        <div className="accordianHeader">
          <button onClick={() => handleClick(0)} className="category_btn">
            <span className="categoryName">
              {data?.card?.title}{" "}
              {dataType === ItemCategory && "(" + count + ")"}
            </span>
            <span className="icon">
              <img src={arrow} />
            </span>
          </button>
        </div>
        <div className="menuCategoryBody">
          {/* restaurant food for each category */}
          {showItems && <ItemList menuItem={itemCards} button={true} />}
        </div>
      </div>
    </section>
  ) : (
    dataType === NestedItemCategory && (
      <section className="nestedCategory">
        <div className="accordian main_container">
          <div className="nes-cat-titleName-head">
            <h2 className="categoryName nestedCatName">{data?.card?.title}</h2>
          </div>

          {data?.card?.categories?.map((nestedCategory, index) => (
            <>
              <div key={nestedCategory.id}>
                <button
                  onClick={() => handleClick(index)}
                  className="category_btn"
                >
                  <h3 className="nested-cat-item-head">
                    {nestedCategory?.title}{" "}
                    {dataType === NestedItemCategory &&
                      "(" + nestedCategory?.itemCards.length + ")"}
                  </h3>
                  <span className="icon">
                    <img src={arrow} />
                  </span>
                </button>
              </div>

              <div className="menuCategoryBody">
                {showItems && categoryIndex === index && (
                  <ItemList
                    menuItem={nestedItemCards[categoryIndex]}
                    button={true}
                  />
                )}
                {index + 1 < data?.card?.categories?.length && (
                  <div className="hr_line"></div>
                )}
              </div>
            </>
          ))}
        </div>
      </section>
    )
  );
};

export default MenuCategory;
