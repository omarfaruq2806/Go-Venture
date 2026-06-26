"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import TicketCard from "./TicketCard";
import Pagination from "./Pagination";

const TicketList = ({ ticketsData }) => {
  const tickets = ticketsData.data;
  const currentPage = ticketsData.page;
  const pages = ticketsData.totalPages;

  const totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push(i);
  }

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportType, setTransportType] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchFrom = ticket.from
      .toLowerCase()
      .includes(searchFrom.toLowerCase());

    const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());

    const matchTransport =
      transportType === "" || ticket.transportType === transportType;

    return matchFrom && matchTo && matchTransport;
  });

  const sortedTickets = [...filteredTickets];
  if (sortBy === "low") {
    sortedTickets.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "high") {
    sortedTickets.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Tickets</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default TicketList;
