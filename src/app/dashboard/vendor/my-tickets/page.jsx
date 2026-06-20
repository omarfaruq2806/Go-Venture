import { getTickets } from "@/lib/actions/tickets";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const MyAddedTickets = async () => {
  const { user } = await getSession();
  console.log(user);
  const email = user?.email;
  const tickets = await getTickets(email);
  console.log(tickets, "from page");
  return (
    <div>
      <h1>My Added Tickets</h1>
    </div>
  );
};

export default MyAddedTickets;
