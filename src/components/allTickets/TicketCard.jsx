"use client";

import Link from "next/link";
import { Bus, Armchair, Calendar, ArrowRight, Tag, Sparkles } from "lucide-react";

const TicketCard = ({ ticket }) => {
  const isLowStock = ticket.quantity <= 5;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      
      {/* Ticket Image Container */}
      <figure className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
        <img
          src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600"}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Floating Transport Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge badge-secondary font-bold gap-1 text-xs py-3 px-3 shadow-md border-none">
            <Bus className="w-3.5 h-3.5" /> {ticket.transportType || "Bus"}
          </span>
        </div>
      </figure>

      {/* Card Contents */}
      <div className="card-body p-5 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="card-title text-xl font-bold text-base-content leading-snug group-hover:text-primary transition-colors line-clamp-1">
          {ticket.title}
        </h3>

        {/* Route details tag box wrapper */}
        <p className="text-sm font-semibold text-base-content/70 mt-1 flex items-center gap-1">
          <span className="text-base-content/90">📍 {ticket.from}</span>
          <span className="text-primary font-bold">→</span>
          <span className="text-base-content/90">{ticket.to}</span>
        </p>

        {/* Price and Quantity matrix box (Hompage alignment template) */}
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
              <Armchair className="w-3 h-3" /> Quantity Left
            </span>
            <span
              className={`text-sm font-bold mt-1 inline-flex items-center w-max px-1.5 py-0.5 rounded-md ${
                isLowStock 
                  ? "bg-error/10 text-error font-extrabold" 
                  : "text-base-content/80"
              }`}
            >
              {ticket.quantity || 0} Pcs {isLowStock && "🔥"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-base-content/70 mb-3 bg-base-200/50 p-2 rounded-xl">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            {new Date(ticket.departureDateTime).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}{" "}
            •{" "}
            {new Date(ticket.departureDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {ticket.perks && ticket.perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 flex-grow content-start">
            {ticket.perks.slice(0, 2).map((perk, idx) => (
              <span
                key={idx}
                className="badge badge-ghost text-[10px] font-bold text-base-content/60 py-2.5 border border-base-200/60"
              >
                <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-500 fill-amber-500" /> {perk}
              </span>
            ))}
            {ticket.perks.length > 2 && (
              <span className="badge badge-ghost text-[10px] font-bold text-base-content/40 py-2.5 border border-base-200/60">
                +{ticket.perks.length - 2} More
              </span>
            )}
          </div>
        )}

        <div className="card-actions mt-auto">
          <Link href={`/tickets/${ticket._id}`} className="w-full">
            <button className="btn btn-primary btn-block rounded-xl font-bold text-sm tracking-wide text-primary-content shadow-sm hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all group/btn">
              See Details
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TicketCard;