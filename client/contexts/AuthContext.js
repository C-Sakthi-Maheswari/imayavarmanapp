import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // 'admin' or 'student'

  // Dummy login function
  const login = (email, password) => {
    // Replace with real API call later
    if (email === 'admin@example.com' && password === '1234') {
      setUserRole('admin');
      return { success: true };
    } else if (email === 'student@example.com' && password === '1234') {
      setUserRole('student');
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
