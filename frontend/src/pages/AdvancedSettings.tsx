import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import { ArrowLeft, Check, Globe, Sparkles, Type, PaintBucket, RotateCcw } from "lucide-react";

const FONT_STYLES = [
  { name: "Inter", class: "font-inter" },
  { name: "Poppins", class: "font-poppins" },
  { name: "Roboto", class: "font-roboto" },
  { name: "Nunito", class: "font-nunito" },
];

const ACCENTS = ["blue", "purple", "pink", "green", "red", "orange", "teal"];

const LANGUAGES = {
  English: "Hello! Welcome to your app preview.",
  Hindi: "नमस्ते! आपके ऐप पूर्वावलोकन में स्वागत है।",
  Telugu: "హలో! మీ యాప్ ప్రివ్యూ కు స్వాగతం.",
  Spanish: "¡Hola! Bienvenido a la vista previa.",
  French: "Bonjour! Bienvenue dans l’aperçu.",
};

const AdvancedSettings = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [fontStyle, setFontStyle] = useState(localStorage.getItem("fontStyle") || "Inter");
  const [accent, setAccent] = useState(localStorage.getItem("accent") || "blue");
  const [animations, setAnimations] = useState(
    localStorage.getItem("animations") !== "off"
  );

  // Save Language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Save Font Style
  useEffect(() => {
    localStorage.setItem("fontStyle", fontStyle);
    document.documentElement.style.setProperty("--app-font", fontStyle);
  }, [fontStyle]);

  // Accent Style
  useEffect(() => {
    localStorage.setItem("accent", accent);
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  // Animations
  useEffect(() => {
    localStorage.setItem("animations", animations ? "on" : "off");
  }, [animations]);

  const resetSettings = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <PageWrapper>
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition"
        >
          <ArrowLeft size={20} className="dark:text-white" />
        </button>

        <h1 className="text-3xl font-bold dark:text-white">Advanced Settings</h1>
      </div>

      {/* LIVE PREVIEW SECTION */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold dark:text-white mb-4">Live Preview</h2>

        <div
          className={`border rounded-lg p-5 transition-all duration-300 shadow-md 
            ${animations ? "animate-pulse" : ""}
          `}
          style={{
            fontFamily: fontStyle,
            borderColor: accent,
          }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: accent }}>
            Preview Title
          </h3>
          <p className="dark:text-gray-300">
            {LANGUAGES[language as keyof typeof LANGUAGES]}
          </p>
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white mb-4">
          <Globe size={20} /> App Language
        </h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-3 w-full rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          {Object.keys(LANGUAGES).map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </section>

      {/* FONT STYLE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white mb-4">
          <Type size={20} /> Choose Font Style
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FONT_STYLES.map((f) => (
            <button
              key={f.name}
              onClick={() => setFontStyle(f.name)}
              className={`p-4 rounded-xl border flex justify-between items-center 
              ${fontStyle === f.name ? "bg-blue-600 text-white" : "dark:text-white"}`}
            >
              {f.name}
              {fontStyle === f.name && <Check size={18} />}
            </button>
          ))}
        </div>
      </section>

      {/* ACCENT COLOR */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
          <PaintBucket size={20} /> Accent Color
        </h2>

        <div className="flex gap-3 flex-wrap">
          {ACCENTS.map((color) => (
            <div
              key={color}
              onClick={() => setAccent(color)}
              className={`w-10 h-10 rounded-full cursor-pointer border-4 
                ${accent === color ? "border-black dark:border-white" : "border-transparent"}`}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </section>

      {/* ANIMATION TOGGLE */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white mb-4">
          <Sparkles size={20} /> Animations
        </h2>

        <button
          onClick={() => setAnimations(!animations)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg border dark:text-white"
        >
          {animations ? "Animations ON ✨" : "Animations OFF ❌"}
        </button>
      </section>

      {/* RESET BUTTON */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-6 mb-10">
        <h2 className="text-xl font-semibold dark:text-white mb-4 flex items-center gap-2">
          <RotateCcw size={20} /> Reset App
        </h2>

        <button
          onClick={resetSettings}
          className="w-full py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Reset All Settings
        </button>
      </section>
    </PageWrapper>
  );
};

export default AdvancedSettings;