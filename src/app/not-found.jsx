import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-md w-full">
        <div className="text-6xl mb-4">😵</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
