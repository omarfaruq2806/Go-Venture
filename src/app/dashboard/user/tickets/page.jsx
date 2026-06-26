import BookingCard from "@/components/dashboard/BookingCard";
import { getBookings } from "@/lib/api/bookings";
import { getSession } from "@/lib/session/server-session";
import { TicketCheck } from "lucide-react";
import React from "react";

const UserTickets = async () => {
  // FIX 1: Safe session object matching context to prevent direct destructuring null parameters pointers crash
  const session = await getSession();
  const user = session?.user;

  const bookings = (await getBookings(user?.email || "")) || [];

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Responsive Dashboard Header Widget */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <TicketCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">
              My Booked Tickets
            </h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Monitor reservation updates, inspect operational routes schedules,
              and secure payments transactions safely.
            </p>
          </div>
        </div>

        {/* REQUIREMENT: 3-Column Grid Layout Mobile responsive fluid stack container elements line splits */}
        {bookings.length === 0 ? (
          <div className="card border border-base-200 bg-base-100 p-10 text-center rounded-2xl shadow-sm">
            <p className="font-bold text-base-content/40 text-sm">
              You haven't initialized any booked ticket logs yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((b) => (
              <BookingCard key={b._id || b.id} booking={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTickets;
