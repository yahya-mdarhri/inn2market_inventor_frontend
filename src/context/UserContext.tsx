import axios, { type AxiosResponse } from 'axios';
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

  const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('authToken');
    }
  }

  // Get and refresh user data
  const refreshUser = () => {
    axios.get("/api/accounts/me/")
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setAuthToken(null);
        }
        setUser(null)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  // Login function 
  const login = (credentials: LoginCredentials): Promise<void> => {
    return axios
      .post('api/accounts/login/', credentials)
      .then((res: AxiosResponse) => {
        const token = res?.data?.access || res?.data?.token || res?.data?.access_token;
        if (token) {
          setAuthToken(token);
        }
        refreshUser();
      })
      .then(() => undefined);
  }

  // Logout function
  const logout = (): Promise<void> => {
    return axios
      .get('/api/accounts/logout/')
      .finally(() => {
        setAuthToken(null);
        setUser(null);
      })
      .then(() => undefined);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
    refreshUser();
  }, [])


  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}