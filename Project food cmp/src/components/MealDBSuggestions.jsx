import React, { useState, useEffect } from 'react';

const MealDBSuggestions = ({ onSearchClick }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Category mappings for different food types
  const categoryMappings = {
    'Non-Vegetarian': ['Beef', 'Chicken', 'Lamb', 'Pork', 'Seafood'],
    'Vegetarian': ['Vegetarian', 'Vegan', 'Breakfast', 'Starter'],
    'Dessert': ['Dessert', 'Cake', 'Chocolate', 'Ice Cream']
  };

  // Fetch all categories first
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories || []);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch meals for selected category
  useEffect(() => {
    const fetchMeals = async () => {
      if (!selectedCategory) return;
      
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        const data = await response.json();
        setMeals(data.meals || []);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleMealClick = (mealName) => {
    onSearchClick && onSearchClick(mealName);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious suggestions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Suggestions</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🍽️ Discover Delicious Meals
        </h1>
        <p className="text-gray-600">
          Explore thousands of recipes from around the world
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.entries(categoryMappings).map(([categoryType, categoryList]) => (
            <div key={categoryType} className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {categoryType === 'Non-Vegetarian' ? '🥩' : 
                 categoryType === 'Vegetarian' ? '🥗' : '🍰'} {categoryType}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {categoryList.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white/70 text-gray-700 hover:bg-orange-100 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Category Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {selectedCategory} Recipes
        </h2>
        <p className="text-gray-600">
          Click on any meal to search for it in your area
        </p>
      </div>

      {/* Loading State for Meals */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading {selectedCategory} recipes...</p>
          </div>
        </div>
      )}

      {/* Meals Grid */}
      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {meals.slice(0, 12).map((meal) => (
            <div
              key={meal.idMeal}
              onClick={() => handleMealClick(meal.strMeal)}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30 group"
            >
              <div className="relative mb-3">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-lg group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                {meal.strMeal}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* No Meals Found */}
      {!loading && meals.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No recipes found for {selectedCategory}
          </h3>
          <p className="text-gray-600">
            Try selecting a different category
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            🎯 Ready to order?
          </h3>
          <p className="text-gray-600 mb-4">
            Click on any meal above to search for it in your local restaurants!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-3xl animate-bounce">🍕</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍔</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍣</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>🍦</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDBSuggestions; 