import React from "react";
import pageNotFound from "../assets/NotFound.png";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <img
                    src={pageNotFound}
                    alt="404 not found"
                    className="w-full max-w-md object-contain mb-8"
                />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-6">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition hover:bg-blue-700"
                >
                    Go Back Home
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;
