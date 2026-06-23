"use client";

import { updateTicket } from "@/lib/actions/tickets";
import { useState } from "react";

const AdvertiseTicketTable = ({ tickets }) => {
  const [allTickets, setAllTickets] = useState(tickets);

  const handleAdvertise = async (ticket) => {
    const advertisedCount = allTickets.filter(
      (item) => item.isAdvertised,
    ).length;

    if (!ticket.isAdvertised && advertisedCount >= 6) {
      alert("Maximum 6 tickets allowed");
      return;
    }

    const result = await updateTicket(ticket._id, {
      isAdvertised: !ticket.isAdvertised,
    });

    if (result.modifiedCount > 0) {
      const updatedTickets = allTickets.map((item) => {
        if (item._id === ticket._id) {
          return {
            ...item,
            isAdvertised: !item.isAdvertised,
          };
        }

        return item;
      });

      setAllTickets(updatedTickets);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold">Advertise Tickets</h2>

        <p className="text-sm text-gray-500 mt-1">
          Maximum 6 tickets can be advertised at a time
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Title</th>

              <th className="text-left px-6 py-4 font-semibold">Route</th>

              <th className="text-left px-6 py-4 font-semibold">Price</th>

              <th className="text-left px-6 py-4 font-semibold">Status</th>

              <th className="text-center px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {allTickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5 font-medium">{ticket.title}</td>

                <td className="px-6 py-5 text-gray-600">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="px-6 py-5 font-semibold">৳ {ticket.price}</td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.isAdvertised
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ticket.isAdvertised ? "Advertised" : "Not Advertised"}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <button
                    onClick={() => handleAdvertise(ticket)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      ticket.isAdvertised
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {ticket.isAdvertised ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTicketTable;
