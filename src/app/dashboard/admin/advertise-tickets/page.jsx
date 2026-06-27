import AdvertiseTicketTable from "@/components/dashboard/admin/AdvertiseTicketTable";
import { getTickets } from "@/lib/api/tickets";
import { Megaphone } from "lucide-react";
import React from "react";

const AdvertiseTickets = async () => {
  // Requirement alignment: Only fetch admin approved tickets logic pass constraints checks tracking map grid tags line options updates
  const tickets = await getTickets("", "approved") || [];

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        
        {/* Banner Headers Dashboard alignment setup description block text container layout templates updates panel */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">Campaign Campaign Manager</h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Promote prominent travel deals directly to the homepage boards carousel. Maximum 6 concurrent allocations allowed.
            </p>
          </div>
        </div>

        {/* Client Interactive Table Container Injection mapping variables dynamic payload updates values */}
        <AdvertiseTicketTable tickets={tickets} />

      </div>
    </div>
  );
};

export default AdvertiseTickets;