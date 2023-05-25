import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import LoadingMain from '../components/common/Loading/LoadingMain';

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (user === undefined) {
    return <LoadingMain />;
  }
  if (user) {
    return children;
  }

  return <Navigate to='/login' replace />;
}
