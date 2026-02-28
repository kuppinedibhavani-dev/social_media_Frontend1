import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import AdvancedSettings from "./pages/AdvancedSettings";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    const fontStyle = localStorage.getItem("fontStyle") || "Inter";
    const fontSize = localStorage.getItem("fontSize") || "medium";
    const accent = localStorage.getItem("accent") || "blue";
    const animations = localStorage.getItem("animations") || "on";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    document.documentElement.style.setProperty("--app-font", fontStyle);
    document.documentElement.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    document.documentElement.style.setProperty("--accent", accent);

    if (animations === "off") {
      document.documentElement.classList.add("no-animations");
    } else {
      document.documentElement.classList.remove("no-animations");
    }
  }, []);

  return (
    <>
      {/* Toast notifications (Global) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        closeButton={false}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <Scheduler />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings-advanced"
          element={
            <ProtectedRoute>
              <AdvancedSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;