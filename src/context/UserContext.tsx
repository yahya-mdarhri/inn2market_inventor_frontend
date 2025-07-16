import axios from 'axios';
import type { User, LoginCredentials } from '@/types';
import React, { createContext, useState, useContext, useEffect } from 'react';

// User Context type definition
type UserContextType = {  
  user: User | null;
  setUser: (user: User | null) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading?: boolean;
  refreshUser?: () => void;
}

// User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access auth featers
export const useAuth = () =>  {
  const context = useContext(UserContext);
  if (!context) {
    // TODO: Improve error handling
    throw new Error('useAuth must be used within a UserProvider'); 
  }
  return context;
}

// Context provider wrapper
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Get and refresh user data
  const refreshUser = () => {
    axios.get("/api/accounts/me/")
    .then((res) => {
      setUser(res.data)
    })
    .catch(() => {
      setUser(null)
    })
    .finally (() => { 
      setLoading(false);
    })
  }

  // Login function 
  const login = (credentials: LoginCredentials) => {
    return (
      axios.post('api/accounts/login/', credentials)
      .then(() => {
        refreshUser();
      })
    )
  }

  // Logout function
  const logout = () => {
    return (
      axios.get('/api/accounts/logout/')
      .then(() => {
        setUser(null);
      })
    )
  }

  useEffect(() => {
    refreshUser();
  }, [])


  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}