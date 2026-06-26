import TicketList from "@/components/allTickets/TicketList";
import { getAllTickets } from "@/lib/actions/tickets";

const AllTicketsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page || 1;
  const tickets = await getAllTickets("approved", "", page);

  return (
    // Outer dynamic layout bridge layer
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <TicketList ticketsData={tickets} />
    </div>
  );
};

export default AllTicketsPage;
