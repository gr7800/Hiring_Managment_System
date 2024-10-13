import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomeWrapper = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#e5faff] flex flex-col justify-between">
        <div className="py-[80px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeWrapper;
