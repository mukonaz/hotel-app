import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
    };

    fetchRooms();
  }, []);

  const handleBookRoom = async (roomId) => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await updateDoc(roomRef, { availability: false });
      setRooms(rooms.map(room => room.id === roomId ? { ...room, availability: false } : room));
      alert('Room booked successfully!');
    } catch (error) {
      console.error("Error booking room: ", error);
    }
  };

  return (
    <div>
      <h1>Available Rooms</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {rooms.map(room => (
          <div key={room.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px' }}>
            <h2>{room.name}</h2>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price} per night</p>
            <p>{room.availability ? 'Available' : 'Not Available'}</p>
            {room.availability && <button onClick={() => handleBookRoom(room.id)}>Book Now</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
