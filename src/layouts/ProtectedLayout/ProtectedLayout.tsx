import ProtectedRoute from '@components/routes/ProtectedRoute';
import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import MainLayout from '@layouts/MainLayout/MainLayout';
// Protected layout wrapper
const ProtectedLayout = ({ children } : {children : ReactNode}) => {
    return (
      <ProtectedRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ProtectedRoute>
    );
};

export default ProtectedLayout;