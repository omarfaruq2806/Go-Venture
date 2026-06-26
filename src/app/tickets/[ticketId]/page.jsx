import BookNowButton from "@/components/allTickets/BookNowButton";
import Countdown from "@/components/allTickets/CountDown";
import { getSingleTicket } from "@/lib/actions/tickets";
import {
  Bus,
  Armchair,
  Calendar,
  MapPin,
  ArrowRight,
  Tag,
  Building2,
  Gift,
  FileText,
  AlertTriangle,
} from "lucide-react";
import React from "react";

const TicketDetailsPage = async ({ params }) => {
  const { ticketId } = await params;
  const ticket = await getSingleTicket(ticketId);

  const isExpired = new Date(ticket.departureDateTime).getTime() < Date.now();
  const isSoldOut = ticket.quantity <= 0;
  const disableBooking = isExpired || isSoldOut;

  // Status Badge Color Controller - Dark Mode Safe
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "badge-success text-success-content";
      case "pending":
        return "badge-warning text-warning-content";
      default:
        return "badge-error text-error-content";
    }
  };

  return (
    // Outer dynamic layout container frame
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Main Split Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Gallery & Countdown Matrix (Takes 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-base-200 bg-base-200/30">
              <img
                src={
                  ticket.image ||
                  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
                }
                alt={ticket.title}
                className="w-full h-[280px] md:h-[400px] object-cover"
              />
              {/* Top-Left Absolute Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`badge badge-md md:badge-lg font-bold uppercase tracking-wider border-none py-3 px-4 ${getStatusBadgeClass(ticket.status)}`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>

            {/* Countdown Card Widget Container */}
            <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg border border-primary/20">
              <div className="card-body p-6 flex flex-col items-center text-center">
                <h3 className="font-extrabold text-base md:text-lg flex items-center gap-2 tracking-wide">
                  ⏳ Departure Countdown
                </h3>
                <div className="mt-3 w-full bg-base-100/10 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                  <Countdown departureDateTime={ticket.departureDateTime} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Ticket Specs Sheet & Pricing Matrix (Takes 7 columns) */}
          <div className="lg:col-span-7 card bg-base-100 border border-base-200 shadow-xl">
            <div className="card-body p-5 md:p-8">
              {/* Core Headings */}
              <h1 className="text-2xl md:text-3xl font-black text-base-content tracking-tight leading-tight">
                {ticket.title}
              </h1>

              {/* Connected Route Indicator Block */}
              <div className="bg-base-200/60 p-4 rounded-xl flex items-center justify-between my-5 border border-base-200/80">
                <div className="flex flex-col">
                  <span className="text-[10px] text-base-content/50 uppercase font-black tracking-wider mb-1">
                    Origin
                  </span>
                  <span className="text-base md:text-lg font-bold text-base-content flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" /> {ticket.from}
                  </span>
                </div>

                <div className="flex flex-col items-center flex-grow px-2">
                  <div className="w-full flex items-center justify-center gap-1 text-base-content/30">
                    <span className="h-[2px] bg-base-300 flex-grow max-w-[50px]"></span>
                    <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                    <span className="h-[2px] bg-base-300 flex-grow max-w-[50px]"></span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-base-content/50 uppercase font-black tracking-wider mb-1">
                    Destination
                  </span>
                  <span className="text-base md:text-lg font-bold text-base-content">
                    {ticket.to} 🏁
                  </span>
                </div>
              </div>

              {/* Core Data Specifications Matrix Grid */}
              <div className="grid grid-cols-2 gap-3.5 my-2">
                <div className="bg-base-200/30 p-3.5 rounded-xl border border-base-200/80 flex items-start gap-3">
                  <Bus className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider block">
                      Transport
                    </span>
                    <span className="font-bold text-sm text-base-content mt-0.5 block">
                      {ticket.transportType}
                    </span>
                  </div>
                </div>

                <div className="bg-base-200/30 p-3.5 rounded-xl border border-base-200/80 flex items-start gap-3">
                  <Armchair className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider block">
                      Seat Type
                    </span>
                    <span className="font-bold text-sm text-base-content mt-0.5 block">
                      {ticket.seatType}
                    </span>
                  </div>
                </div>

                <div className="bg-base-200/30 p-3.5 rounded-xl border border-base-200/80 flex items-start gap-3">
                  <Tag className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider block">
                      Inventory
                    </span>
                    <span
                      className={`font-extrabold text-sm mt-0.5 block ${ticket.quantity < 5 ? "text-error" : "text-success"}`}
                    >
                      {ticket.quantity} Seats Left
                    </span>
                  </div>
                </div>

                <div className="bg-base-200/30 p-3.5 rounded-xl border border-base-200/80 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-info mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider block">
                      Vendor Fleet
                    </span>
                    <span className="font-bold text-sm text-base-content mt-0.5 block truncate max-w-[120px]">
                      {ticket.vendorName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Exact Deployment Timing Alert Box */}
              <div className="alert bg-base-200/80 border border-base-200/80 rounded-xl my-4 flex items-center justify-start gap-3.5 p-4">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-[10px] text-base-content/50 uppercase tracking-wider">
                    Departure Schedule
                  </h4>
                  <p className="text-sm font-bold text-base-content mt-0.5">
                    {new Date(ticket.departureDateTime).toLocaleDateString([], {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(ticket.departureDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Included Perks Block */}
              {ticket.perks && ticket.perks.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-extrabold text-xs text-base-content/60 mb-2.5 uppercase tracking-widest flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-primary" /> Amenities
                    & Perks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="badge badge-ghost font-bold text-xs tracking-wide py-3 px-3 bg-base-200 text-base-content/80 border border-base-300/50"
                      >
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="divider my-5 border-base-200"></div>

              {/* Pricing Grid Row */}
              <div className="flex items-center justify-between mb-5 bg-base-200/30 p-4 rounded-xl border border-base-200/50">
                <div>
                  <span className="text-[10px] text-base-content/50 uppercase font-black tracking-wider block">
                    Fare per seat
                  </span>
                  <span className="text-3xl font-black text-primary mt-0.5 block">
                    ৳{ticket.price ? ticket.price.toLocaleString("en-BD") : "0"}
                  </span>
                </div>
              </div>

              {/* Dynamic Boundary Error Status Warnings Panel */}
              <div className="space-y-2 mb-4">
                {isExpired && (
                  <div className="alert alert-error bg-error/10 border-error/20 text-error p-3.5 text-sm flex gap-2 rounded-xl font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>This trip has already departed. Booking closed.</span>
                  </div>
                )}
                {isSoldOut && !isExpired && (
                  <div className="alert alert-warning bg-warning/10 border-warning/20 text-warning p-3.5 text-sm flex gap-2 rounded-xl font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      No tickets left! This schedule is completely sold out.
                    </span>
                  </div>
                )}
              </div>

              {/* Clean Client Component Trigger Layer */}
              <BookNowButton ticket={ticket} disabled={disableBooking} />
            </div>
          </div>
        </div>

        {/* Extended Description Grid Section */}
        <div className="mt-10 card bg-base-100 border border-base-200 shadow-sm overflow-hidden">
          <div className="card-body p-6 md:p-8">
            <h2 className="text-lg font-black text-base-content flex items-center gap-2 tracking-tight">
              <FileText className="w-5 h-5 text-primary" /> Trip Policy &
              Journey Specifications
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mt-1.5 mb-4"></div>
            <p className="text-sm font-medium text-base-content/70 leading-relaxed whitespace-pre-line bg-base-200/20 p-4 rounded-xl border border-base-200/50">
              {ticket.description ||
                "No specific guidelines provided by the operator for this route."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
