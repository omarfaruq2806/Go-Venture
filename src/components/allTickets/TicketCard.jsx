import Link from "next/link";

const TicketCard = ({ ticket }) => {
  const isLowStock = ticket.quantity <= 5;

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* IMAGE WITH ABSOLUTE BADGE */}
      <figure className="relative h-44 w-full">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-3 left-3">
          <span className="badge badge-secondary font-semibold gap-1 text-xs py-2.5">
            🚍 {ticket.transportType}
          </span>
        </div>
      </figure>

      {/* CONTENT */}
      <div className="card-body p-4 justify-between">
        <div className="space-y-2">
          {/* TITLE */}
          <h2 className="card-title text-base font-bold text-base-content line-clamp-1">
            {ticket.title}
          </h2>

          {/* ROUTE */}
          <div className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/5 px-2 py-1 rounded-md w-fit">
            <span>📍 {ticket.from}</span>
            <span className="text-xs opacity-60">➔</span>
            <span>{ticket.to}</span>
          </div>

          {/* INFO DETAILS */}
          <div className="text-xs space-y-1.5 pt-1 text-base-content/80">
            {/* Price & Seats Left */}
            <div className="flex justify-between items-center border-b border-base-200 pb-1.5">
              <span className="text-sm font-extrabold text-success">
                ৳{ticket.price}
              </span>
              <span
                className={`badge ${isLowStock ? "badge-error text-error-content" : "badge-ghost"} badge-sm font-medium`}
              >
                🎟️ {ticket.quantity} Left
              </span>
            </div>

            {/* Departure Time */}
            <p className="flex items-center gap-1.5 mt-1 text-base-content/70">
              <span className="text-sm">⏰</span>
              {new Date(ticket.departureDateTime).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(ticket.departureDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Perks */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1.5">
                {ticket.perks.slice(0, 2).map((perk, idx) => (
                  <span
                    key={idx}
                    className="badge badge-outline text-[10px] uppercase tracking-wider opacity-70 px-1.5 py-2"
                  >
                    ✨ {perk}
                  </span>
                ))}
                {ticket.perks.length > 2 && (
                  <span className="badge badge-outline text-[10px] opacity-50 px-1.5 py-2">
                    +{ticket.perks.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div className="card-actions mt-4">
          <Link href={`/tickets/${ticket._id}`} className="w-full">
            <button className="btn btn-primary btn-sm btn-block text-white font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-none">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
