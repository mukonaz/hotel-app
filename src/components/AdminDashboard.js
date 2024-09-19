import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore instance

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', type: '', price: '', availability: true });

  useEffect(() => {
    // Fetch all rooms from Firestore
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
    };

    fetchRooms();
  }, []);

  // Add a new room
  const handleAddRoom = async () => {
    try {
      await addDoc(collection(db, 'rooms'), newRoom);
      setRooms([...rooms, newRoom]);
      alert('Room added successfully!');
      setNewRoom({ name: '', type: '', price: '', availability: true });
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  // Edit room details
  const handleEditRoom = async (roomId, updatedRoom) => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await updateDoc(roomRef, updatedRoom);
      setRooms(rooms.map(room => room.id === roomId ? { ...room, ...updatedRoom } : room));
      alert('Room updated successfully!');
    } catch (error) {
      console.error("Error updating room: ", error);
    }
  };

  // Delete a room
  const handleDeleteRoom = async (roomId) => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await deleteDoc(roomRef);
      setRooms(rooms.filter(room => room.id !== roomId));
      alert('Room deleted successfully!');
    } catch (error) {
      console.error("Error deleting room: ", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Add New Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={newRoom.name}
        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Room Type"
        value={newRoom.type}
        onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
      />
      <input
        type="number"
        placeholder="Room Price"
        value={newRoom.price}
        onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
      />
      <button onClick={handleAddRoom}>Add Room</button>

      <h2>Existing Rooms</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {rooms.map(room => (
          <div key={room.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px' }}>
            <h3>{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price} per night</p>
            <p>{room.availability ? 'Available' : 'Not Available'}</p>
            <button onClick={() => handleEditRoom(room.id, { ...room, availability: !room.availability })}>
              {room.availability ? 'Mark as Unavailable' : 'Mark as Available'}
            </button>
            <button onClick={() => handleDeleteRoom(room.id)}>Delete Room</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
