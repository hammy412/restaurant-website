import React from 'react';
import { Navigate } from 'react-router-dom';

const CustomerProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('customerToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default CustomerProtectedRoute;