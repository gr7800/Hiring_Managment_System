import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const PopupModel = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg">
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          <IoCloseSharp size={30}/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupModel;
