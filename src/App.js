import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './Admin/AdminDashboard';
import AdminRegister from './Admin/Adminregister';
import AdminLogin from './Admin/AdminLogin';
import AddRoom from './Rooms/AddRoom';
import RoomList from './Rooms/RoomList';
import Home from './components/Home';
import AboutUs from './components/About';
import Hero from './components/Home/Hero';
import RoomDetail from './components/Home/RoomDetail';
import BookRoom from './Rooms/BookRoom';
import PaymentPage from './Rooms/payment';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

const stripePromise = loadStripe('');

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/room-list" element={<RoomList />} />
        <Route path="/room-detail/:roomId" element={<RoomDetail />} />
        <Route path="/book-room/:roomId" element={<PrivateRoute element={BookRoom} />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} />
      </Routes>
      </Elements>
    </Router>
  );
}

export default App;
