// src/App.js (updated with ProtectedRoute)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // User dashboard
import AdminDashboard from './components/AdminDashboard'; // Admin dashboard
import AddRoom from './components/AddRoom';
import RoomList from './components/RoomList';
// import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Protect admin route

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/room-list" element={<RoomList />} />
      </Routes>
    </Router>
  );
}

export default App;
