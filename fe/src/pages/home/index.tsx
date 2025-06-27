// src/pages/Home.tsx
import { useNavigate } from "react-router";
import React from "react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Todo List App</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Stay organized and boost your productivity with our simple and effective todo list app.
      </p>

      <button onClick={() => navigate("/login")} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl">
        Login to Get Started
      </button>
    </div>
  );
}
