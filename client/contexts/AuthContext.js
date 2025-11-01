// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api, { setAuthToken } from '../services/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       const token = res.data.token;
//       await AsyncStorage.setItem('token', token);
//       setAuthToken(token);

//       // Save user info
//       const userData = res.data.user;
//       setUser(userData);

//       return true;
//     } catch (err) {
//       console.log('Login error:', err.response?.data || err.message);
//       return false;
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem('token');
//     setUser(null);
//     setAuthToken(null);
//   };

//   useEffect(() => {
//     const loadUser = async () => {
//       const token = await AsyncStorage.getItem('token');
//       if (token) {
//         setAuthToken(token);
//         // optionally fetch user info
//       }
//     };
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 👇 Change this base URL depending on your device setup:
  // For Android Emulator use 10.0.2.2:5000
  // For physical device use your local IP (run `ipconfig` on Windows)
  const BASE_URL = 'http://localhost:5000';


  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });

      if (res.data.success) {
        // Save user role and details locally
        const userData = { email, role: res.data.role };
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
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

