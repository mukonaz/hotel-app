import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProfilePage = () => {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const rooms = querySnapshot.docs.map(doc => doc.data());
        setBookedRooms(rooms);
      }
    };

    fetchBookedRooms();
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookedRooms.length > 0 ? (
        bookedRooms.map((room, idx) => (
          <div key={idx} style={cardStyle}>
            <h3>{room.name}</h3>
            <img src={room.image} alt={room.name} style={imageStyle} />
          </div>
        ))
      ) : (
        <p>You have no booked rooms.</p>
      )}
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

export default ProfilePage;
