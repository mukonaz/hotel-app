import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/book-room/${room.id}`);
  };

  return (
    <div style={cardStyle}>
      <img src={room.image} alt={room.name} style={imageStyle} />
      <h3>{room.name}</h3>
      <button onClick={handleBooking}>Book Now</button>
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
