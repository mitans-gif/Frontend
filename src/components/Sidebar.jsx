import React from "react";
import {
  LayoutDashboard,
  CircleDollarSign,
  Calculator,
  RefreshCw,
  ShieldCheck,
  Target,
  Zap,
  User,
  Leaf,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Tracker",
      icon: ShieldCheck,
      path: "/tracker",
    },
    {
      name: "Calculator",
      icon: Calculator,
      path: "/calculator",
    },
    {
      name: "4R's",
      icon: RefreshCw,
      path: "/four-rs",
    },
    {
      name: "Recommendations",
      icon: ShieldCheck,
      path: "/recommendations",
    },
    {
      name: "Actions",
      icon: CircleDollarSign,
      path: "/actions",
    },
    {
      name: "Goals",
      icon: Target,
      path: "/goals",
    },
    {
      name: "Renewable",
      icon: Zap,
      path: "/renewable",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[220px] flex-col border-r border-slate-200 bg-white">

      {/* LOGO */}

      <div className="flex h-[105px] items-center px-7">

        <div className="flex items-center gap-2">

          <Zap
            size={39}
            strokeWidth={3}
            className="fill-green-500 text-green-500"
          />

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              EcoTrack
            </h1>

            <p className="text-[9px] font-semibold text-green-700">
              Track. Reduce. Sustain.
            </p>
          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active = item.name === "Tracker";

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`mb-1 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "text-slate-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >

              <Icon size={19} />

              <span>{item.name}</span>

            </button>
          );
        })}

      </nav>

      {/* BOTTOM CARD */}

      <div className="m-4 rounded-xl border border-green-100 bg-green-50 p-4 text-center">

        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center text-5xl">
          🌱
        </div>

        <p className="text-xs font-medium leading-5 text-slate-700">
          Every unit saved
          <br />
          makes a difference.
        </p>

        <button
          onClick={() => navigate("/impact")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
        >
          View Impact
          <ArrowRight size={14} />
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;