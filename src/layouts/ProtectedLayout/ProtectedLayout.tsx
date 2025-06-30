import ProtectedRoute from '@components/routes/ProtectedRoute';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { useAuth } from '@context/UserContext';

// Protected layout wrapper
const ProtectedLayout = ({ children } : {children : ReactNode}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <ProtectedRoute>
      <MainLayout>
        {children? children : <Outlet />}
      </MainLayout>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;