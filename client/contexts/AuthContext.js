import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      setAuthToken(token);

      // Save user info
      const userData = res.data.user;
      setUser(userData);

      return true;
    } catch (err) {
      console.log('Login error:', err.response?.data || err.message);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setAuthToken(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        // optionally fetch user info
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
