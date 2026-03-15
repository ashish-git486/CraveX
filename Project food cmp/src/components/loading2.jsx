import React, { useState, useEffect } from 'react';

const LoadingOverlay2 = () => {
  const [rotation, setRotation] = useState(0);
  const [currentFood, setCurrentFood] = useState(0);
  const [message, setMessage] = useState('');

  const foodItems = [
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Burger' },
    { emoji: '🍜', name: 'Noodles' },
    { emoji: '🍣', name: 'Sushi' },
    { emoji: '🍟', name: 'Fries' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍦', name: 'Ice Cream' },
    { emoji: '🍰', name: 'Cake' }
  ];

  const messages = [
    "Cooking up something special...",
    "Gathering the finest ingredients...",
    "Checking the chef's recommendations...",
    "Finding the perfect match for your taste...",
    "Almost ready to serve..."
  ];

  useEffect(() => {
    // Rotation animation
    const rotationInterval = setInterval(() => {
      setRotation(prev => prev + 2);
    }, 50);

    // Food item animation
    const foodInterval = setInterval(() => {
      setCurrentFood(prev => (prev + 1) % foodItems.length);
    }, 1000);

    // Message animation
    const messageInterval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(foodInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100/80 via-purple-100/80 to-pink-100/80 backdrop-blur-md flex items-center justify-center z-50">
      {/* Glass effect container */}
      <div className="bg-white/20 backdrop-blur-xl rounded-full p-12 shadow-2xl text-center relative border border-white/30">
        {/* Glass overlay for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm"></div>
        
        {/* Central plate with glass effect */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/80 to-red-500/80 rounded-full animate-pulse backdrop-blur-sm border border-white/30"></div>
          <div className="absolute inset-2 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <span className="text-4xl drop-shadow-lg">🍽️</span>
          </div>
        </div>

        {/* Rotating food items */}
        <div className="absolute inset-0 flex items-center justify-center">
          {foodItems.map((food, index) => {
            const angle = (index * 360) / foodItems.length + rotation;
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={index}
                className="absolute animate-bounce backdrop-blur-sm"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="text-2xl drop-shadow-lg">{food.emoji}</span>
              </div>
            );
          })}
        </div>

        {/* Current food highlight with glass effect */}
        <div className="mt-8 mb-4">
          <div className="text-6xl animate-bounce mb-2 drop-shadow-lg">
            {foodItems[currentFood].emoji}
          </div>
          <div className="text-lg font-semibold text-gray-800 drop-shadow-sm bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            {foodItems[currentFood].name}
          </div>
        </div>

        {/* Loading message with glass effect */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 drop-shadow-sm">
            {message}
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30"></div>
            <div className="w-2 h-2 bg-red-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress indicator with glass effect */}
        <div className="w-48 mx-auto">
          <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
            <span>Searching</span>
            <span>Found {currentFood + 1}/{foodItems.length}</span>
          </div>
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 border border-white/20">
            <div 
              className="bg-gradient-to-r from-orange-400/80 to-red-500/80 h-2 rounded-full transition-all duration-500 backdrop-blur-sm border border-white/30"
              style={{ width: `${((currentFood + 1) / foodItems.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Fun tip with glass effect */}
        <div className="mt-6 text-xs text-gray-600 max-w-xs">
          <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            🎯 Tip: Try sorting by rating to find the best-rated restaurants!
          </div>
        </div>

        {/* Decorative elements with glass effect */}
        <div className="absolute -top-4 -left-4 text-3xl animate-spin drop-shadow-lg" style={{ animationDuration: '4s' }}>
          🌟
        </div>
        <div className="absolute -top-4 -right-4 text-3xl animate-spin drop-shadow-lg" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
          ⭐
        </div>
        <div className="absolute -bottom-4 -left-4 text-2xl animate-bounce drop-shadow-lg">
          🍕
        </div>
        <div className="absolute -bottom-4 -right-4 text-2xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.5s' }}>
          🍔
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay2; 