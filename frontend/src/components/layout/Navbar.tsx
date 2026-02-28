import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useRealtimeNotifications } from "@/hooks/realtime";
import type { NotificationItem } from "@/hooks/realtime";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  /* Apply Theme */
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Handle new notifications */
  const handleNewNotification = useCallback(
    (notif: NotificationItem) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((c) => c + 1);
    },
    []
  );

  /* Realtime listener */
  useRealtimeNotifications({
    userId: auth?.user?.id || "",
    onNewNotification: handleNewNotification,
  });

  /* Search */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${searchQuery}`);
  };

  /* First letter fallback */
  const firstLetter = auth?.user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm p-4 flex justify-between items-center relative z-50">

      {/* LEFT - LOGO + MOBILE MENU */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
          onClick={() => setMobileMenu(true)}
        >
          <Menu size={24} className="dark:text-white" />
        </button>

        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-semibold dark:text-white tracking-tight cursor-pointer"
        >
          Social Scheduler
        </h1>
      </div>

      {/* CENTER - SEARCH BAR */}
      <form onSubmit={handleSearch} className="hidden lg:flex w-1/3 items-center">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 
          outline-none shadow-sm focus:ring-2 focus:ring-blue-400 transition"
        />
      </form>

      {/* RIGHT - ICONS + USER */}
      <div className="flex items-center gap-6">

        {/* THEME TOGGLE */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform shadow-sm"
        >
          {theme === "light" ? (
            <Moon className="text-gray-800" size={20} />
          ) : (
            <Sun className="text-yellow-300" size={20} />
          )}
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUnreadCount(0);
            }}
            className="relative hover:scale-110 transition-transform"
          >
            <Bell size={24} className="text-gray-700 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white 
              text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 shadow-xl 
            rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-fade-slide">

              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Live Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications yet.</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded bg-gray-100 dark:bg-gray-700 
                      text-gray-800 dark:text-gray-200 shadow-sm"
                    >
                      {n.message}

                      <button
                        onClick={() => {
                          auth?.logout?.();
                          navigate("/login");
                        }}
                        className="text-xs text-blue-600 dark:text-blue-400 underline mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* USER DROPDOWN */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300 dark:border-gray-600"
          >
            {auth?.user?.avatar_url ? (
              <img
                src={auth.user.avatar_url}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-full h-full flex
                items-center justify-center text-white font-bold">
                {firstLetter}
              </div>
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 
            rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700 
            animate-fade-slide">

              <button
                onClick={() => {
                  navigate("/profile");
                  setDropdownOpen(false);
                }}
                className="w-full text-left p-2 rounded hover:bg-gray-100 
                dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium"
              >
                Profile Settings
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setDropdownOpen(false);
                }}
                className="w-full text-left p-2 rounded hover:bg-gray-100 
                dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium"
              >
                App Settings
              </button>

              <button
                onClick={() => {
                  auth?.logout();
                  navigate("/login");
                }}
                className="w-full text-left p-2 rounded text-red-600 
                hover:bg-red-100 dark:hover:bg-red-900 font-semibold"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
          <div className="w-64 bg-white dark:bg-gray-900 h-full shadow-xl p-5 animate-slide-right">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Menu</h2>

            {["dashboard", "calendar", "scheduler", "analytics"].map((item) => (
              <button
                key={item}
                className="w-full capitalize text-left p-3 rounded 
                hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                onClick={() => navigate(`/${item}`)}
              >
                {item}
                <button onClick={() => navigate("/settings-advanced")}>
  Advanced Settings

              </button>
              </button>
            ))}

            <button
              className="mt-10 bg-red-600 text-white w-full py-2 rounded shadow"
              onClick={() => {
                auth?.logout();
                navigate("/login");
              }}
            >
              Logout
            </button>

            <button
              onClick={() => setMobileMenu(false)}
              className="absolute top-4 right-4 text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;