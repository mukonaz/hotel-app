import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const LuxuriousRooms = () => {
  const { roomId } = useParams(); 
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (roomId) {
          const roomDoc = doc(db, 'rooms', roomId);
          const roomSnapshot = await getDoc(roomDoc);
          if (roomSnapshot.exists()) {
            setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
          } else {
            console.error('Room not found');
          }
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (!room) {
    return <div className="text-white text-center">Loading room details...</div>;
  }

  return (
    <div>
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-white text-4xl font-bold mb-2">{room.roomName}</h1>
              <h2 className="text-white text-2xl">with {room.view || 'Garden view'}</h2>
            </div>
            <div className="text-right">
              <span className="text-white text-lg">from</span>
              <p className="text-white text-5xl font-semibold">R{room.price}</p>
            </div>
          </div>
          <hr className="border-gray-700 my-6" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center mb-6">
            <div>
              <p className="font-semibold">Type</p>
              <p>{room.roomtype}</p>
            </div>
            <div>
              <p className="font-semibold">Persons</p>
              <p>{room.adult} Adults, {room.children} Children</p>
            </div>
            <div>
              <p className="font-semibold">View</p>
              <p>{room.view || 'Garden View'}</p>
            </div>
          </div>

          <hr className="border-gray-700 my-6" />
          <div className='text-white text-center'>
            <p className="font-semibold">Description</p>
            <p>{room.description}</p>
          </div>
          
          <hr className="border-gray-700 my-6" /> 
          <div  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            
              <img src={room.image} alt={room.roomName} className="rounded-lg object-cover h-56 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuriousRooms;
