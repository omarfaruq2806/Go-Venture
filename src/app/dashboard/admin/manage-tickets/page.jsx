import ManageTicketsCard from "@/components/dashboard/admin/ManageTicketsCard";
import { getTickets } from "@/lib/actions/tickets";
import { TicketCheck } from "lucide-react";
import React from "react";

const ManageTickets = async () => {
  const tickets = await getTickets();

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Table Widget Responsive Header Header Banner Description Layout */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <TicketCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">
              Manage Vendor Tickets
            </h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Review, approve, or reject vendor transport seat submissions to
              synchronize global ticket boards.
            </p>
          </div>
        </div>

        {/* Outer Wrapper Sheet Container */}
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-xl w-full">
          <table className="table table-md w-full">
            {/* Dark Mode Safe Table Thead Base Component */}
            <thead className="bg-base-200 text-base-content/80 font-black text-xs uppercase tracking-wider border-b border-base-200">
              <tr>
                <th className="w-12">#</th>
                <th>Ticket Info</th>
                <th>Route Matrix</th>
                <th>Transport</th>
                <th>Operator / Vendor</th>
                <th>Fare Price</th>
                <th>Current Status</th>
                <th className="text-center w-52">Operations</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200 text-sm font-medium">
              {!tickets || tickets.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12 font-bold text-base-content/40"
                  >
                    No vendor ticket schedules uploaded yet inside the platform
                    databases.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket, index) => (
                  <ManageTicketsCard
                    key={ticket._id}
                    ticket={ticket}
                    index={index}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;
