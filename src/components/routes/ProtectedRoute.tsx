import { useAuth } from '@context/UserContext';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


// ProtectedRoute Properties
interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children = <></> }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // If user is not authenticated, don't render children
  if (!user) {
    return null;
  }
  
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;