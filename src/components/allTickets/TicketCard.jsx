import Link from "next/link";

const TicketCard = ({ ticket }) => {
  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition">
      {/* IMAGE */}
      <img
        src={ticket.image}
        alt={ticket.title}
        className="h-40 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* TITLE */}
        <h2 className="text-lg font-bold">{ticket.title}</h2>

        {/* ROUTE */}
        <p className="text-sm text-gray-600">
          {ticket.from} → {ticket.to}
        </p>

        {/* INFO */}
        <div className="text-sm space-y-1 text-gray-700">
          <p>🚍 {ticket.transportType}</p>
          <p>💰 ৳{ticket.price} / per seat</p>
          <p>🎟️ Quantity: {ticket.quantity}</p>
          <p>🎁 Perks: {ticket.perks?.join(", ")}</p>
          <p>⏰ {ticket.departureDateTime}</p>
        </div>

        {/* BUTTON */}
        <Link href={`/tickets/${ticket._id}`}>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
