"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

const BookNowButton = ({ ticket }) => {
  const [open, setOpen] = useState(false);

  const isDeparted = new Date(ticket.departureDateTime) < new Date();

  const isSoldOut = ticket.quantity <= 0;

  return (
    <>
      <button
        disabled={isDeparted || isSoldOut}
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded disabled:bg-gray-400"
      >
        Book Now
      </button>

      {open && (
        <BookingModal ticket={ticket} closeModal={() => setOpen(false)} />
      )}
    </>
  );
};

export default BookNowButton;
