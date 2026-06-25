import BookNowButton from "@/components/allTickets/BookNowButton";
import Countdown from "@/components/allTickets/CountDown";
import { getSingleTicket } from "@/lib/actions/tickets";

const TicketDetailsPage = async ({ params }) => {
  const { ticketId } = await params;

  const ticket = await getSingleTicket(ticketId);

  const isExpired = new Date(ticket.departureDateTime).getTime() < Date.now();
  const isSoldOut = ticket.quantity <= 0;
  const disableBooking = isExpired || isSoldOut;

  // Status Badge Color Controller
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "badge-success text-success-content";
      case "pending":
        return "badge-warning text-warning-content";
      default:
        return "badge-error text-error-content";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-base-100">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Image Gallery & Countdown */}
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-base-300">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
            {/* Top-Left Absolute Status Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`badge badge-lg font-semibold uppercase tracking-wider ${getStatusBadgeClass(ticket.status)}`}
              >
                {ticket.status}
              </span>
            </div>
          </div>

          {/* Countdown Card */}
          <div className="card bg-primary text-primary-content shadow-md">
            <div className="card-body p-5 flex flex-col items-center text-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                ⏳ Departure Countdown
              </h3>
              <div className="mt-2 w-full">
                <Countdown departureDateTime={ticket.departureDateTime} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Ticket Specs & Booking */}
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body p-6 md:p-8">
            {/* Title */}
            <h1 className="card-title text-3xl font-extrabold text-base-content mb-2">
              {ticket.title}
            </h1>

            {/* Route Stats Block */}
            <div className="bg-base-200 p-4 rounded-xl flex items-center justify-between my-4 border border-base-300">
              <div>
                <span className="text-xs text-base-content/60 block uppercase font-bold">
                  From
                </span>
                <span className="text-lg font-bold text-primary">
                  📍 {ticket.from}
                </span>
              </div>
              <div className="divider divider-horizontal text-base-content/30">
                ➔
              </div>
              <div className="text-right">
                <span className="text-xs text-base-content/60 block uppercase font-bold">
                  To
                </span>
                <span className="text-lg font-bold text-secondary">
                  {ticket.to} 🏁
                </span>
              </div>
            </div>

            {/* Ticket Info Grid */}
            <div className="grid grid-cols-2 gap-4 my-4 text-sm">
              <div className="bg-base-50 p-3 rounded-lg border border-base-200">
                <span className="text-base-content/60 block">🚍 Transport</span>
                <span className="font-semibold text-base-content">
                  {ticket.transportType}
                </span>
              </div>
              <div className="bg-base-50 p-3 rounded-lg border border-base-200">
                <span className="text-base-content/60 block">💺 Seat Type</span>
                <span className="font-semibold text-base-content">
                  {ticket.seatType}
                </span>
              </div>
              <div className="bg-base-50 p-3 rounded-lg border border-base-200">
                <span className="text-base-content/60 block">
                  🎟 Available Tickets
                </span>
                <span
                  className={`font-bold ${ticket.quantity < 5 ? "text-error" : "text-success"}`}
                >
                  {ticket.quantity} Left
                </span>
              </div>
              <div className="bg-base-50 p-3 rounded-lg border border-base-200">
                <span className="text-base-content/60 block">🏪 Vendor</span>
                <span className="font-semibold text-base-content">
                  {ticket.vendorName}
                </span>
              </div>
            </div>

            {/* Departure Info */}
            <div className="alert bg-base-200 border border-base-300 rounded-xl my-4 flex justify-start gap-3">
              <span className="text-xl">🕒</span>
              <div>
                <h4 className="font-bold text-xs text-base-content/60 uppercase">
                  Departure Time
                </h4>
                <p className="text-sm font-medium text-base-content">
                  {new Date(ticket.departureDateTime).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Perks Section */}
            {ticket.perks && ticket.perks.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold text-sm text-base-content/70 mb-2 uppercase tracking-wide">
                  🎁 Included Perks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.perks.map((perk, index) => (
                    <div
                      key={index}
                      className="badge badge-outline badge-secondary font-medium px-3 py-3"
                    >
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="divider my-4"></div>

            {/* Pricing & Booking Area */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs text-base-content/60 block uppercase font-bold">
                  Total Price
                </span>
                <span className="text-3xl font-black text-primary">
                  ৳{ticket.price}
                </span>
              </div>
            </div>

            {/* Error/Warning Notices */}
            <div className="space-y-2 mb-2">
              {isExpired && (
                <div className="alert alert-error p-3 text-sm flex gap-2 rounded-lg">
                  <span>⚠️ This trip has already departed.</span>
                </div>
              )}
              {isSoldOut && !isExpired && (
                <div className="alert alert-warning p-3 text-sm flex gap-2 rounded-lg">
                  <span>🚫 No tickets available (Sold Out).</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <BookNowButton
              ticket={ticket}
              disabled={disableBooking}
              className={`btn btn-block text-lg font-bold ${
                disableBooking
                  ? "btn-disabled bg-base-300 text-base-content/40"
                  : "btn-primary text-white shadow-lg shadow-primary/30 hover:shadow-none"
              }`}
            >
              Book Now
            </BookNowButton>
          </div>
        </div>
      </div>

      {/* Bottom Section - Full Width Description */}
      <div className="mt-12 card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-6 md:p-8">
          <h2 className="text-xl font-bold text-base-content mb-2 flex items-center gap-2">
            📄 Trip Details & Description
          </h2>
          <div className="w-16 h-1 bg-primary rounded mb-4"></div>
          <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
            {ticket.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
