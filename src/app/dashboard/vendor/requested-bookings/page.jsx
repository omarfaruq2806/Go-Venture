import { getBookings } from "@/lib/api/bookings";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const RequestedBookings = async () => {
  const { user } = await getSession();
  console.log(user);
  const bookings = await getBookings("", "", "pending");
  console.log(bookings);
  return (
    <div>
      <h1>Requested Bookings</h1>
    </div>
  );
};

export default RequestedBookings;
