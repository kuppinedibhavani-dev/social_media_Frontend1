import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Bell } from "lucide-react";

const NotificationsDropdown = () => {
  const notifications = [
    "Your scheduled post for Instagram has been published.",
    "You have 3 new comments on your last post.",
    "Your engagement rate increased by 4%.",
    "Team member Lisa updated the task.",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative cursor-pointer select-none">
        {/* Bell Icon */}
        <Bell className="w-6 h-6 text-gray-700 hover:text-black transition" />

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </DropdownMenuTrigger>

      {/* Dropdown List */}
      <DropdownMenuContent className="w-80 mr-4 animate-fadeIn">
        {notifications.map((note, index) => (
          <DropdownMenuItem key={index} className="py-2 text-sm">
            🔔 {note}
          </DropdownMenuItem>
        ))}

        {notifications.length === 0 && (
          <DropdownMenuItem className="py-2 text-sm text-gray-500">
            No new notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;