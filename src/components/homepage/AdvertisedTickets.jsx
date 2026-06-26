import { getAllTickets } from "@/lib/actions/tickets";
import Link from "next/link";
import {
  Bus,
  Armchair,
  CheckCircle,
  ArrowRight,
  Tag,
  Layers,
} from "lucide-react";
import React from "react";

const AdvertisedTickets = async () => {
  const ticketsData = await getAllTickets("approved", "true");
  const tickets = ticketsData.data;

  return (
    <div className="w-full bg-base-100 transition-colors duration-200 border-b-6 border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Header section with pure dynamic colors */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              Featured Deals
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content mt-2 flex items-center gap-2">
              <span className="inline-block">📢</span> Advertised Tickets
            </h2>
          </div>
          <p className="text-base-content/60 text-sm md:text-base font-medium max-w-xs md:text-right">
            Handpicked top routes curated by admin for your elite comfort.
          </p>
        </div>

        {/* Responsive Grid Setup */}
        {tickets.length === 0 ? (
          <div className="text-center py-12 text-base-content/50 font-medium border border-dashed border-base-300 rounded-2xl">
            No advertised tickets available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group"
              >
                {/* Ticket Image Container */}
                <figure className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
                  <img
                    src={
                      ticket.image ||
                      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600"
                    }
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Admin Status Tag Top Right overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="badge badge-success font-bold gap-1 shadow-md text-white border-none py-3 px-3">
                      <CheckCircle className="w-3.5 h-3.5" /> Advertised
                    </span>
                  </div>
                </figure>

                {/* Card Contents */}
                <div className="card-body p-5 flex flex-col flex-grow">
                  {/* Transport type badge */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    <Bus className="w-4 h-4" />
                    <span>{ticket.transportType || "Bus"}</span>
                  </div>

                  {/* Title */}
                  <h3 className="card-title text-xl font-bold text-base-content leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {ticket.title}
                  </h3>

                  {/* Route detail info */}
                  <p className="text-sm font-semibold text-base-content/70 mt-1 flex items-center gap-1">
                    <span className="text-base-content/90">📍 {ticket.from}</span>
                    <span className="text-primary font-bold">→</span>
                    <span className="text-base-content/90">{ticket.to}</span>
                  </p>

                  {/* Price and Quantity layout matrix */}
                  <div className="grid grid-cols-2 gap-2 border-y border-base-200/60 py-3 my-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-base-content/50 tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Price (per unit)
                      </span>
                      <span className="text-lg font-black text-primary mt-0.5">
                        ৳{ticket.price ? ticket.price.toLocaleString("en-BD") : "0"}
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-base-200 pl-3">
                      <span className="text-[10px] uppercase font-bold text-base-content/50 tracking-wider flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Quantity Left
                      </span>
                      <span className="text-base font-bold text-base-content/80 mt-1 flex items-center gap-1">
                        <Armchair className="w-4 h-4 text-base-content/40" />
                        {ticket.quantity || 0} Pcs
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
                      className="btn btn-primary btn-block rounded-xl font-bold text-sm tracking-wide text-primary-content shadow-sm hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all group/btn"
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
    </div>
  );
};

export default AdvertisedTickets;
