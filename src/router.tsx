import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout';

// Simple page components
const SplashScreen = () => <div>Splash Screen</div>;
const Login = () => <div>Login</div>;
const Dashboard = () => <div>Dashboard</div>;

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
