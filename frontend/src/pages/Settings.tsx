import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⭐ IMPORTANT
import PageWrapper from "@/components/layout/PageWrapper";
import { Check, Globe, Bell, BellOff, Type, PaintBucket } from "lucide-react";

// Available fonts
const FONT_STYLES = [
  { name: "Inter", class: "font-inter" },
  { name: "Poppins", class: "font-poppins" },
  { name: "Roboto", class: "font-roboto" },
  { name: "Nunito", class: "font-nunito" },
  { name: "Montserrat", class: "font-montserrat" },
];

// Accent colors
const ACCENTS = [
  "blue",
  "purple",
  "pink",
  "green",
  "red",
  "orange",
  "teal",
  "yellow",
];

const Settings = () => {

  const navigate = useNavigate(); // ⭐ REQUIRED FOR PAGE NAVIGATION

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontStyle, setFontStyle] = useState(localStorage.getItem("fontStyle") || "Inter");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [accent, setAccent] = useState(localStorage.getItem("accent") || "blue");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "off"
  );

  // Apply Theme
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply Font
  useEffect(() => {
    document.documentElement.style.setProperty("--app-font", fontStyle);
    localStorage.setItem("fontStyle", fontStyle);
  }, [fontStyle]);

  // Font Size
  useEffect(() => {
    const sizeMap: Record<string, string> = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    document.documentElement.style.fontSize = sizeMap[fontSize];
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Accent Color
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    localStorage.setItem("accent", accent);
  }, [accent]);

  // Language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Notifications
  useEffect(() => {
    localStorage.setItem("notifications", notifications ? "on" : "off");
  }, [notifications]);

  return (
    <PageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">App Settings</h1>

        {/* ⭐ ADVANCED SETTINGS BUTTON */}
        <button
          onClick={() => navigate("/settings-advanced")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Advanced Settings
        </button>
      </div>

      {/* THEME SETTINGS */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-2">
          <PaintBucket size={20} /> Theme
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-lg border ${
              theme === "light"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 dark:text-white"
            }`}
          >
            Light Mode
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-lg border ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 dark:text-white"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </section>

      {/* FONT STYLE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-2">
          <Type size={20} /> Font Style
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FONT_STYLES.map((f) => (
            <button
              key={f.name}
              onClick={() => setFontStyle(f.name)}
              className={`p-3 rounded-xl border flex justify-between items-center 
                ${fontStyle === f.name ? "bg-blue-600 text-white" : "dark:text-white"}
              `}
            >
              {f.name}
              {fontStyle === f.name && <Check size={18} />}
            </button>
          ))}
        </div>
      </section>

      {/* FONT SIZE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Font Size</h2>

        <div className="flex gap-4">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-4 py-2 rounded-lg border capitalize
                ${fontSize === size ? "bg-blue-600 text-white" : "dark:text-white"}
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* ACCENT COLOR */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Accent Color</h2>

        <div className="flex gap-3 flex-wrap">
          {ACCENTS.map((color) => (
            <div
              key={color}
              onClick={() => setAccent(color)}
              className={`w-10 h-10 rounded-full cursor-pointer border-4 
                ${accent === color ? "border-black dark:border-white" : "border-transparent"}
              `}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-2">
          <Globe size={20} /> Language
        </h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6 mb-12">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex gap-2">
          Notifications
        </h2>

        <button
          onClick={() => setNotifications(!notifications)}
          className="flex items-center gap-4 px-4 py-2 rounded-lg border dark:text-white"
        >
          {notifications ? <Bell size={20} /> : <BellOff size={20} />}
          {notifications ? "Notifications ON" : "Notifications OFF"}
        </button>
      </section>
    </PageWrapper>
  );
};

export default Settings;