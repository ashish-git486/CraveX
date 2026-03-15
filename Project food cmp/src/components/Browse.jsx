import React, { useState, useEffect } from 'react';
import cate from "./assets/altImg.png"

const Browse = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Category mappings for different food types
  const categoryMappings = {
    'Non-Vegetarian': ['Chicken', 'Lamb', 'Pork', 'Seafood'],
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

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Categories</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-100/80 via-purple-100/80 to-pink-100/80 backdrop-blur-md p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-gray-800 font-bold mb-2 drop-shadow-sm">
          🍽️ Browse Food Categories
        </h1>
        <p className="text-gray-600">
          Explore thousands of recipes from around the world
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {Object.entries(categoryMappings).map(([categoryType, categoryList]) => (
            <div key={categoryType} className="text-center">
              <h3 className="text-xl text-gray-800 font-semibold mb-4 drop-shadow-sm">
                {categoryType === 'Non-Vegetarian' ? '🥩' : 
                 categoryType === 'Vegetarian' ? '🥗' : '🍰'} {categoryType}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categoryList.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                      selectedCategory === category
                        ? 'bg-orange-500/90 text-white shadow-lg scale-105'
                        : 'bg-white/30 text-gray-700 hover:bg-orange-100/50 hover:scale-105 border border-white/40'
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
        <h2 className="text-2xl text-gray-800 font-semibold mb-2 drop-shadow-sm">
          {selectedCategory} Recipes
        </h2>
        <p className="text-gray-600">
          Discover amazing {selectedCategory.toLowerCase()} dishes
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {meals.slice(0, 15).map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/40 group"
            >
              <div className="relative mb-3">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-lg group-hover:brightness-110 transition-all duration-300 drop-shadow-sm"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-orange-500/90 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  {selectedCategory}
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 drop-shadow-sm">
                {meal.strMeal}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* No Meals Found */}
      {!loading && meals.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 drop-shadow-lg">🍽️</div>
          <h3 className="text-xl text-gray-800 font-semibold mb-2 drop-shadow-sm">
            No recipes found for {selectedCategory}
          </h3>
          <p className="text-gray-600">
            Try selecting a different category
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40 mb-8 shadow-lg">
        <h3 className="text-xl text-gray-800 font-semibold mb-4 text-center drop-shadow-sm">
          📊 Browse Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-orange-500 drop-shadow-sm">{categories.length}</div>
            <div className="text-gray-600">Total Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 drop-shadow-sm">{meals.length}</div>
            <div className="text-gray-600">{selectedCategory} Recipes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 drop-shadow-sm">3</div>
            <div className="text-gray-600">Main Food Types</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg">
          <h3 className="text-xl text-gray-800 font-semibold mb-2 drop-shadow-sm">
            🎯 Ready to explore more?
          </h3>
          <p className="text-gray-600 mb-4">
            Switch between categories to discover different types of delicious food!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-3xl animate-bounce drop-shadow-lg">🥩</div>
            <div className="text-3xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.2s' }}>🥗</div>
            <div className="text-3xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.4s' }}>🍰</div>
            <div className="text-3xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.6s' }}>🍕</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
