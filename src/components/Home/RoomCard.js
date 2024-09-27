import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/book-room/${room.id}`);
  };

  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>
      <img src={room.image} alt={room.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{room.name}</h3>
      <button onClick={handleBooking}>Book Now</button>
      {/* Add more room details as needed */}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

export default RoomCard;
