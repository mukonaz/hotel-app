import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
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
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p><strong>User Name:</strong> {userData.displayName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <img src={userData.photoURL} alt="Profile" width={150} />
    </div>
  );
};

export default ProfilePage;
