import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const adminName = "Admin Name"; 
  const adminImage = "https://via.placeholder.com/150"; 

  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Giggle resort</h1>
      <img src={adminImage} alt="Admin" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
      <h2>{adminName}</h2>

      <div style={{ marginTop: '20px' }}>
        <div onClick={() => navigate('/add-room')} style={linkStyle}>
          <img src="https://via.placeholder.com/100" alt="Add Room Icon" />
          <h3>Add Room</h3>
        </div>
        <div onClick={() => navigate('/room-list')} style={linkStyle}>
          <img src="https://via.placeholder.com/100" alt="Room List Icon" />
          <h3>Room List</h3>
        </div>
        <div onClick={() => navigate('/edit-room')} style={linkStyle}>
          <img src="https://via.placeholder.com/100" alt="Edit Room Icon" />
          <h3>Edit Room</h3>
        </div>
      </div>
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
