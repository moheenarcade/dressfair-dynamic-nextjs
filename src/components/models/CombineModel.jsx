"use client";
import React from "react";

const CombineModel = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/60">
      {/* Modal Box */}
      <div
        className="bg-white w-full md:w-[550px] rounded-t-2xl md:rounded-lg p-5 
                   animate-slideUp md:animate-fadeIn relative"
      >
        {/* Close Btn */}
        <button onClick={onClose} className="text-xl absolute right-4 top-3 z-[999999]">
          ✕
        </button>

        {children}
      </div>

      {/* animations */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp .3s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn .25s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CombineModel;
