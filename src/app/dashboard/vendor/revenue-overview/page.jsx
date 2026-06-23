import { getTickets } from "@/lib/actions/tickets";
import { getTransectionsHistory } from "@/lib/api/transections";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const RevenueOverview = async () => {
  const { user } = await getSession();
  const email = user?.email;
    const tickets = await getTickets(email);
  const revenue = await getTransectionsHistory("", email);
  console.log(revenue, "vendor revenue");
  const totalSoldTicket = revenue.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );
  const totalRevenue = revenue.reduce(
    (total, item) => total + Number(item.price),
    0,
  );

  console.log(tickets);

  return (
    <div>
      <h1>Revenue Overview</h1>
      <h1>Total Ticket : {tickets.length}</h1>
      <h1>Total Sold Ticket : {totalSoldTicket}</h1>
      <h1>Total Revenuem : {totalRevenue}</h1>
    </div>
  );
};

export default RevenueOverview;
