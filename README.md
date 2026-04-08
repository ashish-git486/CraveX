# CraveX - Food Comparison Platform

A modern, responsive web application for discovering, comparing, and exploring food items from various sources. Built with React, Vite, and Tailwind CSS, CraveX provides an intuitive interface for food enthusiasts to make informed dining decisions.

## 🚀 Features

- **Browse & Discover**: Explore a wide variety of food items with detailed information
- **Smart Search**: Find specific dishes or restaurants quickly with intelligent search functionality
- **Detailed Information**: View comprehensive details about food items including ingredients, pricing, and nutritional information
- **Responsive Design**: Seamlessly works across desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Real-time Data**: Integration with external APIs for up-to-date food information

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite 6** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.8+** - Backend programming language
- **Selenium** - Web automation for scraping food delivery platforms
- **Chrome WebDriver** - Browser automation for dynamic content extraction
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server for FastAPI

### Development Tools
- **ESLint** - Code quality and consistency
- **Vite Plugin React** - React support for Vite

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+
- Chrome Browser (for Selenium WebDriver)

### Setup
Note: Backend is tested for Mac OS (Silicon) might needs some debugging for windows.
#### Frontend Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Project food cmp"
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

#### Backend Setup
1. **Navigate to backend directory**
   ```bash
   cd ../Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

#### Running the Application
1. **Start the backend server**
   ```bash
   # In Backend directory
   python main.py
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   # In "Project food cmp" directory
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🎯 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Backend Scripts
- `python main.py` - Start the FastAPI backend server
- `python test_integration.py` - Run integration tests
- `python Swiggy.py` - Test Swiggy scraping independently
- `python Zomato.py` - Test Zomato scraping independently

## 🗄️ Backend Architecture

### Core Components
- **FastAPI Application** (`main.py`) - Main API server with parallel scraping
- **Swiggy Scraper** (`Swiggy.py`) - Automated data extraction from Swiggy
- **Zomato Scraper** (`zomato.py`) - Multi-method scraping for Zomato platform
- **Data Models** - Pydantic models for request/response validation

### Key Features
- **Parallel Processing**: Simultaneous scraping of Swiggy and Zomato using ThreadPoolExecutor
- **Intelligent Caching**: 5-minute cache system to reduce redundant requests
- **Error Handling**: Graceful degradation and fallback mechanisms
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **Rate Limiting**: Built-in delays and user agent rotation

### API Endpoints
- `POST /search` - Primary search endpoint with JSON payload
- `GET /search` - Backward compatible search with query parameters
- `GET /health` - Health check endpoint
- `GET /platforms` - Available scraping platforms
- `GET /hello` - Legacy endpoint for compatibility

### Data Sources
- **Swiggy**: Real-time scraping with Selenium WebDriver
- **Zomato**: Multi-method extraction (live scraping, source parsing, structured data)
- **Response Format**: Structured JSON with restaurant details, pricing, ratings, and metadata

### Performance Optimizations
- **Concurrent Execution**: 50% reduction in total scraping time
- **Smart Caching**: Reduces repeated API calls
- **Error Recovery**: Automatic retries with exponential backoff
- **Resource Management**: Efficient Chrome driver management


## 🎨 UI Components

### Core Features
- **Navigation**: Sidebar navigation with Home and About sections
- **Dashboard**: Main interface for browsing food items
- **Search**: Intelligent search functionality for finding specific items
- **Food Cards**: Responsive cards displaying food information
- **Details Pane**: Comprehensive view of selected food items
- **Loading States**: Smooth loading animations for better UX

### Design System
- **Color Scheme**: Modern gradient-based design with orange accents
- **Typography**: Clean, readable fonts optimized for food content
- **Responsive Layout**: Adaptive design for all screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building. Key configurations in `vite.config.js`:
- React plugin for JSX support
- Development server settings
- Build optimization

### ESLint Configuration
Code quality is maintained through ESLint with:
- React hooks plugin
- React refresh plugin
- Modern JavaScript standards

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow React best practices and hooks patterns
- Use Tailwind CSS classes for styling
- Maintain consistent code formatting with ESLint
- Write descriptive component names and file structure
- Ensure responsive design for all components

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better food discovery tools
- Thanks to the open-source community for the amazing tools and libraries

---

**CraveX** - Your companion for discovering the perfect meal! 🍽️
