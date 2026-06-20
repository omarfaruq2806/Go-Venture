import { getSingleTicket } from "@/lib/actions/tickets";
// import BookingModal from "@/components/BookingModal";
// import Countdown from "@/components/Countdown";

const TicketDetailsPage = async ({ params }) => {
  const { ticketId } = await params;

  const ticket = await getSingleTicket(ticketId);

  const expired = new Date(ticket.departureDateTime) < new Date();
  const outOfStock = ticket.quantity <= 0;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* IMAGE */}
      <img src={ticket.image} className="w-full h-64 object-cover rounded-xl" />

      {/* INFO */}
      <h1 className="text-2xl font-bold mt-4">{ticket.title}</h1>

      <p>
        {ticket.from} → {ticket.to}
      </p>
      <p>💰 Price: {ticket.price}</p>
      <p>🚍 Type: {ticket.transportType}</p>
      <p>🎟️ Available: {ticket.quantity}</p>

      <p className="mt-2">
        {/* ⏳ Countdown: <Countdown targetDate={ticket.departureDateTime} /> */}
      </p>

      {/* BOOK BUTTON */}
      {/* <BookingModal ticket={ticket} disabled={expired || outOfStock} /> */}

      {expired && <p className="text-red-500 mt-2">Trip already departed</p>}

      {outOfStock && <p className="text-red-500 mt-2">Sold Out</p>}
    </div>
  );
};

export default TicketDetailsPage;
