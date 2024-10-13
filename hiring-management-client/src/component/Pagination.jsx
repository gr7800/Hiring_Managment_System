import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-4 gap-4 px-4 py-2 bg-gray-600">
      <button
        className={`flex justify-center items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold w-fit cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="flex justify-center items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold w-fit">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`flex justify-center items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold w-fit cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;