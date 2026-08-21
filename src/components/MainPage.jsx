import React from "react";
import Sidebar from "./Sidebar";
import MainRight from "./MainRight";

const MainPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f7f9f7]">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <MainRight />

    </div>
  );
};

export default MainPage;