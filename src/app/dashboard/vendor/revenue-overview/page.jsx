import Recharts from "@/components/dashboard/vendor/Recharts";
import { getTickets } from "@/lib/api/tickets";
import { getTransectionsHistory } from "@/lib/api/transections";
import { getSession } from "@/lib/session/server-session";
import { Ticket, ShoppingCart, DollarSign, BarChart3 } from "lucide-react";
import React from "react";

const RevenueOverview = async () => {
  const session = await getSession();
  const email = session?.user?.email;

  const tickets = (await getTickets(email)) || [];
  const revenue = (await getTransectionsHistory("", email)) || [];

  const chartData = revenue.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    revenue: Number(item.price), // price-কে Number-এ কনভার্ট করলাম
  }));

  const totalSoldTicket = revenue.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );
  const totalRevenue = revenue.reduce(
    (total, item) => total + Number(item.price || 0),
    0,
  );

  return (
    <div className="w-full bg-base-100 min-h-screen p-4 md:p-6 transition-colors duration-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-base-content flex items-center gap-2">
          <BarChart3 className="text-primary" /> Revenue Overview
        </h1>
        <p className="text-sm text-base-content/60 font-medium">
          Detailed insights into your sales performance.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full mb-8 border border-base-200 rounded-2xl overflow-hidden">
        <div className="stat bg-base-100">
          <div className="stat-figure text-primary">
            <Ticket className="w-8 h-8" />
          </div>
          <div className="stat-title font-bold text-xs uppercase">
            Total Tickets Added
          </div>
          <div className="stat-value text-primary">{tickets.length}</div>
        </div>

        <div className="stat bg-base-100">
          <div className="stat-figure text-secondary">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="stat-title font-bold text-xs uppercase">
            Total Sold
          </div>
          <div className="stat-value text-secondary">{totalSoldTicket}</div>
        </div>

        <div className="stat bg-base-100">
          <div className="stat-figure text-success">
            <DollarSign className="w-8 h-8" />
          </div>
          <div className="stat-title font-bold text-xs uppercase">
            Total Revenue
          </div>
          <div className="stat-value text-success">
            ৳{totalRevenue.toLocaleString("en-BD")}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-3">
          <Recharts data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
