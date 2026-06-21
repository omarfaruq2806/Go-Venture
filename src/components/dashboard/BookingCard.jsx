"use client";

import Countdown from "../allTickets/CountDown";

const BookingCard = ({ booking }) => {
  const isExpired = new Date(booking.departureDateTime).getTime() < Date.now();

  const showCountdown = booking.status !== "rejected";

  const showPayButton = booking.status === "accepted" && !isExpired;


  return (
    <div className="border rounded-xl p-4 shadow">
      <img src={booking.image} className="w-full h-40 object-cover rounded" />

      <h2 className="text-lg font-bold mt-2">{booking.title}</h2>

      <p>
        {booking.from} → {booking.to}
      </p>

      <p>Qty: {booking.bookingQuantity}</p>

      <p>Total: ৳{booking.totalPrice}</p>

      <p>Status: {booking.status}</p>

      <p>Departure: {new Date(booking.departureDateTime).toLocaleString()}</p>

      {/* Countdown */}
      {showCountdown && (
        <Countdown departureDateTime={booking.departureDateTime} />
      )}

      {/* Pay button */}
      {showPayButton && (
        <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded">
          Pay Now
        </button>
      )}

      {isExpired && booking.status === "accepted" && (
        <p className="text-red-500">Payment closed (trip started)</p>
      )}
    </div>
  );
};

export default BookingCard;
