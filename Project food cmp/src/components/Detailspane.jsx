import dish from "./assets/dish.png";
import star from "./assets/star.png";
import { useEffect } from "react";

const DetailsPane = ({ details, setShowDetails }) => {
    // Log details when DetailsPane opens or details change
    useEffect(() => {
        console.log("DetailsPane opened with details:", details);
    }, [details]);

    // Platform-specific styling
    const getPlatformStyle = () => {
        switch (details?.platform?.toLowerCase()) {
            case 'swiggy':
                return 'bg-orange-500 text-white';
            case 'zomato':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getPlatformName = () => {
        return details?.platform?.toLowerCase() === 'swiggy' ? 'Swiggy' : 
               details?.platform?.toLowerCase() === 'zomato' ? 'Zomato' : 
               details?.platform || 'Unknown Platform';
    };

    return (
        <div className="bg-gradient-to-t from-gray-50 to-gray-200 text-black text-x shadow-2xl w-150 h-screen flex flex-col p-5 overflow-y-auto">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-5 mt-5">
                <h1 className="font-bold text-2xl">Details</h1>
                <button 
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    ×
                </button>
            </div>

            {/* Food Image */}
            <div className="mb-4">
                <img 
                    src={details?.img || dish} 
                    alt={details?.title || "Food item"} 
                    className="w-full h-60 object-cover rounded-2xl bg-gradient-to-t from-gray-200"
                    onError={(e) => {
                        e.target.src = dish;
                    }}
                />
            </div>

            {/* Platform Badge */}
            <div className="mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlatformStyle()}`}>
                    {getPlatformName()}
                </span>
            </div>

            {/* Dish Name */}
            <div className="mb-3">
                <p className="text-gray-500 text-sm">Dish Name</p>
                <p className="text-xl font-semibold text-gray-800">{details?.title || 'Not available'}</p>
            </div>

            {/* Restaurant Name */}
            <div className="mb-3">
                <p className="text-gray-500 text-sm">Restaurant</p>
                <p className="text-lg text-gray-800">{details?.des || 'Not available'}</p>
            </div>

            {/* Rating and Price */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={star} alt="rating" className="w-4 h-4" />
                        <span className="text-gray-700 font-medium">
                            {details?.rat || 'N/A'}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm">Price</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {details?.rate ? `₹${details.rate}` : 'Not available'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-400 my-4 w-full"></div>

            {/* Additional Information */}
            <div className="mb-4">
                <p className="text-black font-semibold mb-2">Additional Information</p>
                <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Platform:</span> {getPlatformName()}</p>
                    <p><span className="font-medium">Rating:</span> {details?.rat || 'Not available'}</p>
                    <p><span className="font-medium">Price:</span> {details?.rate ? `₹${details.rate}` : 'Not available'}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-400 my-4 w-full"></div>

            {/* Description */}
            <div className="flex-1">
                <p className="text-black font-semibold mb-2">Description</p>
                <p className="text-base text-gray-600 leading-relaxed">
                    {details?.title ? 
                        `Delicious ${details.title} from ${details.des}. This item is available on ${getPlatformName()} with a rating of ${details.rat || 'N/A'} and priced at ${details.rate ? `₹${details.rate}` : 'market price'}.` :
                        'No description available for this item.'
                    }
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
                <button 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => {
                        const orderUrl = details?.url || details?.Url;
                        if (orderUrl) {
                            window.open(orderUrl, '_blank');
                        } else {
                            alert('No order URL available for this item.');
                        }
                    }}
                >
                    Order Now
                </button>
                <button 
                    className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    onClick={() => setShowDetails(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailsPane;