"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileSidebar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          fixed
          top-20
          left-4
          z-40
          btn
          btn-circle
          btn-primary
          shadow-lg
        "
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-50
          transition-transform
          duration-300
          ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="relative h-full">
          {children}

          <button
            onClick={() => setOpen(false)}
            className="
              absolute
              top-4
              right-4
              btn
              btn-circle
              btn-sm
            "
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
