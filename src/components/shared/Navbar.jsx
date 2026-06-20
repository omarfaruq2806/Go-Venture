"use client";

import { signOut, useSession } from "@/lib/session/client-session";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const user = session?.user;
  const role = user?.role;
  console.log(role);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🚌</span>
          <span className="font-bold text-xl text-blue-600">TicketBari</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/tickets" className="hover:text-blue-600">
            All Tickets
          </Link>

          {user && (
            <Link href={`/dashboard/${role}`} className="hover:text-blue-600">
              Dashboard
            </Link>
          )}

          {/* AUTH SECTION */}
          {!user ? (
            <div className="flex gap-3">
              <Link href="/authentication/signin" className="text-blue-600">
                Login
              </Link>
              <Link
                href="/authentication/signup"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* USER INFO */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.name}</span>
              </button>

              {/* DROPDOWN */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg">
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/tickets" className="block">
            All Tickets
          </Link>

          {user && (
            <Link href="/dashboard" className="block">
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link href="/login" className="block text-blue-600">
                Login
              </Link>
              <Link
                href="/signup"
                className="block bg-blue-600 text-white px-3 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img src={user?.image} className="w-8 h-8 rounded-full" />
                <span>{user?.name}</span>
              </div>

              <Link href="/dashboard/profile" className="block">
                My Profile
              </Link>

              <button onClick={() => signOut()} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
