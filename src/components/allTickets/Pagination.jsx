"use client";

import Link from "next/link";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage }) => {
  // Types mismatch check fix matrix (Safe number structure check)
  const current = Number(currentPage) || 1;
  const total = totalPages.length;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 mt-10 bg-base-200/50 p-2 rounded-2xl w-max mx-auto border border-base-200 shadow-sm">
      {/* Button: Previous Page */}
      {current <= 1 ? (
        <button
          className="btn btn-sm btn-circle btn-ghost text-base-content/30 cursor-not-allowed"
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      ) : (
        <Link href={`/tickets?page=${current - 1}`}>
          <button className="btn btn-sm btn-circle btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </Link>
      )}

      {/* Numerical Page Dynamic Links Mapping */}
      {totalPages.map((p) => {
        const pageNumber = Number(p);
        const isActive = current === pageNumber;

        return (
          <Link key={pageNumber} href={`/tickets?page=${pageNumber}`}>
            <button
              className={`btn btn-sm btn-circle font-bold text-xs tracking-wide transition-all ${
                isActive
                  ? "btn-primary text-primary-content shadow-sm scale-105"
                  : "btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300"
              }`}
            >
              {pageNumber}
            </button>
          </Link>
        );
      })}

      {/* Button: Next Page */}
      {current >= total ? (
        <button
          className="btn btn-sm btn-circle btn-ghost text-base-content/30 cursor-not-allowed"
          disabled
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <Link href={`/tickets?page=${current + 1}`}>
          <button className="btn btn-sm btn-circle btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
