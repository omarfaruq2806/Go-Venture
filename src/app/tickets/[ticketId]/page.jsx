import BookNowButton from "@/components/allTickets/BookNowButton";
import Countdown from "@/components/allTickets/CountDown";
import { getSingleTicket } from "@/lib/actions/tickets";

const TicketDetailsPage = async ({ params }) => {
  const { ticketId } = await params;

  const ticket = await getSingleTicket(ticketId);

  const isExpired = new Date(ticket.departureDateTime).getTime() < Date.now();

  const isSoldOut = ticket.quantity <= 0;

  const disableBooking = isExpired || isSoldOut;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Right Side */}
        <div>
          {/* Status */}
          <div className="mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                ticket.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : ticket.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>

          {/* Route */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold">
              📍 {ticket.from} → {ticket.to}
            </p>
          </div>

          {/* Ticket Info */}
          <div className="space-y-3">
            <p>
              <span className="font-semibold">🚍 Transport:</span>{" "}
              {ticket.transportType}
            </p>

            <p>
              <span className="font-semibold">💰 Price:</span> ৳{ticket.price}
            </p>

            <p>
              <span className="font-semibold">🎟 Available Tickets:</span>{" "}
              {ticket.quantity}
            </p>

            <p>
              <span className="font-semibold">💺 Seat Type:</span>{" "}
              {ticket.seatType}
            </p>

            <p>
              <span className="font-semibold">🕒 Departure:</span>{" "}
              {new Date(ticket.departureDateTime).toLocaleString()}
            </p>

            <p>
              <span className="font-semibold">🏪 Vendor:</span>{" "}
              {ticket.vendorName}
            </p>
          </div>

          {/* Perks */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2">🎁 Perks</h3>

            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((perk, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Status */}
          <div className="mt-6">
            {isExpired && (
              <p className="text-red-500 font-medium mb-2">
                This trip has already departed.
              </p>
            )}

            {isSoldOut && (
              <p className="text-red-500 font-medium mb-2">
                No tickets available.
              </p>
            )}

            <BookNowButton
              ticket={ticket}
              disabled={disableBooking}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                disableBooking
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Book Now
            </BookNowButton>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Description</h2>

        <p className="text-gray-600 leading-relaxed">{ticket.description}</p>
      </div>

      {/* Countdown Placeholder */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="font-semibold text-lg mb-2">⏳ Departure Countdown</h3>
        <Countdown departureDateTime={ticket.departureDateTime}></Countdown>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
