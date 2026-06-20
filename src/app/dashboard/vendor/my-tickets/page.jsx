import MyTicketCard from "@/components/dashboard/MyTicketCard";
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <MyTicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default MyAddedTickets;
