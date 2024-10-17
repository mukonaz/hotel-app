import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setAdminData(userDoc.data());
          } else {
            console.error('No such document!');
          }
        } else {
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin-login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Giggle Resort</h1>
      {adminData ? (
        <>
          <img
            src={adminData.picture || "https://via.placeholder.com/150"}
            alt="Admin"
            style={{ borderRadius: '50%', width: '150px', height: '150px', alignItems: 'center' }}
          />
          <h2>{adminData.name} {adminData.surname}</h2>
          <p>Email: {auth.currentUser.email}</p>

          <div style={{ marginTop: '20px' }}>
            <div onClick={() => navigate('/add-room')} style={linkStyle}>
              <img src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/AddRoom.png?alt=media&token=52e98f4e-cb57-4c14-953f-bd8bb14362fe" alt="Add Room Icon" />
              <h3>Add Room</h3>
            </div>
            <div onClick={() => navigate('/room-list')} style={linkStyle}>
              <img src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/RoomList.png?alt=media&token=b10be3e6-df3c-4ca8-95dc-7705929895cc" alt="Room List Icon" />
              <h3>Room List</h3>
            </div>
            <div onClick={() => navigate('/dashboard')} style={linkStyle}>
              <img src="https://via.placeholder.com/100" alt="Edit Room Icon" />
              <h3>Edit Room</h3>
            </div>
          </div>

          <button onClick={handleLogout} style={{ marginTop: '20px' }} className="bg-gold text-white py-2 px-6 rounded-full font-bold">
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const linkStyle = {
  display: 'inline-block',
  margin: '20px',
  cursor: 'pointer',
  textAlign: 'center',
};

export default AdminDashboard;
