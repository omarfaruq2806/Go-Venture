"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import TicketCard from "./TicketCard";
import Pagination from "./Pagination";
import { Ticket, SlidersHorizontal } from "lucide-react";

const TicketList = ({ ticketsData }) => {
  const tickets = ticketsData?.data || [];
  const currentPage = ticketsData?.page || 1;
  const pages = ticketsData?.totalPages || 1;

  const totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push(i);
  }

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportType, setTransportType] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Clean data filtering engine
  const filteredTickets = tickets.filter((ticket) => {
    const matchFrom = (ticket.from || "")
      .toLowerCase()
      .includes(searchFrom.toLowerCase());

    const matchTo = (ticket.to || "")
      .toLowerCase()
      .includes(searchTo.toLowerCase());

    const matchTransport =
      transportType === "" || ticket.transportType === transportType;

    return matchFrom && matchTo && matchTransport;
  });

  // Data Sorting controller
  const sortedTickets = [...filteredTickets];
  if (sortBy === "low") {
    sortedTickets.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "high") {
    sortedTickets.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      {/* Dynamic Header Section - Dark Mode Glitch Protected */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-base-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
              All Tickets
            </h1>
            <p className="text-xs md:text-sm text-base-content/60 font-medium mt-0.5">
              Browse, filter, and choose from our fully admin-verified transport
              schedules.
            </p>
          </div>
        </div>

        {/* Quick Filter Active Badge Status Counter */}
        <div className="flex items-center gap-2 text-xs font-bold bg-base-200 text-base-content/80 px-3 py-2 rounded-xl w-max">
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
          <span>Found: {sortedTickets.length} Available Tickets</span>
        </div>
      </div>

      {/* Modern Filter Controller Box Area Wrapper */}
      <div className="bg-base-200/40 border border-base-200 rounded-2xl p-4 md:p-6 mb-8 shadow-sm">
        <SearchBar
          searchFrom={searchFrom}
          setSearchFrom={setSearchFrom}
          searchTo={searchTo}
          setSearchTo={setSearchTo}
          transportType={transportType}
          setTransportType={setTransportType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Responsive Grid Setup: Perfect 3-Columns Match Grid layout */}
      {sortedTickets.length === 0 ? (
        <div className="text-center py-20 bg-base-100 border border-dashed border-base-300 rounded-2xl">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-base font-bold text-base-content/80">
            No matching tickets found!
          </p>
          <p className="text-xs text-base-content/50 mt-1">
            Try adjusting your locations or filter selection criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}

      {/* Pagination wrapper spacing adjustment */}
      <div className="flex justify-center mt-12">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default TicketList;
