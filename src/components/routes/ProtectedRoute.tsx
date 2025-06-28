import { useAuth } from '@context/UserContext';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


// ProtectedRoute Properties
interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children = <></> }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is not authenticated, redirect to login page
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;