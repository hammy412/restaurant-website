import React from 'react';
import { Navigate } from 'react-router-dom';

const StaffProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('staffToken');

  if (!token) {
    return <Navigate to="/staff-login" />;
  }

  return children;
};

export default StaffProtectedRoute;