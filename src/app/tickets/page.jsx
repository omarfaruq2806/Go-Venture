import TicketList from "@/components/allTickets/TicketList";
import { getAllTickets } from "@/lib/actions/tickets";

const AllTicketsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page;
  const tickets = await getAllTickets("approved", "", page);
  console.log(tickets);

  return <TicketList ticketsData={tickets} />;
};

export default AllTicketsPage;
