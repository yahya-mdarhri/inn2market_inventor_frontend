import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout';

import Dashboard from '@pages/Dashboard/Dashboard';
import Profile from '@pages/Profile/Profile';
import Settings from '@pages/Settings/Settings';
import Tickets from '@pages/Tickets/Tickets';
import Login from '@pages/Login/Login';
import CreateTicket from './pages/CreateTicket/CreateTicket';
import TicketDetails from './pages/TicketDetails/TicketDetails';
import CoInventors from './pages/CoInventors/CoInventors';
import Patents from '@pages/Patents/Patents';
import PatentDetails from '@pages/PatentDetails/PatentDetails';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
import ResetPassword from '@pages/ResetPassword/ResetPassword';
import CreateAccount from '@pages/CreateAccount';


export const AppRouter = () => (
  <Routes>
    {/* Public access routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
    <Route path="/create-account" element={<CreateAccount />} />

    {/* Protected access routes */}
    <Route path="/" element={<ProtectedLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="tickets" element={<Outlet />}>
        <Route index element={<Tickets />} />
        <Route path="create" element={<CreateTicket />} />
        <Route path=":id" element={<TicketDetails />} />
      </Route>
      <Route path="coinventors" element={<CoInventors />} />
      <Route path="patents" element={<Outlet />} >
        <Route index element={<Patents />} />
        <Route path=":id" element={<PatentDetails />} />
      </Route>
    </Route>
  </Routes>
)
