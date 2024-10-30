import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from Firebase with query
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Use query to fetch all documents in the "booking" collection
        const bookingCollectionRef = collection(db, 'booking');
        const bookingQuery = query(bookingCollectionRef);
        const querySnapshot = await getDocs(bookingQuery);

        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Error fetching bookings. Please check permissions.");
      }
    };

    fetchBookings();
  }, []);

  const handleApproval = async (bookingId, status) => {
    try {
      const bookingRef = doc(db, 'booking', bookingId);
      await updateDoc(bookingRef, { status });
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin - Room Bookings</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 font-semibold">Room ID</th>
                <th className="p-3 font-semibold">User ID</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="p-3">{booking.roomId}</td>
                  <td className="p-3">{booking.userId}</td>
                  <td className="p-3">${booking.price}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        booking.status === 'approved'
                          ? 'bg-green-200 text-green-700'
                          : booking.status === 'rejected'
                          ? 'bg-red-200 text-red-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleApproval(booking.id, 'approved')}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      disabled={booking.status === 'approved'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(booking.id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={booking.status === 'rejected'}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
