// BookRoom.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../components/Home/NavBar'; // Adjust path as necessary
import Hero from '../components/Home/Hero'; // Adjust path as necessary
import LuxuriousRooms from '../components/Home/LuxuriousRooms'; // Adjust path as necessary

const BookRoom = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (!user) {
        navigate('/login');
        return;
      }

      await addDoc(collection(db, 'bookings'), {
        ...formData,
        roomId,
        userId: user.uid,
        timestamp: new Date(),
      });

      alert('Booking Successful!');
      navigate('/profile'); // Redirect to profile page after booking
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book the room. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-white py-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center px-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <textarea
            name="specialRequests"
            placeholder="Special Requests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <button type="submit" onClick={handleSubmit} className="bg-gold p-2 rounded text-white w-full sm:w-auto">
            Book Now
          </button>
        </div>
      </div>
      <LuxuriousRooms /> {/* Move this component to the end */}
    </div>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export default BookRoom;
