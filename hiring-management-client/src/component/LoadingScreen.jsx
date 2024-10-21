import React from "react";

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-[#e5fafe]">
            <div className="loader w-[100px] h-[100px] border-[5px] border-[#1f84b9] border-b-0 border-r-0 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingScreen;