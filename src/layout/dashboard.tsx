// layout/dashboard.tsx

import { useState } from "react";

import Sidebar from "../components/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] =
    useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* MAIN CONTENT */}
      <main
        className={`
          pt-20
          lg:pt-6
          p-6
          transition-all
          duration-300

          ${
            isOpen
              ? "lg:ml-64"
              : "lg:ml-20"
          }
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;