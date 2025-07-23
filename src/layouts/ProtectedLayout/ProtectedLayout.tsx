import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { useAuth } from '@context/UserContext';
// import { Progress } from '@shadcn/progress';
import { Lightbulb } from 'lucide-react';
import './protectedlayout.css';

// Protected layout wrapper
const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading-icon-wrapper">
          <span className="loading-icon-ping"></span>
          <Lightbulb className="loading-icon" strokeWidth={1.5} />
        </span>
        <span className="loading-title">Preparing your Inventor Platform...</span>
        <span className="loading-subtitle">Innovation is just a moment away</span>
      </div>
    );
  }
 

  // If user is not authenticated, return null or redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
      <MainLayout>
         <Outlet />
      </MainLayout>
  );
};

export default ProtectedLayout;