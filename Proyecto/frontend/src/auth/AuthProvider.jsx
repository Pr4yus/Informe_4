
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api'; 

const AuthCtx = createContext(null);

export function useAuth() {
  return useContext(AuthCtx);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('campus.token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.get('/me')  
        .then(res => setUser(res.data))
        .catch(() => setUser(null)); 
    }
    setBooting(false);
  }, []);

  async function login(registro, password) {
    const { data } = await api.post('/auth/login', { registro, password });
    if (data?.token) {
      localStorage.setItem('campus.token', data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      const userData = await api.get('/me');  
      setUser(userData.data);
    }
    return data;
  }

  function logout() {
    localStorage.removeItem('campus.token');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  const value = {
    user,
    booting,
    isAuthenticated: !!user || !!localStorage.getItem('campus.token'),
    login,
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
