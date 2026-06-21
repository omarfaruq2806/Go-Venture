import ManageTicketsCard from "@/components/dashboard/admin/ManageTicketsCard";
import { getTickets } from "@/lib/actions/tickets";

const ManageTickets = async () => {
  const tickets = await getTickets();

 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tickets</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Ticket</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets?.map((ticket, index) => (
              <ManageTicketsCard
                key={ticket._id}
                ticket={ticket}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
