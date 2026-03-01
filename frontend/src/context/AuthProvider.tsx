import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "./AuthTypes";

const API = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    Promise.resolve().then(() => {
      const u = localStorage.getItem("user");
      const t = localStorage.getItem("token");

      if (u) setUser(JSON.parse(u));
      if (t) setToken(t);
    });
  }, []);

  // LOGIN
  const login: AuthContextType["login"] = async (email, password) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      const newUser: User = {
        id: data.userId,
        email,
        name: email.split("@")[0],
      };

      setUser(newUser);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", data.token);

      return true;
    } catch {
      return false;
    }
  };

  // REGISTER
  const register: AuthContextType["register"] = async (name, email, password) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      return res.ok;
    } catch {
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // UPDATE USER
  const updateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateUser,
        loading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};