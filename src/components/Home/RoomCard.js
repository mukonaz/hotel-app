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
    <section className="bg-gray-900 py-12 w-full">
    <div className='flex flex-wrap justify-center gap-6 mt-10'>
      <div className="p-4 max-w-sm">
      <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
      <div className="flex items-center mb-3">
    
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
    </div>
    </div>
    </div>
    </section>
    
  );
};

export default RoomList;
