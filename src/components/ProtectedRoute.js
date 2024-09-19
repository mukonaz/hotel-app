import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(AuthContext);

  // You could also add more checks here for roles if needed
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
