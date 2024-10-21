import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Home/NavBar';
import Hero from '../components/Home/Hero';
import LuxuriousRooms from '../components/Home/LuxuriousRooms';

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

      const roomDoc = await getDoc(doc(db, 'rooms', roomId));
      if (!roomDoc.exists()) {
        alert('Room not found.');
        return;
      }
      const roomData = roomDoc.data();
      const roomPrice = roomData.price;

      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      const totalPrice = roomPrice * days;

      await addDoc(collection(db, 'bookings'), {
        ...formData,
        roomId,
        userId: user.uid,
        totalPrice,
        timestamp: new Date(),
      });

      navigate('/payment', { state: { totalPrice, roomName: roomData.name } });
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
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="p-2 border border-gray-300 rounded w-full sm:w-auto" />
          
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="p-2 border border-gray-300 rounded w-full sm:w-auto" />
          
          <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required className="p-2 border border-gray-300 rounded w-full sm:w-auto" />
          
          <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required className="p-2 border border-gray-300 rounded w-full sm:w-auto" />
          
          <textarea name="specialRequests" placeholder="Special Requests" value={formData.specialRequests} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full sm:w-auto" />
          <button type="submit" onClick={handleSubmit} className="bg-gold p-2 rounded text-white w-full sm:w-auto">
            Book Now
          </button>
        </div>
      </div>
      <LuxuriousRooms />
    </div>
  );
};

export default BookRoom;
