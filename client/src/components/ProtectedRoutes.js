import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoutes = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoutes;
