import React from 'react';

const PlatformStats = ({ apiResponse, data }) => {
    if (!apiResponse || !data) {
        return null;
    }

    const swiggyCount = data.swiggy?.length || 0;
    const zomatoCount = data.zomato?.length || 0;
    const totalResults = swiggyCount + zomatoCount;
    const platformsScraped = apiResponse.data?.platforms_scraped || [];
    const executionTime = apiResponse.execution_time || 0;

    // Calculate average ratings
    const getAverageRating = (items) => {
        if (!items || items.length === 0) return 0;
        const ratings = items
            .map(item => parseFloat(item.rating))
            .filter(rating => !isNaN(rating));
        return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    };

    const swiggyAvgRating = getAverageRating(data.swiggy);
    const zomatoAvgRating = getAverageRating(data.zomato);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h3>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Execution Time</p>
                    <p className="text-lg font-bold text-blue-600">{executionTime.toFixed(2)}s</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Results</p>
                    <p className="text-lg font-bold text-green-600">{totalResults}</p>
                </div>
            </div>

            {/* Platform Comparison */}
            <div className="space-y-3">
                {/* Swiggy Stats */}
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">Swiggy</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{swiggyCount} items</span>
                        <span className="text-gray-600">Avg: {swiggyAvgRating}⭐</span>
                    </div>
                </div>

                {/* Zomato Stats */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">Zomato</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{zomatoCount} items</span>
                        <span className="text-gray-600">Avg: {zomatoAvgRating}⭐</span>
                    </div>
                </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Platforms Scraped:</span>
                    <div className="flex gap-2">
                        {platformsScraped.map((platform, index) => (
                            <span 
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    platform === 'swiggy' ? 'bg-orange-500 text-white' :
                                    platform === 'zomato' ? 'bg-red-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}
                            >
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Success Rate */}
            <div className="mt-3 text-sm text-gray-600">
                <span>Success Rate: </span>
                <span className="font-medium text-green-600">
                    {platformsScraped.length > 0 ? '100%' : '0%'}
                </span>
                <span> ({platformsScraped.length}/2 platforms)</span>
            </div>
        </div>
    );
};

export default PlatformStats; 