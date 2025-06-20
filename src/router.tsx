import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout';

// Simple page components
const SplashScreen = () => (
  <div className="flex w-full h-screen items-center justify-center">
    Splash Screen
  </div>
);
const Login = () => (
  <div className="flex w-full h-screen items-center justify-center">
    Login
  </div>
);
const Dashboard = () => (
  <div className="flex w-full h-screen items-center justify-center">
    Dashboard
  </div>
);

// Public layout wrapper
const PublicLayout = () => {
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <SplashScreen />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
