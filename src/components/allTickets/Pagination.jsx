import Link from "next/link";
import React from "react";

const Pagination = ({ totalPages, currentPage }) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <Link href={`/tickets?page=${currentPage - 1}`}>
        <button className="btn btn-circle btn-outline">❮</button>
      </Link>

      {totalPages.map((p) => (
        <Link key={p} href={`/tickets?page=${p}`}>
          <button
            className={`btn btn-sm btn-circle ${
              currentPage === p ? "btn-primary" : "btn-outline"
            }`}
          >
            {p}
          </button>
        </Link>
      ))}

      <Link href={`/tickets?page=${currentPage  +1}`}>
        <button className="btn btn-circle btn-outline">❯</button>
      </Link>
    </div>
  );
};

export default Pagination;
