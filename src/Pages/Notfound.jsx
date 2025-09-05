import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <h1 className="text-9xl font-extrabold text-yellow-400 mb-6">404</h1>
      <p className="text-2xl font-semibold mb-4 text-gray-200">
        Oops! Page Not Found
      </p>
      <p className="text-gray-400 mb-8 max-w-md text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
