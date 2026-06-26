import RequestedBookingRow from "@/components/dashboard/RequestedBookingRow";
import { getBookings } from "@/lib/api/bookings";
import { getSession } from "@/lib/session/server-session";
import { FolderSync } from "lucide-react";
import React from "react";

const RequestedBookings = async () => {
  const session = await getSession();
  const user = session?.user;
  const bookings = await getBookings("", user?.email || "", "");

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Header Section */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-secondary/10 text-secondary rounded-xl">
            <FolderSync className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">
              Requested Bookings
            </h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Review and process upcoming travel reservation requests from
              passengers.
            </p>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-xl">
          <table className="table table-md w-full">
            <thead className="bg-base-200 text-base-content/80 font-black text-xs uppercase tracking-wider border-b border-base-200">
              <tr>
                <th>Passenger</th>
                <th>Ticket Title</th>
                <th>Quantity</th>
                <th>Revenue</th>
                <th>Status</th>
                <th className="text-center">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200 text-sm font-medium">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 font-bold text-base-content/40"
                  >
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <RequestedBookingRow key={b._id} booking={b} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
