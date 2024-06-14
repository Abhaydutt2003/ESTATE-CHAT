import './style.scss';

import { useState } from "react";

const types = ["buy", "rent"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const switchType = (val) => {
    setQuery((prev) => {
      return { ...prev, type: val };
    });
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type,index) => {
          return(<button
          key={index}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>);
        })}
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location"></input>
        <input
          type="text"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        ></input>
        <input
          type="text"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        ></input>
        <button>
          <img src="./search.png" alt=""></img>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
