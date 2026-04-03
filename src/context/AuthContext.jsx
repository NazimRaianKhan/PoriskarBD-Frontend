import { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser, logoutUser } from '../services/authService';
import { storage } from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) storage.setToken(token);
    else storage.removeToken();
  }, [token]);

  useEffect(() => {
    if (user) storage.setUser(user);
    else storage.removeUser();
  }, [user]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await loginUser(payload);
      setToken(data.token);
      setUser({ name: data.name, email: data.email, role: data.role });
      toast.success('Login successful');
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Current backend may not have logout yet.
    }
    storage.clearAuth();
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, token, loading, login, logout, setUser }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
