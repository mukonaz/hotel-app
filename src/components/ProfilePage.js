import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Adjust import paths as needed
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import Loading from "./Loading";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser.uid;
      const userSnapshot = await getDoc(doc(db, "users", userId));

      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
        console.log("User data:", userSnapshot.data());

        // Fetch bookings for the current user
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", userId)
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);

        if (!bookingsSnapshot.empty) {
          const bookingData = bookingsSnapshot.docs[0].data();
          console.log("Booked room data:", bookingData);

          // Use roomId to fetch room details
          const roomRef = doc(db, "rooms", bookingData.roomId);
          const roomSnapshot = await getDoc(roomRef);

          if (roomSnapshot.exists()) {
            setBookedRoom({
              ...roomSnapshot.data(),
              checkIn: bookingData.checkIn,
              checkOut: bookingData.checkOut,
              totalPrice: bookingData.totalPrice
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="relative bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">

      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}!</h1>
          <div className="bg-gray-300 h-40 rounded-lg overflow-hidden mb-4">
          <img 
            src={userData.photoURL} 
            alt="Profile" 
            className="object-cover h-full w-full" 
          />
        </div>
          
          <p>Email: {userData.email}</p>
          <button>Edit Profile</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

<h3 className="font-semibold text-lg mb-2 text-center">Bookings</h3>
      {bookedRoom ? (
        <div className="border border-gray-300 p-4 rounded mb-4">
          <h2>Your Booking</h2>
          <p>Room Name: {bookedRoom.roomName}</p>
          <img 
                src={bookedRoom.image} 
                alt={bookedRoom.name} 
                className="w-full h-32 object-cover rounded mb-2" 
              />
          <p>Check-in Date: {bookedRoom.checkIn}</p>
          <p>Check-out Date: {bookedRoom.checkOut}</p>
          <p>Total Price: ${bookedRoom.totalPrice}</p>
          <button className="bg-red-500 text-white p-2 rounded mt-4">Cancel Booking</button>
        </div>
      ) : (
        <p>No current bookings.</p>
      )}
    </div>
    </div>
  );
};

export default ProfilePage;
