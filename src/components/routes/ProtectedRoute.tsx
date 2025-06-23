import type { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';


// ProtectedRoute Properties
interface ProtectedRouteProps {
  children: ReactNode; // The children components to render if authenticated
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  
  // Simple check - you can enhance this later
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;