import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f8faf9]">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main className="min-w-0 flex-1">
        {children}
      </main>

    </div>
  );
};

export default Layout;