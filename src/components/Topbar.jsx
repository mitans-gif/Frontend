import React from "react";
import { ArrowRight, Zap } from "lucide-react";

const Topbar = () => {

  const handleLogin = () => {
    console.log("Login clicked");
    // Later:
    // navigate("/login");
  };

  const handleRegister = () => {
    console.log("Register clicked");
    // Later:
    // navigate("/register");
  };

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">

        {/* Logo */}
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center">
            <Zap
              size={34}
              strokeWidth={3}
              className="fill-green-500 text-green-500"
            />
          </div>

          <h1 className="text-[21px] font-bold tracking-tight text-slate-900">
            Eco<span className="text-green-600">Track</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-12 md:flex">

          <a
            href="#home"
            className="relative text-sm font-semibold text-green-600"
          >
            Home
            <span className="absolute -bottom-3 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-green-500" />
          </a>

          <a
            href="#four-rs"
            className="text-sm font-semibold text-slate-800 transition hover:text-green-600"
          >
            4R's
          </a>

          <a
            href="#renewable"
            className="text-sm font-semibold text-slate-800 transition hover:text-green-600"
          >
            Renewable Energy
          </a>

          <a
            href="#about"
            className="text-sm font-semibold text-slate-800 transition hover:text-green-600"
          >
            About
          </a>

        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={handleLogin}
            className="rounded-lg border border-green-600 px-6 py-2.5 text-sm font-semibold text-green-700 transition duration-200 hover:bg-green-50 active:scale-95"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition duration-200 hover:bg-green-700 active:scale-95"
          >
            Register
          </button>

        </div>

      </div>
    </header>
  );
};

export default Topbar;