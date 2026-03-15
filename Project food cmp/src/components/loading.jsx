import React, { useState, useEffect } from 'react';

const LoadingOverlay = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const loadingSteps = [
    "🍕 Searching for delicious food...",
    "🏪 Finding the best restaurants...",
    "⭐ Checking ratings and reviews...",
    "💰 Comparing prices...",
    "📱 Preparing your results...",
    "🎉 Almost ready!"
  ];

  const foodEmojis = ['🍕', '🍔', '🍜', '🍣', '🍟', '🌮', '🍦', '🍰', '🥗', '🍖'];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return loadingSteps.length - 1;
        }
        return prev + 1;
      });
    }, 1500);

    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-100/80 via-yellow-100/80 to-red-100/80 backdrop-blur-md flex items-center justify-center z-50">
      {/* Glass effect container */}
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-96 shadow-2xl text-center relative overflow-hidden border border-white/30">
        {/* Glass overlay for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20 blur-sm"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {foodEmojis.map((emoji, index) => (
            <div
              key={index}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <span className="text-2xl opacity-30 backdrop-blur-sm">{emoji}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Animated food icon */}
          <div className="mb-6">
            <div className="text-6xl animate-pulse mb-2 drop-shadow-lg">🍽️</div>
            <div className="text-4xl animate-bounce drop-shadow-lg" style={{ animationDelay: '0.5s' }}>
              {foodEmojis[Math.floor(progress / 10) % foodEmojis.length]}
            </div>
          </div>

          {/* Progress bar with glass effect */}
          <div className="mb-6">
            <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-3 mb-2 border border-white/20">
              <div 
                className="bg-gradient-to-r from-orange-400/80 via-red-500/80 to-pink-500/80 h-3 rounded-full transition-all duration-300 ease-out backdrop-blur-sm border border-white/30"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-700 font-medium drop-shadow-sm">
              {Math.round(Math.min(progress, 100))}% Complete
            </div>
          </div>

          {/* Loading message */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 drop-shadow-sm">
              {loadingSteps[currentStep]}
            </h2>
            <div className="text-3xl animate-pulse drop-shadow-sm">{dots}</div>
          </div>

          {/* Fun facts with glass effect */}
          <div className="text-xs text-gray-600 mb-4">
            <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              💡 Did you know? The average person spends 67 minutes per day eating!
            </div>
          </div>

          {/* Loading animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-orange-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30"></div>
            <div className="w-3 h-3 bg-red-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-400/80 rounded-full animate-bounce backdrop-blur-sm border border-white/30" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Encouraging message */}
          <div className="mt-4 text-sm text-gray-700">
            <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              {progress < 30 && "🔍 Searching far and wide..."}
              {progress >= 30 && progress < 60 && "📊 Analyzing options..."}
              {progress >= 60 && progress < 90 && "✨ Almost there..."}
              {progress >= 90 && "🎯 Final touches..."}
            </div>
          </div>
        </div>

        {/* Decorative elements with glass effect */}
        <div className="absolute top-4 right-4 text-2xl animate-spin drop-shadow-lg" style={{ animationDuration: '3s' }}>
          ⭐
        </div>
        <div className="absolute bottom-4 left-4 text-2xl animate-pulse drop-shadow-lg">
          🍕
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay; 