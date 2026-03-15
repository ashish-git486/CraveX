import React, { useState } from 'react';
import loc from "./assets/location-pin.png";

const Location = ({ address, setAddress }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullAddress, setFullAddress] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || '';
          const state = data.address.state || data.address.region || '';
          const country = data.address.country || '';
          const postcode = data.address.postcode || '';
          const full = [city, state, country, postcode].filter(Boolean).join(', ');
          setFullAddress(full);
          setAddress(city);
          setError('');
        } catch (err) {
          setError('Failed to fetch address');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Permission denied or unavailable');
        setLoading(false);
      }
    );
  };

  return (
    <div className="mb-5 flex flex-row items-center mt-3">
      <img
        src={loc}
        alt="Location pin"
        className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={getLocation}
      />
      <p className="text-xl ml-2 text-gray-800">
        {loading ? "Fetching location..." : fullAddress || address || "Delhi"}
      </p>
      {error && <p className="text-sm text-red-500 ml-4">{error}</p>}
    </div>
  );
};

export default Location;
