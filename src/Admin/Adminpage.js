import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Update with the correct path to your Firebase config

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
        const bookingData = bookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (bookingId) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: 'approved' });
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b)));
    } catch (error) {
      console.error('Error approving booking:', error);
      alert('Failed to approve booking. Please try again.');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Room Bookings</h2>
      <div className="container mx-auto">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Booking Request</h3>
                <p><strong>Room ID:</strong> {booking.roomId}</p>
                <p><strong>User ID:</strong> {booking.userId}</p>
                <p><strong>Price:</strong> ${booking.totalPrice}</p>
                <p><strong>Status:</strong> {booking.status || 'Pending'}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleApprove(booking.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(booking.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No booking requests available</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
