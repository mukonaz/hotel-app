import { useState, useEffect } from 'react';
import { db } from '../firebase'; // adjust the path based on your folder structure
import { collection, getDocs } from 'firebase/firestore';

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'booked'));
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Error fetching bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  return { bookings, error };
};

export default useBookings;
