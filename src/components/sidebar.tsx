// components/Sidebar.tsx

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  PlusCircle,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;

  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Sidebar = ({
  isOpen,
  setIsOpen,
}: SidebarProps) => {
  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  // ADMIN LINKS
  const adminLinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <LayoutDashboard size={20} />
      ),
    },

    {
      name: "Sales Users",
      path: "/sales-users",
      icon: <Users size={20} />,
    },

    {
      name: "Leads",
      path: "/leads",
      icon: (
        <ClipboardList size={20} />
      ),
    },

    {
      name: "Create Lead",
      path: "/create-lead",
      icon: (
        <PlusCircle size={20} />
      ),
    },

    {
      name: "Create Sales",
      path: "/create-sales",
      icon: (
        <UserPlus size={20} />
      ),
    },
  ];

  // SALES LINKS
  const salesLinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <LayoutDashboard size={20} />
      ),
    },

    {
      name: "Leads",
      path: "/leads",
      icon: (
        <ClipboardList size={20} />
      ),
    },

    {
      name: "Create Lead",
      path: "/create-lead",
      icon: (
        <PlusCircle size={20} />
      ),
    },
  ];

  // ROLE BASED LINKS
  const links =
    user?.role === "admin"
      ? adminLinks
      : salesLinks;

  // LOGOUT
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-40
          bg-black
          text-white
          flex
          items-center
          justify-between
          px-4
          py-4
        "
      >
        <h1 className="text-xl font-bold">
          Smart CRM
        </h1>

        <button
          onClick={() =>
            setIsOpen(true)
          }
        >
          <Menu size={28} />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`
          hidden
          lg:flex
          fixed
          top-0
          left-0
          z-40
          h-screen
          bg-black
          text-white
          flex-col
          p-5
          transition-all
          duration-300

          ${
            isOpen
              ? "w-64"
              : "w-20"
          }
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div>
              <h1 className="text-2xl font-bold">
                Smart CRM
              </h1>

              <p className="text-sm text-gray-400 capitalize mt-1">
                {user?.role} Panel
              </p>
            </div>
          )}

          {/* TOGGLE */}
          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="
              p-2
              rounded-lg
              hover:bg-gray-800
            "
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* USER */}
        {isOpen && (
          <div className="bg-gray-900 rounded-xl p-4 mb-8">
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-gray-400 break-all">
              {user?.email}
            </p>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="space-y-3 flex-1">
          {links.map((link) => {
            const isActive =
              location.pathname ===
              link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition

                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                {link.icon}

                {isOpen && (
                  <span>
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            transition
            px-4
            py-3
            rounded-xl
          "
        >
          <LogOut size={18} />

          {isOpen && (
            <span>Logout</span>
          )}
        </button>
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-black
          text-white
          p-5
          transform
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:hidden
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Smart CRM
            </h1>

            <p className="text-sm text-gray-400 capitalize mt-1">
              {user?.role} Panel
            </p>
          </div>

          <button
            onClick={() =>
              setIsOpen(false)
            }
          >
            <X size={28} />
          </button>
        </div>

        {/* USER */}
        <div className="bg-gray-900 rounded-xl p-4 mb-8">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-400 break-all">
            {user?.email}
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3">
          {links.map((link) => {
            const isActive =
              location.pathname ===
              link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() =>
                  setIsOpen(false)
                }
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition

                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                {link.icon}

                <span>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            absolute
            bottom-6
            left-5
            right-5
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            transition
            px-4
            py-3
            rounded-xl
          "
        >
          <LogOut size={18} />

          Logout
        </button>
      </aside>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}
    </>
  );
};

export default Sidebar;