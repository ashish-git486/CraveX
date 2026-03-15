import star from "./assets/star.png";
import alterImage from "./assets/altImg.png";

export default function FoodCard({ image, title, description, rating, price, platform, setDetails, setShowDetails, url }) {
    // Platform-specific styling
    const getPlatformStyle = () => {
        switch (platform?.toLowerCase()) {
            case 'swiggy':
                return 'bg-orange-500 text-white';
            case 'zomato':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getPlatformName = () => {
        return platform?.toLowerCase() === 'swiggy' ? 'Swiggy' : 
               platform?.toLowerCase() === 'zomato' ? 'Zomato' : 
               platform || 'Unknown';
    };

    return (
        <div className="bg-white hover:border-1 hover:border-gray-300 rounded-2xl flex flex-col items-center justify-center w-auto p-2 transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => {
            setDetails({ 
                img: image, 
                title: title, 
                des: description, 
                rat: rating, 
                rate: price,
                platform: platform,
                url: url
            })
            setShowDetails(true)
        }}
        >
            {/* Platform Badge */}
            <div className="w-full flex justify-end mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformStyle()}`}>
                    {getPlatformName()}
                </span>
            </div>

            <img 
                src={image === null ? alterImage : image} 
                alt={title} 
                className="w-80 h-60 object-cover rounded-2xl" 
                onError={(e) => {
                    e.target.src = alterImage;
                }}
            />
            
            <div className="w-full mt-3">
                <div className="flex flex-row items-center justify-between mb-2">
                    <div className="max-w-60">
                        <h1 className="font-semibold text-gray-800">{title}</h1>
                    </div>
                    <div className="bg-green-500 w-12 h-5 rounded-xl flex gap-1 items-center justify-center text-xs text-white font-bold transform transition-transform duration-200 hover:scale-110">
                        <img src={star} alt="rating" className="w-3 h-3" />
                        <p>{rating || 'N/A'}</p>
                    </div>
                </div>
                
                <div className="flex flex-row items-center justify-between mb-2">
                    <div className="max-w-60">
                        <p className="text-gray-500 text-sm truncate">{description}</p>
                    </div>
                    <p className="text-gray-700 font-semibold text-sm">
                        {price ? `₹${price}` : 'Price not available'}
                    </p>
                </div>
            </div>
        </div>
    );
}