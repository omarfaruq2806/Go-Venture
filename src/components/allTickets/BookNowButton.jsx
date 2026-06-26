"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";
import { TicketPlus } from "lucide-react"; // Visual flair er jonno design icon

const BookNowButton = ({ ticket }) => {
  const [open, setOpen] = useState(false);

  // Requirement checking
  const isDeparted = new Date(ticket.departureDateTime) < new Date();
  const isSoldOut = ticket.quantity <= 0;
  const isDisabled = isDeparted || isSoldOut;

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen(true)}
        className={`btn btn-block md:text-lg font-bold rounded-xl tracking-wide transition-all duration-200 ${
          isDisabled
            ? "btn-disabled bg-base-300 text-base-content/30 border-none"
            : "btn-primary text-primary-content shadow-sm hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
        }`}
      >
        <TicketPlus className="w-5 h-5 flex-shrink-0" />
        {isDeparted ? "Trip Departed" : isSoldOut ? "Sold Out" : "Book Now"}
      </button>

      {/* Dynamic Booking Modal Trigger overlay */}
      {open && (
        <BookingModal ticket={ticket} closeModal={() => setOpen(false)} />
      )}
    </>
  );
};

export default BookNowButton;
