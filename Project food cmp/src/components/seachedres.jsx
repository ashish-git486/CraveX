import FoodCard from "./Food_Card_1";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import SortControls from "./SortControls";
import PlatformStats from "./PlatformStats";
import { sortFoodItems } from "../utils/sortingUtils";
import LoadingOverlay from "./loading";

export default function SearchRes({ location, dish, setDetails, setShowDetails }) {
  const [data, setData] = useState({ swiggy: [], zomato: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  
  // Sorting state
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [algorithm, setAlgorithm] = useState('bubble');
  const [sortedData, setSortedData] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // 'all', 'swiggy', 'zomato'

  useEffect(() => {
    // Only fetch if we have both location and dish
    if (!location || !dish) {
      setLoading(false);
      return;
    }

    // Use the new integrated API endpoint
    const query = `http://127.0.0.1:8000/search?location=${encodeURIComponent(location)}&dish=${encodeURIComponent(dish)}&platforms=swiggy,zomato&max_results=20`;
    console.log("Query:", query);
    setLoading(true);
    setError(false);
    
    const controller = new AbortController();
    
    fetch(query, { signal: controller.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log("API Response:", responseData);
        setApiResponse(responseData);
        
        if (responseData.success && responseData.data) {
          // Extract data from both platforms
          const swiggyData = responseData.data.swiggy || [];
          const zomatoData = responseData.data.zomato || [];
          
          setData({
            swiggy: swiggyData,
            zomato: zomatoData
          });
          setError(false);
        } else {
          setError(true);
          console.error("API returned error:", responseData.message);
        }
        setLoading(false);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          setError(true);
          setLoading(false);
          console.error("Fetch error:", error);
        }
      });

    // Cleanup function to abort fetch if component unmounts
    return () => {
      controller.abort();
    };
  }, [location, dish]);

  // Apply sorting when data, sortBy, sortOrder, algorithm, or selectedPlatform changes
  useEffect(() => {
    let dataToSort = [];
    
    if (selectedPlatform === 'all') {
      // Combine data from both platforms
      dataToSort = [...(data.swiggy || []), ...(data.zomato || [])];
    } else if (selectedPlatform === 'swiggy') {
      dataToSort = data.swiggy || [];
    } else if (selectedPlatform === 'zomato') {
      dataToSort = data.zomato || [];
    }
    
    if (dataToSort.length > 0) {
      const sorted = sortFoodItems(dataToSort, sortBy, sortOrder, algorithm);
      setSortedData(sorted);
    } else {
      setSortedData([]);
    }
  }, [data, sortBy, sortOrder, algorithm, selectedPlatform]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">Please try again later.</p>
          {apiResponse && apiResponse.message && (
            <p className="text-sm text-gray-500 mt-2">{apiResponse.message}</p>
          )}
        </div>
      </div>
    );
  }

  const totalResults = (data.swiggy?.length || 0) + (data.zomato?.length || 0);
  const platformsScraped = apiResponse?.data?.platforms_scraped || [];

  return (
    <div className="w-full">
      <div className="w-full ml-3 mb-4">
        <h1 className="text-2xl text-gray-600 font-bold">Search Results</h1>
        <p className="text-sm text-gray-500 mt-1">
          Found {totalResults} items for "{dish}" in {location}
        </p>
        {apiResponse && (
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>Platforms: {platformsScraped.join(', ')}</span>
            {apiResponse.execution_time && (
              <span>Time: {apiResponse.execution_time.toFixed(2)}s</span>
            )}
          </div>
        )}
      </div>
      
      {/* Platform Statistics */}
      {apiResponse && data && (
        <div className="ml-3 mb-4">
          <PlatformStats apiResponse={apiResponse} data={data} />
        </div>
      )}
      
      {/* Platform Filter */}
      <div className="flex gap-2 mb-4 ml-3">
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedPlatform === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({totalResults})
        </button>
        <button
          onClick={() => setSelectedPlatform('swiggy')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedPlatform === 'swiggy'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Swiggy ({data.swiggy?.length || 0})
        </button>
        <button
          onClick={() => setSelectedPlatform('zomato')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedPlatform === 'zomato'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Zomato ({data.zomato?.length || 0})
        </button>
      </div>
      
      {/* Sorting Controls */}
      {sortedData.length > 0 && (
        <SortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        />
      )}
      
      <div className="h-px bg-gray-400 my-1 w-full"></div>
      
      {/* Results Grid */}
      {console.log('Sorted Data:', sortedData)}
      <div className="flex justify-around gap-x-1 gap-y-5 flex-wrap overflow-auto hide-scrollbar">
        {sortedData.length > 0 ? (
          sortedData.map((item, index) => (
            <FoodCard
              key={`${item.platform || 'unknown'}-${item.restaurant}-${item.name}-${index}`}
              image={item.image}
              title={item.name}
              description={item.restaurant}
              rating={item.rating}
              price={item.price}
              platform={item.platform}
              url={item.url || item.Url}
              setDetails={setDetails}
              setShowDetails={setShowDetails}
            />
          ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-gray-500 text-lg">No results found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
            {platformsScraped.length === 0 && (
              <p className="text-gray-400 text-sm mt-2">No platforms were successfully scraped</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

