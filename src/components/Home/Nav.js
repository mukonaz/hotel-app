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
    <div>
      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          <button>Edit Profile</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {bookedRoom ? (
        <div>
          <h2>Your Booking</h2>
          <p>Room Name: {bookedRoom.name}</p>
          <p>Check-in Date: {bookedRoom.checkIn}</p>
          <p>Check-out Date: {bookedRoom.checkOut}</p>
          <p>Total Price: ${bookedRoom.totalPrice}</p>
          <button>Cancel Booking</button>
        </div>
      ) : (
        <p>No current bookings.</p>
      )}
    </div>
  );
};

export default ProfilePage;
