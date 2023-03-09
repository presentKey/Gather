import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (user === undefined) {
    return <></>;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
}
