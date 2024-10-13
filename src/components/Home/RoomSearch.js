import React from 'react';

const RoomSearch = () => {
  return (
    <div className="bg-gray-100 py-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
        <select className="p-2 border border-gray-300 rounded">
          <option>Room type</option>
          <option>Standard</option>
          <option>Luxury</option>
        </select>
        <select className="p-2 border border-gray-300 rounded">
          <option>Person</option>
          <option>1</option>
          <option>2</option>
        </select>
        <input 
          type="date" 
          className="p-2 border border-gray-300 rounded" 
          placeholder="Check In" 
        />
        <input 
          type="date" 
          className="p-2 border border-gray-300 rounded" 
          placeholder="Check Out" 
        />
        <button className="bg-gold p-2 rounded text-white">Search Room</button>
      </div>
    </div>
  );
};

export default RoomSearch;
