import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
