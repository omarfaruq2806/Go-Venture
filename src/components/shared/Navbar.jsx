"use client";

import { signOut, useSession } from "@/lib/session/client-session";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { session } = useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;
  const role = user?.role;

  return (
    <div className="navbar bg-base-100 shadow-sm border-b sticky top-0 z-50 px-4 md:px-8">
      {/* Navbar Start: Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <span className="text-2xl">🚌</span>
          <span>TicketBari</span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tickets">All Tickets</Link>
          </li>
          {user && (
            <li>
              <Link href={`/dashboard/${role}`}>Dashboard</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End: Auth Section & Mobile Toggle */}
      <div className="navbar-end gap-2">
        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link
                href="/authentication/signin"
                className="btn btn-ghost btn-sm"
              >
                Login
              </Link>
              <Link
                href="/authentication/signup"
                className="btn btn-primary btn-sm rounded-lg text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-base-300"
              >
                <div className="w-9 rounded-full">
                  <img
                    src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border mt-2"
              >
                <li className="menu-title px-4 py-1 text-xs text-base-content/60">
                  Hello, {user?.name}
                </li>
                <li>
                  <Link href="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost md:hidden btn-square"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Drawer/Menu Overlay */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-base-100 border-b p-4 shadow-md flex flex-col gap-3 md:hidden z-50">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="btn btn-ghost justify-start btn-sm"
          >
            Home
          </Link>
          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className="btn btn-ghost justify-start btn-sm"
          >
            All Tickets
          </Link>
          {user && (
            <Link
              href={`/dashboard/${role}`}
              onClick={() => setOpen(false)}
              className="btn btn-ghost justify-start btn-sm"
            >
              Dashboard
            </Link>
          )}
          <div className="divider my-1"></div>
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/authentication/signin"
                onClick={() => setOpen(false)}
                className="btn btn-outline btn-sm w-full"
              >
                Login
              </Link>
              <Link
                href="/authentication/signup"
                onClick={() => setOpen(false)}
                className="btn btn-primary btn-sm w-full text-white"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-3 py-1">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={user?.image} alt="User" />
                  </div>
                </div>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="btn btn-ghost justify-start btn-sm"
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="btn btn-error btn-outline btn-sm w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
