import MyTicketCard from "@/components/dashboard/MyTicketCard";
import { getTickets } from "@/lib/api/tickets";
import { getSession } from "@/lib/session/server-session";
import { Tickets } from "lucide-react";
import React from "react";

const MyAddedTickets = async () => {
  const session = await getSession();
  const email = session?.user?.email;
  const tickets = (await getTickets(email)) || [];

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Banner */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <Tickets className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">
              My Published Tickets
            </h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Manage your inventory, adjust pricing, or remove outdated schedule
              allocations.
            </p>
          </div>
        </div>

        {/* Tickets Grid */}
        {tickets.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-base-200 rounded-3xl">
            <p className="font-bold text-base-content/40">
              No tickets found in your inventory.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <MyTicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedTickets;
