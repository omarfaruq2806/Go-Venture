import AdvertiseTicketTable from "@/components/dashboard/admin/AdvertiseTicketTable";
import { getTickets } from "@/lib/actions/tickets";

const AdvertiseTickets = async () => {
  const tickets = await getTickets("", "approved");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Advertise Tickets</h1>

      <AdvertiseTicketTable tickets={tickets} />
    </div>
  );
};

export default AdvertiseTickets;
