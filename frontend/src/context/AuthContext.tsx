import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "./AuthTypes";
import API from "@/services/api"; // axios instance (you already created this)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);

  // ---------------- LOGIN ----------------
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });

      if (!res.data || !res.data.token) return false;

      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- REGISTER ----------------
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      return res.status === 201;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ---------------- UPDATE USER ----------------
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};