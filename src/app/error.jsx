"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
        <div className="text-6xl mb-4">⚠️</div>

        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
