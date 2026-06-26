"use client";

import Countdown from "../allTickets/CountDown";
import {
  MapPin,
  Calendar,
  Armchair,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

const BookingCard = ({ booking }) => {
  // STRICT VALIDATION REQUIREMENTS LOGICS CHECKING
  const isExpired = new Date(booking.departureDateTime).getTime() < Date.now();

  // Requirement: Remove countdown completely if rejected status triggers
  const showCountdown =
    booking.status !== "rejected" && booking.status !== "paid" && !isExpired;

  // Requirement: Can only click payment checkout session if accepted and timeline parameter hasn't boundary lapsed
  const showPayButton = booking.status === "accepted" && !isExpired;

  // Cross theme safe status color badges allocation layout helper context logic
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-success/10 text-success";
      case "rejected":
        return "bg-error/10 text-error";
      case "paid":
        return "bg-info/10 text-info";
      default:
        return "bg-warning/10 text-warning"; // Defaults status: Pending
    }
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner Image Geometry Element Grid */}
      <div className="relative h-44 w-full bg-base-200">
        <img
          src={
            booking.image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600"
          }
          alt={booking.ticketTitle}
          className="w-full h-full object-cover"
        />
        {/* Top Floating Absolute Status Badge Indicator Frame */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`badge font-bold text-[10px] uppercase tracking-widest px-2.5 py-2.5 border-none shadow-sm ${getStatusStyle(booking.status)}`}
          >
            ● {booking.status || "pending"}
          </span>
        </div>
      </div>

      {/* Primary Specifications Panel Elements Content Section Layer Box Details */}
      <div className="card-body p-5 flex flex-col justify-between flex-grow space-y-4">
        {/* Title and Route Vector Map Blocks Lines Info */}
        <div>
          <h2 className="font-black text-base-content text-base md:text-lg tracking-tight line-clamp-1">
            {booking.ticketTitle}
          </h2>

          {/* FIX: Clean location formatting element alignment (Removed literal "hi" bug text wrapper) */}
          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-base-content/80">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="bg-base-200 px-2 py-0.5 rounded max-w-[90px] truncate">
              {booking.from}
            </span>
            <span className="text-base-content/30">➔</span>
            <span className="bg-base-200 px-2 py-0.5 rounded max-w-[90px] truncate">
              {booking.to}
            </span>
          </div>
        </div>

        {/* Micro Pricing Meta Slots Matrix Info Layer Options block data rows */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-base-content/70">
          <div className="bg-base-200/50 p-2 rounded-lg border border-base-200 flex items-center gap-1.5">
            <Armchair className="w-3.5 h-3.5 text-secondary" />
            <span>
              Seats Qty:{" "}
              <strong className="text-base-content">
                {booking.bookingQuantity}
              </strong>
            </span>
          </div>
          <div className="bg-base-200/50 p-2 rounded-lg border border-base-200 flex items-center gap-1.5">
            <span className="text-primary font-black">৳</span>
            <span>
              Total:{" "}
              <strong className="text-primary font-black">
                ৳{booking.totalPrice?.toLocaleString("en-BD")}
              </strong>
            </span>
          </div>
        </div>

        {/* Departure Schedule Date Timeline Information Frame Box layout */}
        <div className="alert bg-base-200/70 border border-base-200 rounded-xl flex items-center gap-2.5 p-3 text-xs">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] uppercase font-bold text-base-content/40 tracking-wider block">
              Departure Time
            </span>
            <p className="font-bold text-base-content truncate mt-0.5">
              {new Date(booking.departureDateTime).toLocaleDateString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {new Date(booking.departureDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* REQUIREMENT CHECKED MODULE: Countdown clock element display logic alignment banner info option */}
        {showCountdown && (
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-primary block mb-2">
              ⏱ Time Left For Boarding
            </span>
            <Countdown departureDateTime={booking.departureDateTime} />
          </div>
        )}

        {/* Bottom Context Conditional Action Panels Controls Button Container */}
        <div className="pt-2">
          {/* REQUIREMENT MODULE CHECK: Stripe Checkout Session dynamic inline automated form handler */}
          {showPayButton && (
            <form
              action="/api/checkout-session"
              method="POST"
              className="w-full"
            >
              <input type="hidden" name="bookingId" value={booking._id} />
              <input type="hidden" name="title" value={booking.ticketTitle} />
              <input type="hidden" name="price" value={booking.totalPrice} />
              <input type="hidden" name="ticketId" value={booking.ticketId} />
              <input
                type="hidden"
                name="vendorEmail"
                value={booking.vendorEmail}
              />
              <input
                type="hidden"
                name="quantity"
                value={booking.bookingQuantity}
              />

              {/* Premium theme safe customized trigger submission button layout control parameters inline active shape override */}
              <button
                type="submit"
                className="btn btn-success btn-block rounded-xl font-bold text-sm text-success-content shadow-md shadow-success/10 hover:shadow-none transition-all gap-2 border-none bg-success h-10 min-h-10"
              >
                <CreditCard className="w-4 h-4" /> Pay Now (Stripe)
              </button>
            </form>
          )}

          {/* REQUIREMENT MODULE CHECK: Boundary timeline alert panels warning notifications strings mapping options validations check line */}
          {isExpired && booking.status === "accepted" && (
            <div className="alert alert-error bg-error/10 border-error/20 text-error p-3 text-xs flex gap-2 rounded-xl font-bold">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Payment closed (trip started/passed).</span>
            </div>
          )}

          {/* Visual state guide: If booking initialization data is pending mode triggers display banner alert tag properties */}
          {booking.status === "pending" && (
            <div className="text-center text-[11px] font-bold text-warning bg-warning/5 border border-warning/10 rounded-xl py-2 uppercase tracking-wide">
              ⏳ Awaiting operator confirmation approval...
            </div>
          )}

          {/* Visual state guide: If booking request has been completely rejected boundary state options mapping panel row */}
          {booking.status === "rejected" && (
            <div className="text-center text-[11px] font-extrabold text-error bg-error/5 border border-error/10 rounded-xl py-2 uppercase tracking-wide">
              ❌ Request rejected by operator fleet.
            </div>
          )}

          {/* Visual state guide: Successful checkout confirmation paid badge log element box tag parameters rows mapping */}
          {booking.status === "paid" && (
            <div className="text-center text-[11px] font-black text-success bg-success/10 border border-success/20 rounded-xl py-2.5 uppercase tracking-widest animate-pulse">
              🎉 Seat Securely Booked & Paid
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
