import { getLatestTickets } from "@/lib/actions/tickets";
import { Armchair, ArrowRight, Bus, Calendar, Layers, Sparkles, Tag, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

const LatestTickets = async () => {
  const tickets = await getLatestTickets("approved");
  const latestTickets = tickets.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Header section - Advertisement er moto exact matching layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-info bg-info/10 px-3 py-1 rounded-full">
            Fresh Arrivals
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content mt-2">
            🆕 Latest Tickets
          </h2>
        </div>
        <p className="text-base-content/60 text-sm md:text-base font-medium max-w-xs md:text-right">
          Recently launched schedules and newly added routes just for you.
        </p>
      </div>

      {/* Grid Setup: Advertised section er moto 3 column layout */}
      {tickets.length === 0 ? (
        <div className="text-center py-10 text-base-content/50">No recent tickets available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:border-info/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group"
            >
              {/* Ticket Image Container */}
              <figure className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
                <img
                  src={ticket.image || "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600"}
                  alt={ticket.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating "New" Status Tag Overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="badge badge-info font-bold gap-1 shadow-md text-info-content border-none py-3 px-3">
                    <Sparkles className="w-3.5 h-3.5" /> New
                  </span>
                </div>
              </figure>

              {/* Card Contents */}
              <div className="card-body p-5 flex flex-col flex-grow">
                {/* Transport type badge */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-info uppercase tracking-wider mb-1">
                  <Bus className="w-4 h-4" />
                  <span>{ticket.transportType || "Bus"}</span>
                </div>

                {/* Title */}
                <h3 className="card-title text-xl font-bold text-base-content leading-snug group-hover:text-info transition-colors line-clamp-1">
                  {ticket.title}
                </h3>

                {/* Route detail info */}
                <p className="text-sm font-semibold text-base-content/70 mt-1 flex items-center gap-1">
                  <span className="text-base-content/90">📍 {ticket.from}</span>
                  <span className="text-info font-bold">→</span>
                  <span className="text-base-content/90">{ticket.to}</span>
                </p>

                {/* Price and Quantity layout matrix (Exact same box design) */}
                <div className="grid grid-cols-2 gap-2 border-y border-base-100 py-3 my-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-base-content/50 tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Price (per unit)
                    </span>
                    <span className="text-lg font-black text-info mt-0.5">
                      ৳{ticket.price.toLocaleString("en-BD")}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-base-200 pl-3">
                    <span className="text-[10px] uppercase font-bold text-base-content/50 tracking-wider flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Quantity Left
                    </span>
                    <span className="text-base font-bold text-base-content/80 mt-1 flex items-center gap-1">
                      <Armchair className="w-4 h-4 text-base-content/40" />
                      {ticket.quantity} Pcs
                    </span>
                  </div>
                </div>

                {/* Perks render block (Badges) */}
                <div className="flex flex-wrap gap-1.5 mb-5 flex-grow content-start">
                  {ticket.perks?.map((perk, idx) => (
                    <span
                      key={idx}
                      className="badge badge-ghost text-[11px] font-medium text-base-content/70 py-2.5 border border-base-200/60"
                    >
                      ✨ {perk}
                    </span>
                  ))}
                </div>

                {/* CTA Card Footer See Details Button */}
                <div className="card-actions mt-auto">
                  <Link
                    href={`/tickets/${ticket._id}`}
                    className="btn btn-info btn-block rounded-xl font-bold text-sm tracking-wide text-info-content shadow-sm hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all group/btn"
                  >
                    See Details
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestTickets;
