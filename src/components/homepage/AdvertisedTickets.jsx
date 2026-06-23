import { getTickets } from "@/lib/actions/tickets";
import React from "react";

const AdvertisedTickets = async () => {
  const tickets = await getTickets("", "", "true");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📢 Advertised Tickets</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {tickets?.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-bold mb-2">{ticket.title}</h2>

            <p className="text-sm text-gray-600">
              📍 {ticket.from} → {ticket.to}
            </p>

            <p className="text-sm mt-1">💰 Price: ৳{ticket.price}</p>

            <p className="text-sm mt-1">🚍 {ticket.transportType}</p>

            <div className="mt-3">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                ✅ Advertised
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedTickets;
