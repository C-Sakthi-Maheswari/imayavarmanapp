import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  // Dummy login
  const login = (email, password) => {
    if (email === 'admin@example.com' && password === '1234') {
      setUserRole('admin');
      return { success: true, role: 'admin' };
    } else if (email === 'student@example.com' && password === '1234') {
      setUserRole('student');
      return { success: true, role: 'student' };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  // Logout
  const logout = () => {
    setUserRole(null); // resets role, app will show Login screen
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
