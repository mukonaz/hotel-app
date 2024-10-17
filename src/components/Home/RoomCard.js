import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomList = ({ room }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleBooking = (roomId) => {
    navigate(`/book-room/${roomId}`);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-gray-700 w-full container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div key={room.id} className="border border-gray-300 p-4 rounded shadow-md text-white">
        <h3>{room.roomName}</h3>
        <img src={room.image} alt={room.roomName} />
        <h4>Room Type: {room.roomtype}</h4>
        <p>Price: R{room.price}</p>
        
        {showDetails && (
          <>
            <p>Adult: {room.adult}</p>
            <p>Children: {room.children}</p>
            <p>{room.description}</p>
          </>
        )}

        <button
          onClick={toggleDetails}
          className="bg-green-500 p-2 rounded text-white mt-4"
        >
          {showDetails ? "View Less" : "View More"}
        </button>

        <button
          onClick={() => handleBooking(room.id)}
          className="bg-gold p-2 rounded text-white mt-4 ml-2"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomList;
