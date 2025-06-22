import { v4 as uuid } from "uuid";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import React from "react";
import "./Filter.css";
import { useData } from "../../../../contexts/DataProvider";
import { categories } from "../../../../backend/db/categories";

export const Filter = () => {
  const { dispatch, state } = useData();
  const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);

  const handleReset = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    dispatch({ type: "ADD_RATINGS", payload: value });
  };

const handleCategoryChange = (categoryId) => {
  const isSelected = state.filters.categories.includes(categoryId);
  dispatch({
    type: isSelected ? "REMOVE_CATEGORY" : "ADD_CATEGORIES",
    payload: categoryId,
  });
};
  const handleSortChange = (sortValue) => {
    dispatch({ type: "ADD_SORT", payload: sortValue });
  };

  const handlePriceChange = (priceRange) => {
    dispatch({ type: "ADD_PRICE", payload: priceRange });
  };

  return (
    <div>
      <div className={isFilterMenuOn ? "filter-container filter-container-mobile-open" : "filter-container filter-container-mobile-closed"}>
        <div className={!isFilterMenuOn ? "filter-header filter-header-mobile-closed" : "filter-header filter-header-mobile-open"}>
          <span className="close-tab" onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}>
            {!isFilterMenuOn ? <TbAdjustmentsHorizontal /> : <RxCross2 />}
          </span>
          <h2>Filters</h2>
          <button className={isFilterMenuOn ? "reset-btn" : "reset-btn-hide"} onClick={handleReset}>Reset</button>
        </div>

        <div className={isFilterMenuOn ? "filter-types-container filter-types-container-mobile" : "filter-types-container"}>
          <div className="ratings-container ratings-container-mobile">
            <h3>Ratings (min)</h3>
            <div className="input-range">
              <datalist id="markers">
                <option label="0" value="0" />
                <option label="2.5" value="2.5" />
                <option label="5.0" value="5" />
              </datalist>
              <input
                step="0.1"
                onChange={handleRatingChange}
                id="rating"
                type="range"
                min="0"
                max="5.0"
                value={state.filters.rating || 0}
                list="markers"
              />
              <div className="rating-display">Current: {state.filters.rating || 0}</div>
            </div>
          </div>

         <div className="category-container">
            <h3>Categories</h3>
            <div className="category-input-container">
              {state.allCategories?.map(({ categoryName }) => (
                <div className="category-input-container" key={categoryName}>
                  <label htmlFor={`category-${categoryName}`}>
                    {`${categoryName} `}
                    <input
                      checked={state.filters.categories.includes(categoryName)}
                      onChange={() =>
                        dispatch({
                          type: "ADD_CATEGORIES",
                          payload: categoryName,
                        })
                      }
                      id={`category-${categoryName}`}
                      type="checkbox"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sorting-container">
            <h3>Sort by</h3>
            <div className="sorting-input-container">
              {[
                { id: "lowToHigh", label: "Price (Low to High)" },
                { id: "highToLow", label: "Price (High to Low)" },
              ].map(({ id, label }) => (
                <label htmlFor={id} key={id}>
                  <input
                    type="radio"
                    name="sort"
                    id={id}
                    checked={state.filters.sort === id}
                    onChange={() => handleSortChange(id)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};