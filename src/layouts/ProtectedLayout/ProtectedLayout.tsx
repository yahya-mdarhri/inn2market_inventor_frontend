import ProtectedRoute from '@components/routes/ProtectedRoute';
import { Outlet } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout/MainLayout';
// Protected layout wrapper
const ProtectedLayout = () => {
    return (
      <ProtectedRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ProtectedRoute>
    );
};

export default ProtectedLayout;