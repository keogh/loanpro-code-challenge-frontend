import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const isAuthenticated = (): boolean => {
  // TODO: Check token expiration
  const token = localStorage.getItem('authToken');
  return !!token;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to={`${process.env.PUBLIC_URL}/login`} replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
