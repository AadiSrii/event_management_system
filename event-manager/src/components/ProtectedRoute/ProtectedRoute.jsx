import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Adjust the path as needed

const ProtectedRoute = ({ roles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if no user is authenticated
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(user.role)) {
    // Redirect to a different page or show an error if the user role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  // Render child routes if authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
