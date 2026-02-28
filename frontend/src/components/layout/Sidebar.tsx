import { useContext} from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  BarChart2,
  Users,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext)!;

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
    { name: "Scheduler", icon: <PlusCircle size={20} />, path: "/scheduler" },
    { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
    { name: "Team", icon: <Users size={20} />, path: "/team" },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 px-5 py-6">

      {/* LOGO */}
      <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight mb-10">
        Scheduler
      </h1>

      {/* MENU ITEMS */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900 scale-[1.02]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <span className="opacity-90">{item.icon}</span>
              <span>{item.name}</span>
              
                 

              {/* ACTIVE INDICATOR BAR */}
              {isActive && (
                <div className="ml-auto w-2 h-8 bg-white dark:bg-gray-300 rounded-full"></div>
              )}
            </button>
            
            
          );
        })}
      </div>

      {/* LOGOUT BUTTON */}
      <div className="mt-auto">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;