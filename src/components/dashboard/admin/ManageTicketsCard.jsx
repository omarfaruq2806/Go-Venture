"use client";

import { updateTicket } from "@/lib/actions/tickets";

const ManageTicketsCard = ({ ticket, index }) => {
  const handleApprove = async () => {
    console.log("Approve:", ticket._id);
    const res = await updateTicket(ticket._id, { status: "approved" });
    console.log(res, "form approve");

    // await updateTicketStatus(ticket._id, "approved");
  };

  const handleReject = async () => {
    console.log("Reject:", ticket._id);
    const res = await updateTicket(ticket._id, { status: "rejected" });
    console.log(res, "form reject");

    // await updateTicketStatus(ticket._id, "rejected");
  };

  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <div>
          <p className="font-semibold">{ticket.title}</p>
          <p className="text-xs text-gray-500">{ticket.quantity} Tickets</p>
        </div>
      </td>

      <td>
        {ticket.from} → {ticket.to}
      </td>

      <td className="capitalize">{ticket.transportType}</td>

      <td>
        <div>
          <p>{ticket.vendorName}</p>
          <p className="text-xs text-gray-500">{ticket.vendorEmail}</p>
        </div>
      </td>

      <td>৳{ticket.price}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            ticket.status === "approved"
              ? "bg-green-100 text-green-600"
              : ticket.status === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {ticket.status}
        </span>
      </td>

      <td>
        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={ticket.status === "approved"}
            className="btn btn-success btn-sm"
          >
            Approve
          </button>

          <button
            onClick={handleReject}
            disabled={ticket.status === "rejected"}
            className="btn btn-error btn-sm"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageTicketsCard;
