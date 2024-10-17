import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddRoom = () => {
  const [roomtype, setRoomType] = useState('');
  const [roomName, setRoomName] = useState('');
  const [price, setPrice] = useState('');
  const [adult, setAdult] = useState('');
  const [children, setChildren] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'rooms'), {
        roomtype,
        roomName,
        price,
        adult,
        children,
        description,
        image: base64Image,
      });


      setShowPopup(true);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      
      <form onSubmit={handleAddRoom} className="bg-gray-50 w-full max-w-lg p-6 rounded-b-lg shadow-md">
        <h2 className='mt-4 text-center'>Add a New Room</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Room Type</label>
          <select
            value={roomtype}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full p-2 bg-brown-600 text- rounded"
          >
            <option value="">Select room type</option>
            <option value="Standard">Standard</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            placeholder="Enter Room Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Type here Amount"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Adult</label>
          <input
            value={adult}
            onChange={(e) => setAdult(e.target.value)}
            className="w-full p-2 bg-brown-600 text- rounded"
          />
            
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Children</label>
          <input
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            className="w-full p-2 bg-brown-600 text- rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload Room Image</label>
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button type="submit"
            className="bg-gold text-white py-2 px-6 rounded-full font-bold"
          >
            Add Room
          </button>
        </div>
      </form>

      <button onClick={() => navigate('/admin')} className="bg-gold text-white py-2 px-6 rounded-full font-bold" style={{ marginTop: '20px' }}>Back</button>

      {showPopup && (
        <div style={popupStyle}>
          <p>Congratulations! You Successfully Added a New Room.</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
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
};

export default AddRoom;
