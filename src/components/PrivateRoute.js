import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = auth.currentUser;

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
