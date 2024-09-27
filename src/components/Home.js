import React, { useEffect, useState } from 'react';
import NavBar from './Home/NavBar';
import Slideshow from './Home/Slideshow';
import RoomSearch from './Home/RoomSearch';
import RoomCard from './Home/RoomCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have a Firebase setup with Firestore

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch rooms from Firebase Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomCollection = collection(db, 'rooms'); // Adjust 'rooms' to your Firestore collection name
        const roomSnapshot = await getDocs(roomCollection);
        const roomList = roomSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <NavBar />
      <Slideshow />
      <RoomSearch />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
