import React from "react";

export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-white shadow-md p-4 rounded-xl ${className}`}>
            {children}
        </div>
    );
}

