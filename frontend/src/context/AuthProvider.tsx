import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import type { User, AuthContextType } from "./AuthTypes";

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (saved) setUser(JSON.parse(saved));
    if (savedToken) setToken(savedToken);
  }, []);

  const login: AuthContextType["login"] = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register: AuthContextType["register"] = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (updated: User) => {
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};