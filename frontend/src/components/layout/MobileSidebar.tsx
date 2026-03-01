import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  BarChart2,
  Users,
  LogOut,
} from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { logout, user } = auth;

  const menuItems = [
    { label: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { label: "Calendar", path: "/calendar", icon: <CalendarDays size={20} /> },
    { label: "Scheduler", path: "/scheduler", icon: <Clock size={20} /> },
    { label: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { label: "Team", path: "/team", icon: <Users size={20} /> },
  ];

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* USER SECTION */}
        <div className="flex items-center gap-3 mb-6 p-2">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
            {firstLetter}
          </div>
          <div>
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className="text-sm text-gray-400">{user?.email || "No email"}</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 p-3 rounded-lg transition-colors
                ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"}
              `
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT SECTION */}
        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;