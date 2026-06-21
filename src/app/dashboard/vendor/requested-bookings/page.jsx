import RequestedBookingRow from "@/components/dashboard/RequestedBookingRow";
import { getBookings } from "@/lib/api/bookings";
import { getSession } from "@/lib/session/server-session";

const RequestedBookings = async () => {
  const { user } = await getSession();
  const bookings = await getBookings("", user.email, "");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Requested Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>User</th>
            <th>Ticket</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <RequestedBookingRow key={b._id} booking={b} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedBookings;
