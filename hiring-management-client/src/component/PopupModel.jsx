import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const PopupModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={handleClose}
    >
      <div className="relative bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-xl transform transition-transform duration-300 ease-in-out">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition-colors duration-200"
          onClick={onClose}
        >
          <IoCloseSharp size={28} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
