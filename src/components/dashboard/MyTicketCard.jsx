"use client";
import Link from "next/link";
import { useState } from "react";
import UpdateTicketForm from "./vendor/UpdateTicketForm";
import { deleteTicket } from "@/lib/actions/tickets";

const MyTicketCard = ({ ticket }) => {
  const {
    _id,
    title,
    image,
    from,
    to,
    transportType,
    price,
    quantity,
    departureDateTime,
    status,
  } = ticket;
  const [open, setOpen] = useState(false);

  const isRejected = status === "rejected";

  const handleDelete = async (id) => {
    await deleteTicket(id);
    // window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-gray-600">
          {from} → {to}
        </p>

        <div className="flex justify-between text-sm">
          <span className="capitalize">{transportType}</span>
          <span>${price}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Quantity: {quantity}</span>
          <span>{new Date(departureDateTime).toLocaleDateString()}</span>
        </div>

        <div className="pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            onClick={() => setOpen(true)}
            disabled={isRejected}
            className={`flex-1 py-2 rounded-lg ${
              isRejected
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Update
          </button>

          <button
            onClick={() => handleDelete(_id)}
            disabled={isRejected}
            className={`flex-1 py-2 rounded-lg ${
              isRejected
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Delete
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">
              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-black"
              >
                ✕
              </button>

              {/* FORM */}
              <UpdateTicketForm
                ticket={ticket}
                onClose={() => setOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketCard;
