import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../api/axios';

interface PrivateRouteAdminProps {
  children: React.ReactNode;
}

const PrivateRouteAdmin: React.FC<PrivateRouteAdminProps> = ({ children }) => {
  const token = getAuthToken();
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRouteAdmin;