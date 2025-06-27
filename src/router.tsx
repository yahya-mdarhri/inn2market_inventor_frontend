import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout';

import Dashboard from '@pages/Dashboard/Dashboard';
import Profile from '@pages/Profile/Profile';
import Settings from '@pages/Settings/Settings';
import Tickets from '@pages/Tickets/Tickets';
import Login from '@pages/Login/Login';


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
        // element: <SplashScreen />
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
    path: '/tickets',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Tickets />
      }
    ]
  },
  {
    path: '/profile',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Profile />
      }
    ]
  },
  {
    path: '/settings',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Settings />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
