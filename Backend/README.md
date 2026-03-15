# Food Comparison API

A FastAPI-based application that scrapes and compares food prices and restaurant information from Swiggy and Zomato using parallel threading for efficiency.

## Features

- **Parallel Scraping**: Swiggy and Zomato scraping run simultaneously for faster results
- **Multiple Platforms**: Support for both Swiggy and Zomato
- **Caching**: Built-in caching system to avoid repeated scraping
- **Error Handling**: Robust error handling with fallback mechanisms
- **RESTful API**: Clean REST API with comprehensive endpoints
- **Backward Compatibility**: Maintains compatibility with existing endpoints

## Architecture

### Core Components

1. **main.py** - FastAPI application with parallel scraping logic
2. **Swiggy.py** - Swiggy scraping implementation
3. **Zomato.py** - Zomato scraping with multiple extraction methods
4. **zomato_scraper_utils.py** - Advanced Zomato scraping utilities
5. **test_integration.py** - Integration testing script

### Parallel Processing

The system uses `concurrent.futures.ThreadPoolExecutor` to run scraping tasks in parallel:

```python
# Swiggy and Zomato scraping run simultaneously
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    swiggy_future = executor.submit(scrape_swiggy_wrapper, location, dish)
    zomato_future = executor.submit(scrape_zomato_wrapper, location, dish)
```

## Installation

1. **Clone the repository**
   ```bash
   cd Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Chrome browser** (required for Selenium)

## Usage

### Starting the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Endpoints

#### 1. Search Endpoint (POST)
```http
POST /search
Content-Type: application/json

{
    "location": "haldwani",
    "dish": "biryani",
    "platforms": ["swiggy", "zomato"],
    "max_results": 20
}
```

#### 2. Search Endpoint (GET) - Backward Compatible
```http
GET /search?location=haldwani&dish=biryani&platforms=swiggy,zomato&max_results=20
```

#### 3. Legacy Endpoint
```http
GET /hello?location=haldwani&dish=biryani
```

#### 4. Health Check
```http
GET /health
```

#### 5. Available Platforms
```http
GET /platforms
```

### Response Format

```json
{
    "success": true,
    "message": "Successfully scraped 2 platforms",
    "data": {
        "swiggy": [...],
        "zomato": [...],
        "total_results": 15,
        "platforms_scraped": ["swiggy", "zomato"],
        "search_metadata": {
            "location": "haldwani",
            "dish": "biryani",
            "platforms_requested": ["swiggy", "zomato"],
            "platforms_scraped": ["swiggy", "zomato"],
            "total_results": 15,
            "search_timestamp": "2024-01-15T10:30:00"
        }
    },
    "total_results": 15,
    "execution_time": 12.5,
    "timestamp": "2024-01-15T10:30:00"
}
```

## Scraping Methods

### Swiggy Scraping
- Uses Selenium WebDriver
- Navigates through location selection and search
- Extracts restaurant, price, rating, and image information

### Zomato Scraping
- **Primary**: Live website scraping with Selenium
- **Fallback**: Source code parsing from saved HTML
- **Structured Data**: Extracts JSON-LD data for reliability
- **Alternative**: CSS selectors and XPath for dynamic content

## Performance Features

### Caching
- 5-minute cache duration for repeated requests
- Reduces scraping time for identical searches
- Configurable cache duration

### Parallel Processing
- Swiggy and Zomato scraping run simultaneously
- Reduces total execution time by ~50%
- Configurable thread pool size

### Error Handling
- Graceful degradation if one platform fails
- Fallback mechanisms for different scraping methods
- Detailed error logging

## Testing

### Run Integration Tests
```bash
python test_integration.py
```

### Test Individual Components
```bash
# Test Swiggy scraping
python Swiggy.py

# Test Zomato scraping
python Zomato.py

# Test Zomato utilities
python zomato_scraper_utils.py
```

## Configuration

### Environment Variables
- `CACHE_DURATION`: Cache duration in seconds (default: 300)
- `MAX_WORKERS`: Maximum parallel threads (default: 2)

### Chrome Driver
The system automatically manages Chrome driver using `webdriver-manager`. Manual setup is also supported:

```python
# Automatic (recommended)
service = Service(ChromeDriverManager().install())

# Manual
service = Service('/path/to/chromedriver')
```

## Data Structure

### Restaurant Object
```json
{
    "id": 1,
    "name": "Biryani",
    "price": "₹250",
    "restaurant": "Restaurant Name",
    "rating": "4.2",
    "image": "https://example.com/image.jpg",
    "platform": "zomato",
    "address": "Restaurant address",
    "cuisine": "North Indian, Mughlai",
    "review_count": "1,234",
    "scraped_at": "2024-01-15T10:30:00",
    "execution_time": 5.2
}
```

## Error Handling

### Common Errors
1. **Chrome Driver Issues**: Automatic fallback to manual path
2. **Network Timeouts**: Retry mechanisms with exponential backoff
3. **Platform Unavailable**: Graceful degradation to available platforms
4. **Rate Limiting**: Built-in delays and user agent rotation

### Error Response Format
```json
{
    "success": false,
    "message": "Error description",
    "data": {},
    "total_results": 0,
    "execution_time": 0,
    "timestamp": "2024-01-15T10:30:00"
}
```

## Monitoring and Logging

### Performance Metrics
- Execution time per platform
- Total results count
- Cache hit/miss rates
- Error rates per platform

### Logging
- Detailed scraping logs
- Error tracking
- Performance monitoring
- Cache statistics

## Future Enhancements

1. **Additional Platforms**: Support for more food delivery platforms
2. **Price Comparison**: Advanced price comparison algorithms
3. **Real-time Updates**: WebSocket support for real-time data
4. **Machine Learning**: Price prediction and trend analysis
5. **Mobile App**: Native mobile application
6. **Database Integration**: Persistent storage for historical data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information 