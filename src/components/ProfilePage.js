import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);

            
            if (data.bookingsId) {
              const roomDoc = await getDoc(doc(firestore, 'rooms', data.bookingsId));
              if (roomDoc.exists()) {
                setBookedRoom(roomDoc.data());
              } else {
                console.log('No such room document!');
              }
            }
          } else {
            setError('User data not found');
          }
        } catch (err) {
          setError('Failed to load user data: ' + err.message);
        }
      } else {
        setError('User not authenticated');
      }
    };

    fetchUserData();
  }, [user, firestore]);

  const handleCancelBooking = async () => {
    try {
      await updateDoc(doc(firestore, 'users', user.uid), {
        bookedRoomId: deleteField()
      });
      setBookedRoom(null); 
    } catch (err) {
      setError('Failed to cancel booking: ' + err.message);
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="relative bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
        <button onClick={() => navigate(-1)} className="absolute top-2 left-2">
          <span className="text-xl font-bold">{'<'}</span>
        </button>
        <div className="bg-gray-300 h-40 rounded-lg overflow-hidden mb-4">
          <img 
            src={userData.photoURL} 
            alt="Profile" 
            className="object-cover h-full w-full" 
          />
        </div>
        <div className="px-4">
          <h2 className="text-lg font-bold text-center mb-4">Profile</h2>
          <div className="flex items-center mb-2">
            <span className="font-semibold">Name :</span>
            <span className="ml-2">{userData.displayName}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-semibold">Email :</span>
            <span className="ml-2">{userData.email}</span>
          </div>
          <button 
            onClick={handleEditProfile}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Edit Profile
          </button>

          <h3 className="font-semibold text-lg mb-2 text-center">Bookings</h3>
          {bookedRoom ? (
            <div className="border border-gray-300 p-4 rounded mb-4">
              <h4 className="font-semibold">{bookedRoom.name}</h4>
              <img 
                src={bookedRoom.image} 
                alt={bookedRoom.name} 
                className="w-full h-32 object-cover rounded mb-2" 
              />
              <p>{bookedRoom.features}</p>
              <button 
                onClick={handleCancelBooking}
                className="bg-red-500 text-white p-2 rounded mt-4"
              >
                Cancel Booking
              </button>
            </div>
          ) : (
            <p className="text-center">No current bookings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
