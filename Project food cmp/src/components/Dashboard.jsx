import SearchBar from "./searchbar";
import { useState, useEffect } from "react";
import Add from "./AddBanner";
import Suggestion from "./Suggestion";
import Location from "./location";
import About from "./About";
import Browse from "./Browse";
import SearchRes from "./seachedres";

const Dashboard = ({ page, setDetails, setShowDetails }) => {
    const [address, setAddress] = useState('Delhi, India');
    const [searched, setSearched] = useState(false);
    const [dish, setDish] = useState('');

    // Reset search state when switching away from home page
    useEffect(() => {
        if (page !== 'home') {
            setSearched(false);
            setDish('');
        }
    }, [page]);

    // Handle search clicks from suggestion component
    const handleSuggestionSearch = (searchTerm) => {
        setDish(searchTerm);
        setSearched(true);
    };

    return (
      <div className="bg-white flex flex-col w-full h-screen pl-20 pr-20 ">
      {page==="home"&&
      <>
       <div className="sticky top-0 z-50 bg-transparent">
       <SearchBar setSearched={setSearched} setDish={setDish}/>
       <Location address={address} setAddress={setAddress} />
      </div>
      <div className="flex-1 overflow-auto space-y-6 hide-scrollbar">
        <Add />
        {searched ? (
          <SearchRes 
            location={address} 
            dish={dish} 
            setDetails={setDetails} 
            setShowDetails={setShowDetails} 
          />
        ) : (
          <Suggestion onSearchClick={handleSuggestionSearch} />
        )}
      </div>
      </>
      }
      {page==="browse"&&
        <div className="flex-1 overflow-auto hide-scrollbar">
          <Browse />
        </div>
      }
      {page==="about"&&
        <div className="flex-1 overflow-auto hide-scrollbar">
          <About />
        </div>
      }
    </div>
    );
  };
  
export default Dashboard
