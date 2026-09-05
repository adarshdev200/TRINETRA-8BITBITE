// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded users for testing
  const USERS = [
    {
      id: '1',
      username: 'Admin',
      email: 'admin@trinetra.com',
      password: 'admin123',
      role: 'admin',
      department: 'Control Room'
    },
    {
      id: '2',
      username: 'Operator',
      email: 'operator@trinetra.com',
      password: 'operator123',
      role: 'operator',
      department: 'Control Room'
    },
    {
      id: '3',
      username: 'Security1',
      email: 'security@trinetra.com',
      password: 'security123',
      role: 'security',
      department: 'Security'
    }
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const applySession = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const login = async (email, password) => {
    // Real auth: ask the backend first.
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      applySession(token, user);
      return response.data;
    } catch (error) {
      // 401 = backend reachable but credentials wrong -> stop here.
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid credentials. Try: admin@trinetra.com / admin123');
      }
      // Otherwise the backend is unreachable -> offline fallback to the
      // built-in users so the dashboard still demos without the server.
      const foundUser = USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        applySession('offline-token-' + Date.now(), userWithoutPassword);
        return { token: 'offline', user: userWithoutPassword };
      }
      throw new Error('Invalid credentials. Try: admin@trinetra.com / admin123');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};