import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null); 
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, 'rooms'));
      const roomsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);
    };
    fetchRooms();
  }, []);

  const confirmDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'rooms', id));
      setRooms(rooms.filter(room => room.id !== id)); 
      setShowDeletePopup(false); 
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowEditPopup(true); 
  };

  const handleUpdateRoom = async () => {
    try {
      const roomDocRef = doc(db, 'rooms', editingRoom.id);
      await updateDoc(roomDocRef, {
        roomName: editingRoom.roomName,
        price: editingRoom.price,
        description: editingRoom.description,
        image: editingRoom.image,
      });
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };


  const closeDeletePopup = () => {
    setRoomToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <div>
      <h2>Room List</h2>
      <div  >
        {rooms.length === 0 ? (
          <p>No rooms available</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="bg-brown-500 text- rounded-lg flex items-center mb-4 p-4 shadow-md">
              <img src={room.image} alt={room.roomName}  className="w-16 h-16  object-cover mr-4" />
              <div className="flex-1">
              <h3 className="font-bold">{room.roomName}</h3>
              <p>Price:R {room.price}</p>
              <p>{room.description}</p>
              </div>
              <div className="flex space-x-2">
              <button onClick={() => setRoomToDelete(room) || setShowDeletePopup(true)} className="bg-gold p-2 rounded-full">Delete</button>
              <button onClick={() => handleEdit(room)} className="bg-gold p-2 rounded-full">Edit</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate('/admin')} style={{ marginTop: '10px' }}>Back</button>

      {/* Edit Room Popup */}
      {showEditPopup && (
        <div style={popupStyle}>
          <h3>Edit Room</h3>
          <label>Room Name:</label>
          <input
            type="text"
            value={editingRoom.roomName}
            onChange={(e) => setEditingRoom({ ...editingRoom, roomName: e.target.value })}
          />
          <label>Price:</label>
          <input
            type="number"
            value={editingRoom.price}
            onChange={(e) => setEditingRoom({ ...editingRoom, price: e.target.value })}
          />
          <label>Description:</label>
          <textarea
            value={editingRoom.description}
            onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
          />
          <label>Image URL:</label>
          <input
            type="text"
            value={editingRoom.image}
            onChange={(e) => setEditingRoom({ ...editingRoom, image: e.target.value })}
          />
          <button onClick={handleUpdateRoom}>Save</button>
          <button onClick={() => setShowEditPopup(false)}>Cancel</button>
        </div>
      )}

      {showDeletePopup && (
        <div style={popupStyle}>
          <p>Are you sure you want to delete this room?</p>
          <button onClick={() => confirmDelete(roomToDelete.id)}>Yes</button>
          <button onClick={closeDeletePopup}>No</button>
        </div>
      )}
    </div>
  );
};

const roomCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  width: '250px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '2px solid black',
  borderRadius: '10px',
  textAlign: 'center',
  zIndex: '1000',
};

export default RoomList;
