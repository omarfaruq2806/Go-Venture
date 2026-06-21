"use client";

import { useState } from "react";

const BookingModal = ({ ticket, closeModal }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity > ticket.quantity) {
      alert(`Maximum available tickets: ${ticket.quantity}`);
      return;
    }

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      bookingQuantity: quantity,
      totalPrice: quantity * ticket.price,
      status: "pending",
    };

    console.log(bookingData);

    // later api call
    // await createBooking(bookingData)

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Book Ticket</h2>

        <p className="mb-2">Ticket: {ticket.title}</p>

        <p className="mb-4">Available: {ticket.quantity}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Booking Quantity</label>

            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <p>
            Total Price:
            <span className="font-bold ml-2">৳{quantity * ticket.price}</span>
          </p>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Confirm Booking
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
