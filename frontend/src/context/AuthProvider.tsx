import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import type { User, AuthContextType } from "./AuthTypes";

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("AUTH PROVIDER API_URL =", API_URL);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (savedToken && savedToken !== "undefined" && savedToken !== "null") {
      setToken(savedToken);
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, userId } = res.data;
      const name = email.split("@")[0];

      const newUser: User = {
        id: userId,
        email,
        name,
        avatar_url: undefined,
      };

      setUser(newUser);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", token);

      return true;
    } catch {
      return false;
    }
  };

  // REGISTER
  const register: AuthContextType["register"] = async (
    name,
    email,
    password
  ) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const { userId } = res.data;

      const newUser = { id: userId, email };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
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
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};