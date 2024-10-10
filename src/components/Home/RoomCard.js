// src/components/RoomList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const RoomList = ({room}) => {
  const navigate = useNavigate();

  const handleBooking = (roomId) => {
    navigate(`/book-room/${roomId}`);
  };



  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div key={room.id} className="border border-gray-300 p-4 rounded shadow-md">
          <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-t" />
          <h3 className="text-xl font-semibold mt-2">{room.name}</h3>
          <p className="text-gray-700">{room.price}</p>
          <button 
            onClick={() => handleBooking(room.id)} 
            className="bg-gold p-2 rounded text-white mt-4"
          >
            Book Now
          </button>
        </div>
    </div>
  );
};

export default RoomList;
