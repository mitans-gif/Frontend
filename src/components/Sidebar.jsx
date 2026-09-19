import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Zap,
  Calculator,
  RefreshCw,
  ShieldCheck,
  CircleDollarSign,
  Target,
  Leaf,
  User,
  Menu,
  X,
  Sprout,
  ArrowRight,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tracker",
      path: "/tracker",
      icon: Zap,
    },
    {
      name: "Calculator",
      path: "/calculator",
      icon: Calculator,
    },
    {
      name: "4R's",
      path: "/4rs",
      icon: RefreshCw,
    },
    {
      name: "Recommendations",
      path: "/recommendations",
      icon: ShieldCheck,
    },
    {
      name: "Actions",
      path: "/actions",
      icon: CircleDollarSign,
    },
    {
      name: "Goals",
      path: "/goals",
      icon: Target,
    },
    {
      name: "Renewable",
      path: "/renewable",
      icon: Leaf,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className={`
        sticky top-0 h-screen
        border-r border-slate-200
        bg-white
        transition-all duration-300 ease-in-out
        flex flex-col
        ${isOpen ? "w-[235px]" : "w-[76px]"}
      `}
    >
      {/* ================================= */}
      {/* TOP / LOGO + HAMBURGER */}
      {/* ================================= */}

      <div
        className={`
          flex items-center
          border-b border-slate-100
          px-4
          py-5
          ${isOpen ? "justify-between" : "justify-center"}
        `}
      >
        {/* Logo */}

        {isOpen && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center">
              <Zap
                size={38}
                strokeWidth={3}
                className="fill-green-500 text-green-500"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold text-[#102b43]">
                EcoTrack
              </h1>

              <p className="text-[9px] font-medium text-green-600">
                Track. Reduce. Sustain.
              </p>
            </div>
          </div>
        )}

        {/* Collapsed Logo */}

        {!isOpen && (
          <Zap
            size={34}
            strokeWidth={3}
            className="fill-green-500 text-green-500"
          />
        )}

        {/* Hamburger */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-lg
            text-slate-600
            transition
            hover:bg-green-50
            hover:text-green-600
          "
          title={isOpen ? "Collapse sidebar" : "Open sidebar"}
        >
          {isOpen ? <X size={21} /> : <Menu size={23} />}
        </button>
      </div>

      {/* ================================= */}
      {/* NAVIGATION */}
      {/* ================================= */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                group
                flex items-center
                rounded-xl
                transition-all duration-200
                ${
                  isOpen
                    ? "gap-4 px-4 py-3"
                    : "justify-center px-2 py-3"
                }

                ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-[#102b43] hover:bg-green-50 hover:text-green-700"
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={2}
                className="shrink-0"
              />

              {isOpen && (
                <span className="whitespace-nowrap text-sm font-semibold">
                  {item.name}
                </span>
              )}

              {/* Tooltip when collapsed */}

              {!isOpen && (
                <span
                  className="
                    pointer-events-none
                    absolute left-[70px]
                    z-50
                    hidden
                    rounded-md
                    bg-[#102b43]
                    px-3 py-2
                    text-xs
                    font-medium
                    text-white
                    shadow-lg
                    group-hover:block
                  "
                >
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ================================= */}
      {/* BOTTOM IMPACT CARD */}
      {/* ================================= */}

      {isOpen ? (
        <div className="m-3 rounded-2xl border border-green-100 bg-green-50 p-4">
          <div className="mb-3 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <Sprout
                size={30}
                className="text-green-600"
              />
            </div>
          </div>

          <p className="text-center text-sm font-medium leading-5 text-[#102b43]">
            Every unit saved
            <br />
            makes a difference.
          </p>

          {/* VIEW IMPACT BUTTON */}

          <button
            onClick={() => navigate("/impact")}
            className="
              mt-4
              flex w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border border-green-600
              bg-white
              px-3 py-2
              text-sm
              font-semibold
              text-green-700
              transition
              hover:bg-green-600
              hover:text-white
            "
          >
            View Impact
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="flex justify-center border-t border-slate-100 py-5">
          <Sprout
            size={27}
            className="text-green-600"
          />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;