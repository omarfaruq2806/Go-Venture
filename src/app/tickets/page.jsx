import TicketCard from "@/components/allTickets/TicketCard";
import { getTickets } from "@/lib/actions/tickets";

const AllTicketsPage = async () => {
  const tickets = await getTickets("", "approved");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets?.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default AllTicketsPage;
