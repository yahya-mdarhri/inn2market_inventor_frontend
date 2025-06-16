import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Ticket from './pages/Ticket/Ticket';
import Patents from './pages/Patents/Patents';
import Coniventors from './pages/Coniventors/Coniventors';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Logout from './pages/Logout/Logout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './index.css';

interface RouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/patents" element={<Patents />} />
          <Route path="/coniventors" element={<Coniventors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}