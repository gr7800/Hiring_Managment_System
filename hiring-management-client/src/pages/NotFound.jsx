import React from "react";
import pageNotFound from "../assets/NotFound.png";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const NotFound = () => {
    return (
        <div className="min-h-screen relative">
            <Navbar />
            <img
                src={pageNotFound}
                alt="404 not found!"
                className="w-full h-full object-contain"
            />
            <Footer />
        </div>
    );
};

export default NotFound;