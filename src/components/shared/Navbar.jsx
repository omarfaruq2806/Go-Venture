"use client";

import { signOut, useSession } from "@/lib/session/client-session";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Active route check korar jonno
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Ekhon pathname track korbe

  const user = session?.user;
  const role = user?.role;

  console.log(user )

  // Active Link class conditional helper function
  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `font-semibold tracking-wide transition-all duration-200 ${
      isActive
        ? "text-primary bg-primary/10 font-bold"
        : "text-base-content/80 hover:text-primary hover:bg-base-200"
    }`;
  };

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50 px-4 md:px-8 transition-colors duration-200">
      {/* Navbar Start: Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight text-primary hover:scale-[1.02] transition-transform"
        >
          <span className="text-2xl">🚌</span>
          <span className="font-extrabold">TicketBari</span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-1.5">
          <li>
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/tickets" className={getLinkClass("/tickets")}>
              All Tickets
            </Link>
          </li>
          {user && (
            <li>
              <Link
                href={`/dashboard/${role}/profile`}
                className={getLinkClass(`/dashboard/${role}`)}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End: Auth Section, Theme Toggle & Mobile Button */}
      <div className="navbar-end gap-2">
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {!user ? (
              <>
                <Link
                  href="/authentication/signin"
                  className="btn btn-ghost btn-sm font-semibold tracking-wide hover:bg-base-200 text-base-content/90"
                >
                  Login
                </Link>
                <Link
                  href="/authentication/signup"
                  className="btn btn-primary btn-sm font-bold tracking-wide rounded-lg text-primary-content shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-base-300 ring-offset-base-100 focus:ring-2 focus:ring-primary transition-all"
                >
                  <div className="w-9 rounded-full">
                    <img
                      src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt={user?.name || "User Avatar"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl border border-base-200 mt-3"
                >
                  <li className="menu-title px-4 py-2 text-xs font-bold uppercase tracking-wider text-base-content/50 border-b border-base-200/60 mb-1">
                    Hello,{" "}
                    <span className="text-sm font-extrabold text-base-content block mt-0.5 normal-case">
                      {user?.name}
                    </span>
                  </li>
                  <li>
                    <Link
                      href={`/dashboard/${role}/profile`}
                      className="font-medium hover:text-primary active:bg-primary/10"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="font-semibold text-error hover:bg-error/10"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost md:hidden btn-square text-base-content"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Drawer/Menu Overlay */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-base-100 border-b border-base-200 p-4 shadow-xl flex flex-col gap-2 md:hidden z-50">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`btn btn-md justify-start w-full ${pathname === "/" ? "btn-primary text-primary-content" : "btn-ghost text-base-content/90 font-semibold"}`}
          >
            Home
          </Link>
          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className={`btn btn-md justify-start w-full ${pathname === "/tickets" ? "btn-primary text-primary-content" : "btn-ghost text-base-content/90 font-semibold"}`}
          >
            All Tickets
          </Link>
          {user && (
            <Link
              href={`/dashboard/${role}`}
              onClick={() => setOpen(false)}
              className={`btn btn-md justify-start w-full ${pathname === `/dashboard/${role}` ? "btn-primary text-primary-content" : "btn-ghost text-base-content/90 font-semibold"}`}
            >
              Dashboard
            </Link>
          )}

          <div className="divider my-1 before:bg-base-200 after:bg-base-200"></div>

          {!user ? (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/authentication/signin"
                onClick={() => setOpen(false)}
                className="btn btn-outline border-base-300 btn-md w-full font-semibold text-base-content"
              >
                Login
              </Link>
              <Link
                href="/authentication/signup"
                onClick={() => setOpen(false)}
                className="btn btn-primary btn-md w-full font-bold text-primary-content"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-3 px-3 py-2 bg-base-200/60 rounded-xl mb-1">
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary/20">
                    <img
                      src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="User"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-base-content">
                    {user?.name}
                  </span>
                  <span className="text-xs font-semibold text-primary capitalize bg-primary/10 px-1.5 py-0.5 rounded-md mt-0.5 w-max">
                    {role}
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className={`btn btn-md justify-start w-full ${pathname === "/dashboard/profile" ? "btn-primary text-primary-content" : "btn-ghost text-base-content font-semibold"}`}
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="btn btn-error btn-outline btn-md w-full font-bold"
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
