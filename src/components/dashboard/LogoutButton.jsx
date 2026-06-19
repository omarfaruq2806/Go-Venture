"use client";

import { signOut } from "@/lib/session/client-session";


export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition mt-4"
    >
      Logout
    </button>
  );
}
