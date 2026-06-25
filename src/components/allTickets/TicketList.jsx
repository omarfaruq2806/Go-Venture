"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import TicketCard from "./TicketCard";

const TicketList = ({ tickets }) => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportType, setTransportType] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchFrom = ticket.from
      .toLowerCase()
      .includes(searchFrom.toLowerCase());

    const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());

    const matchTransport =
      transportType === "" || ticket.transportType === transportType;

    return matchFrom && matchTo && matchTransport;
  });

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
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
