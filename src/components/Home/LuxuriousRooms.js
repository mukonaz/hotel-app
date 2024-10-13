import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import RoomList from './RoomCard';

const LuxuriousRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomCollection = collection(db, 'rooms');
        const roomSnapshot = await getDocs(roomCollection);
        const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="relative bg-blue-900 text-white py-10">
      <img 
        src="https://via.placeholder.com/1500x600" 
        alt="luxurious rooms background" 
        className="absolute inset-0 w-full h-full object-cover opacity-40" 
      />
      <div className="relative container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Luxurious Rooms</h2>
        <p className="mb-10">All rooms are designed for your comfort</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {rooms.map((room) => (
            <RoomList key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuxuriousRooms;
