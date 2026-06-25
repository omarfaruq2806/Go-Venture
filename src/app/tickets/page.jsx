import TicketList from "@/components/allTickets/TicketList";
import { getAllTickets } from "@/lib/actions/tickets";

const AllTicketsPage = async () => {
  const tickets = await getAllTickets("approved", "");

  return <TicketList tickets={tickets} />;
};

export default AllTicketsPage;
