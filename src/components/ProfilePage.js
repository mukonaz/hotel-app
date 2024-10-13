import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
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
            setUserData(userDoc.data());
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
          <h3 className="font-semibold text-lg mb-2 text-center">Bookings</h3>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold">Big Offer for you!</h3>
        <div className="mt-2">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg?alt=media&token=c7b9b21d-07cf-4a63-ba7b-6a5fa8023590" // Replace with actual image URL or base64
            alt="Big Offer" 
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
