import React, { useState, useEffect } from 'react';
import image from "./assets/searchill.png";

const Suggestion = ({ message, onSearchClick }) => {
  const [currentFact, setCurrentFact] = useState(0);
  const [currentTrend, setCurrentTrend] = useState(0);

  const trendingSearches = [
    { name: "Pizza", emoji: "🍕", category: "Italian" },
    { name: "Biryani", emoji: "🍚", category: "Indian" },
    { name: "Sushi", emoji: "🍣", category: "Japanese" },
    { name: "Burger", emoji: "🍔", category: "American" },
    { name: "Pasta", emoji: "🍝", category: "Italian" },
    { name: "Tacos", emoji: "🌮", category: "Mexican" },
    { name: "Ice Cream", emoji: "🍦", category: "Dessert" },
    { name: "Noodles", emoji: "🍜", category: "Asian" }
  ];

  const foodFacts = [
    "🍕 Pizza was invented in Naples, Italy in the 18th century",
    "🍣 Sushi actually means 'sour rice' in Japanese",
    "🍔 The first hamburger was created in 1900 in Connecticut",
    "🍜 Noodles were first made in China over 4,000 years ago",
    "🍦 Ice cream was first served in the White House in 1802",
    "🌮 Tacos were first mentioned in Mexican literature in 1895",
    "🍚 Biryani has over 50 different regional variations in India",
    "🍝 Pasta comes in over 600 different shapes worldwide"
  ];

  const popularCategories = [
    { name: "Fast Food", emoji: "🍟", color: "bg-orange-100" },
    { name: "Healthy", emoji: "🥗", color: "bg-green-100" },
    { name: "Desserts", emoji: "🍰", color: "bg-pink-100" },
    { name: "Beverages", emoji: "🥤", color: "bg-blue-100" },
    { name: "Street Food", emoji: "🌭", color: "bg-yellow-100" },
    { name: "Fine Dining", emoji: "🍷", color: "bg-purple-100" }
  ];

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % foodFacts.length);
    }, 4000);

    const trendInterval = setInterval(() => {
      setCurrentTrend(prev => (prev + 1) % trendingSearches.length);
    }, 3000);

    return () => {
      clearInterval(factInterval);
      clearInterval(trendInterval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-100/80 via-yellow-100/80 to-red-100/80 backdrop-blur-md p-6">
      {/* Main Search Illustration */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative">
          <img src={image} alt="Search Illustration" className="max-w-80 max-h-60 animate-pulse drop-shadow-lg" />
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce drop-shadow-lg">
            🔍
          </div>
        </div>
        <h1 className="text-3xl text-gray-800 font-bold mt-4 mb-2 drop-shadow-sm">
          {message || "What's on your mind today?"}
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          Discover delicious food from the best restaurants in your area
        </p>
      </div>

      {/* Trending Searches */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center drop-shadow-sm">
          🔥 Trending Now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingSearches.map((item, index) => (
            <div
              key={index}
              className={`bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/40 ${
                index === currentTrend ? 'ring-2 ring-orange-400 shadow-xl' : ''
              }`}
              onClick={() => onSearchClick && onSearchClick(item.name)}
            >
              <div className="text-3xl mb-2 drop-shadow-sm">{item.emoji}</div>
              <div className="font-semibold text-gray-800 drop-shadow-sm">{item.name}</div>
              <div className="text-xs text-gray-500">{item.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center drop-shadow-sm">
          🍽️ Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularCategories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/40`}
              onClick={() => onSearchClick && onSearchClick(category.name)}
            >
              <div className="text-3xl mb-2 drop-shadow-sm">{category.emoji}</div>
              <div className="font-semibold text-gray-800 drop-shadow-sm">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Facts Section */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center drop-shadow-sm">
          🧠 Did You Know?
        </h2>
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg">
          <div className="text-center">
            <div className="text-2xl mb-3 animate-pulse drop-shadow-sm">
              {foodFacts[currentFact].split(' ')[0]}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed drop-shadow-sm">
              {foodFacts[currentFact]}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center drop-shadow-sm">
          ⚡ Quick Searches
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Desserts"].map((meal, index) => (
            <button
              key={index}
              className="bg-gradient-to-r from-orange-400/90 to-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30"
              onClick={() => onSearchClick && onSearchClick(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg">
          <h3 className="text-xl text-gray-800 font-semibold mb-2 drop-shadow-sm">
            🎯 Ready to explore?
          </h3>
          <p className="text-gray-600 mb-4">
            Search for your favorite food or try something new from our trending suggestions!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-4xl animate-bounce drop-shadow-lg">🍕</div>
            <div className="text-4xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.2s' }}>🍔</div>
            <div className="text-4xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.4s' }}>🍣</div>
            <div className="text-4xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.6s' }}>🍦</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
