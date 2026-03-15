import React, { useState } from 'react';

function SearchBar({ setSearched, setDish }) {
  const [dish, setLocalDish] = useState('');

  const handleSearch = () => {
    if (dish.trim() === '') return;
    setDish(dish);       // send to parent
    setSearched(true);   // trigger result state
    console.log("Dish:", dish);
  };

  return (
    <div className="flex justify-center items-center w-full mt-15">
      <div className="relative w-full">
        {/* Search Input */}
        <input
          type="text"
          value={dish}
          onChange={(e) => setLocalDish(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full p-3 pl-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Search for suggestion ......"
        />

        {/* Search Icon */}
        <svg
          onClick={handleSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-orange-500 transition duration-200"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 0l6 6"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;


