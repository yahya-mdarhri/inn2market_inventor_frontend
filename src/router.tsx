
import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout';

import Dashboard from '@pages/Dashboard/Dashboard';
import Profile from '@pages/Profile/Profile';
import Settings from '@pages/Settings/Settings';
import Tickets from '@pages/Tickets/Tickets';
import Login from '@pages/Login/Login';
import CreateTicket from './pages/CreateTicket/CreateTicket';
import TicketDetails from './pages/TicketDetails/TicketDetails';


export const AppRouter = () => (
  <Routes>
    {/* Public access routes */}
    <Route path="/login" element={<Login />} />

    {/* Protexted acces routes */}
    <Route path="/" element={<ProtectedLayout />}>
      <Route index path='dashboard' element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="tickets" element={<Tickets />} />
      <Route path="tickets/:id" element={<TicketDetails />} />
      <Route path="tickets/create" element={<CreateTicket />} />
    </Route>
  </Routes>
)
