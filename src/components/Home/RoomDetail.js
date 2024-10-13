import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const RoomDetail = () => {
  const { roomId } = useParams(); 
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoom(roomSnap.data());
        } else {
          setError('Room not found!');
        }
      } catch (err) {
        console.error('Error fetching room:', err);
        setError('Failed to fetch room data.');
      }
    };

    fetchRoom();
  }, [roomId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-4">{room.name}</h2>
      <img src={room.img || 'https://via.placeholder.com/600'} alt={room.name} className="mb-4" />
      <p className="text-lg">{room.features}</p>
      <p className="text-lg">Price: ${room.price}</p> 
      <p className="text-lg">Availability: {room.isAvailable ? 'Available' : 'Booked'}</p>
    </div>
  );
};

export default RoomDetail;
