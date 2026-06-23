import BookingCard from "@/components/dashboard/BookingCard";
import { getBookings } from "@/lib/api/bookings";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const UserTickets = async () => {
  const { user } = await getSession();
  const bookings = await getBookings(user.email);
  return (
    <div>
      <h1>your booked tickets page</h1>
      <div className="grid grid-cols-3 gap-4">
        {bookings.map((b) => (
          <BookingCard key={b._id} booking={b} />
        ))}
      </div>
    </div>
  );
};

export default UserTickets;
