import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:8000/login/', credentials);
    setUser(response.data.user);
    // Store token in local storage or context
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Optionally, you can verify token and get user info on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user info based on token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};