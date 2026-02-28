import {  useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

interface Props {
  children: ReactNode;
}

const PageWrapper = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* ----- DESKTOP SIDEBAR ----- */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ----- MOBILE SIDEBAR ----- */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ----- MAIN SECTION ----- */}
      <div className="flex-1">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;