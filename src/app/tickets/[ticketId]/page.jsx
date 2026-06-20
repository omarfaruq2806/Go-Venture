import { getSingleTicket } from "@/lib/actions/tickets";

const TicketDetailsPage = async ({ params }) => {
  const { ticketId } = await params;
  //   console.log(ticketId);

  const ticket = await getSingleTicket(ticketId);

  //   console.log(ticket);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ticket Details</h1>

      <div className="mt-4">
        <p>
          <b>Title:</b> {ticket.title}
        </p>
        <p>
          <b>From:</b> {ticket.from}
        </p>
        <p>
          <b>To:</b> {ticket.to}
        </p>
        <p>
          <b>Price:</b> {ticket.price}
        </p>
        <p>
          <b>Type:</b> {ticket.transportType}
        </p>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
