"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UpdateTicketForm from "./vendor/UpdateTicketForm";
import { deleteTicket } from "@/lib/actions/tickets";
import { MapPin, Bus, Trash2, Edit2, X, AlertTriangle } from "lucide-react";

const MyTicketCard = ({ ticket }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isRejected = ticket.status === "rejected";

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this ticket?")) return;
    setLoading(true);
    await deleteTicket(id);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <figure className="h-44 w-full relative">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`badge border-none font-black text-[10px] uppercase ${
              ticket.status === "approved"
                ? "bg-success/10 text-success"
                : ticket.status === "rejected"
                  ? "bg-error/10 text-error"
                  : "bg-warning/10 text-warning"
            }`}
          >
            {ticket.status}
          </span>
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col flex-grow">
        <h2 className="text-lg truncate font-bold text-base-content">{ticket.title}</h2>

        <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/70 my-2">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="bg-base-200 px-2 py-0.5 rounded">{ticket.from}</span>
          <span>➔</span>
          <span className="bg-base-200 px-2 py-0.5 rounded">{ticket.to}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-base-content/60 my-2">
          <span className="flex items-center gap-1">
            <Bus className="w-3.5 h-3.5" /> {ticket.transportType}
          </span>
          <span>Price: ৳{ticket.price}</span>
        </div>

        {/* Actions */}
        <div className="card-actions mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setOpen(true)}
            disabled={isRejected}
            className="btn btn-primary btn-sm rounded-xl font-bold gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Update
          </button>
          <button
            onClick={() => handleDelete(ticket._id)}
            disabled={isRejected || loading}
            className="btn btn-error btn-sm rounded-xl font-bold gap-1 text-white"
          >
            {loading ? (
              "..."
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal - Modern Backdrop Blur */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 w-full max-w-2xl p-6 rounded-2xl relative shadow-2xl border border-base-200">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 btn btn-circle btn-ghost btn-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <UpdateTicketForm ticket={ticket} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicketCard;
