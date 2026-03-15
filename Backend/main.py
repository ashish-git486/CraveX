from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import asyncio
import concurrent.futures
import time
import json
from datetime import datetime

# Import scraping functions
from Swiggy import scrape_swiggy
from zomato import scrape_zomato

# Request/Response models
class SearchRequest(BaseModel):
    location: str
    dish: str
    platforms: Optional[List[str]] = ["swiggy", "zomato"]
    max_results: Optional[int] = 30

class SearchResponse(BaseModel):
    success: bool
    message: str
    data: Dict
    total_results: int
    execution_time: float
    timestamp: str

# Initialize FastAPI app
app = FastAPI(
    title="Food Comparison API",
    description="API for comparing food prices and restaurants across Swiggy and Zomato",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for caching and rate limiting
scraping_cache = {}
CACHE_DURATION = 300  # 5 minutes

def scrape_swiggy_wrapper(location: str, dish: str, max_results: int = 20) -> List[Dict]:
    """
    Wrapper function for Swiggy scraping with error handling
    """
    try:
        print(f"Starting Swiggy scraping for {location}, {dish}")
        start_time = time.time()
        
        results = scrape_swiggy(location, dish)
        
        # Limit results and add metadata
        limited_results = results[:max_results] if results else []
        for item in limited_results:
            item["scraped_at"] = datetime.now().isoformat()
            item["execution_time"] = time.time() - start_time
        
        print(f"Swiggy scraping completed: {len(limited_results)} results")
        return limited_results
        
    except Exception as e:
        print(f"Swiggy scraping failed: {e}")
        return []

def scrape_zomato_wrapper(location: str, dish: str, max_results: int = 20) -> List[Dict]:
    """
    Wrapper function for Zomato scraping with error handling
    """
    try:
        print(f"Starting Zomato scraping for {location}, {dish}")
        start_time = time.time()
        
        # Try live scraping first
        results = scrape_zomato(location, dish)
        
       
        
        # Limit results and add metadata
        limited_results = results[:max_results] if results else []
        for item in limited_results:
            item["scraped_at"] = datetime.now().isoformat()
            item["execution_time"] = time.time() - start_time
        
        print(f"Zomato scraping completed: {len(limited_results)} results")
        return limited_results
        
    except Exception as e:
        print(f"Zomato scraping failed: {e}")
        return []

def get_cache_key(location: str, dish: str, platforms: List[str]) -> str:
    """Generate cache key for request"""
    return f"{location}_{dish}_{'_'.join(sorted(platforms))}"

def is_cache_valid(cache_key: str) -> bool:
    """Check if cached data is still valid"""
    if cache_key not in scraping_cache:
        return False
    
    cache_time = scraping_cache[cache_key]["timestamp"]
    return (datetime.now().timestamp() - cache_time) < CACHE_DURATION

async def scrape_platforms_parallel(location: str, dish: str, platforms: List[str], max_results: int) -> Dict:
    """
    Scrape multiple platforms in parallel using ThreadPoolExecutor
    """
    results = {
        "swiggy": [],
        "zomato": [],
        "total_results": 0,
        "platforms_scraped": []
    }
    
    # Create tasks for parallel execution
    tasks = []
    
    if "swiggy" in platforms:
        tasks.append(("swiggy", scrape_swiggy_wrapper, location, dish, max_results))
    
    if "zomato" in platforms:
        tasks.append(("zomato", scrape_zomato_wrapper, location, dish, max_results))
    
    # Execute tasks in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(tasks)) as executor:
        # Submit all tasks
        future_to_platform = {
            executor.submit(func, loc, dish_name, max_res): platform 
            for platform, func, loc, dish_name, max_res in tasks
        }
        
        # Collect results as they complete
        for future in concurrent.futures.as_completed(future_to_platform):
            platform = future_to_platform[future]
            try:
                platform_results = future.result()
                results[platform] = platform_results
                results["platforms_scraped"].append(platform)
                results["total_results"] += len(platform_results)
                print(f"{platform.capitalize()} completed with {len(platform_results)} results")
            except Exception as e:
                print(f"Error in {platform} scraping: {e}")
                results[platform] = []
    
    return results

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Food Comparison API",
        "version": "1.0.0",
        "endpoints": {
            "/search": "Search for food items across platforms",
            "/health": "Health check endpoint",
            "/platforms": "Get available platforms"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "swiggy": "available",
            "zomato": "available"
        }
    }

@app.get("/platforms")
async def get_platforms():
    """Get available platforms"""
    return {
        "platforms": [
            {
                "name": "swiggy",
                "description": "Swiggy food delivery platform",
                "available": True
            },
            {
                "name": "zomato",
                "description": "Zomato food delivery platform", 
                "available": True
            }
        ]
    }

@app.post("/search", response_model=SearchResponse)
async def search_food(request: SearchRequest):
    """
    Search for food items across multiple platforms in parallel
    """
    start_time = time.time()
    
    try:
        # Validate request
        if not request.location or not request.dish:
            raise HTTPException(status_code=400, detail="Location and dish are required")
        
        if not request.platforms:
            request.platforms = ["swiggy", "zomato"]
        
        # Check cache first
        cache_key = get_cache_key(request.location, request.dish, request.platforms)
        if is_cache_valid(cache_key):
            cached_data = scraping_cache[cache_key]["data"]
            return SearchResponse(
                success=True,
                message="Results retrieved from cache",
                data=cached_data,
                total_results=cached_data["total_results"],
                execution_time=time.time() - start_time,
                timestamp=datetime.now().isoformat()
            )
        
        # Perform parallel scraping
        print(f"Starting parallel scraping for {request.location}, {request.dish}")
        results = await scrape_platforms_parallel(
            request.location, 
            request.dish, 
            request.platforms, 
            request.max_results
        )
        
        # Add metadata
        results["search_metadata"] = {
            "location": request.location,
            "dish": request.dish,
            "platforms_requested": request.platforms,
            "platforms_scraped": results["platforms_scraped"],
            "total_results": results["total_results"],
            "search_timestamp": datetime.now().isoformat()
        }
        
        # Cache results
        scraping_cache[cache_key] = {
            "data": results,
            "timestamp": datetime.now().timestamp()
        }
        
        execution_time = time.time() - start_time
        
        return SearchResponse(
            success=True,
            message=f"Successfully scraped {len(results['platforms_scraped'])} platforms",
            data=results,
            total_results=results["total_results"],
            execution_time=execution_time,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        execution_time = time.time() - start_time
        raise HTTPException(
            status_code=500, 
            detail=f"Search failed: {str(e)}"
        )

@app.get("/search")
async def search_food_get(
    location: str,
    dish: str,
    platforms: str = "swiggy,zomato",
    max_results: int = 20
):
    """
    GET endpoint for backward compatibility
    """
    # Convert platforms string to list
    platform_list = [p.strip() for p in platforms.split(",")]
    
    # Create request object
    request = SearchRequest(
        location=location,
        dish=dish,
        platforms=platform_list,
        max_results=max_results
    )
    
    # Use the POST endpoint logic
    return await search_food(request)

@app.get("/hello")
async def hello(location: str, dish: str):
    """
    Legacy endpoint for backward compatibility
    """
    # Create request object
    request = SearchRequest(
        location=location,
        dish=dish,
        platforms=["swiggy", "zomato"],
        max_results=20
    )
    
    # Use the POST endpoint logic
    return await search_food(request)

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "success": False,
        "message": exc.detail,
        "data": {},
        "total_results": 0,
        "execution_time": 0,
        "timestamp": datetime.now().isoformat()
    }

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {
        "success": False,
        "message": f"Internal server error: {str(exc)}",
        "data": {},
        "total_results": 0,
        "execution_time": 0,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)