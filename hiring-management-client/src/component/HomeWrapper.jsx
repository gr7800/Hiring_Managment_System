import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomeWrapper = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#e5faff] py-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeWrapper;
