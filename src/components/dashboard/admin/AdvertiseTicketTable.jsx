"use client";

import React, { useState } from "react";
import { updateTicket } from "@/lib/actions/tickets";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles, AlertCircle } from "lucide-react";

const AdvertiseTicketTable = ({ tickets }) => {
  const [allTickets, setAllTickets] = useState(tickets);
  const [loadingTicketId, setLoadingTicketId] = useState(null);
  const router = useRouter();

  // Compute live promotion metrics alignment dynamic variables structure mapping
  const advertisedCount = allTickets.filter((item) => item.isAdvertised).length;

  const handleAdvertiseToggle = async (ticket) => {
    // REQUIREMENT BLOCK RULE: Constraint execution blocker check matching context array limit parameters
    if (!ticket.isAdvertised && advertisedCount >= 6) {
      alert(
        "Maximum limit exceeded! Admin cannot advertise more than 6 tickets at a time.",
      );
      return;
    }

    try {
      setLoadingTicketId(ticket._id);

      // Trigger backend data modifier action execution parameters object maps pipeline context setup line
      const result = await updateTicket(ticket._id, {
        isAdvertised: !ticket.isAdvertised,
      });

      // FIX: Flexible validation checking condition boundary to prevent state updates blocking freeze crash layout matrix lines
      if (result || result?.modifiedCount > 0) {
        const updatedTickets = allTickets.map((item) => {
          if (item._id === ticket._id) {
            return {
              ...item,
              isAdvertised: !item.isAdvertised,
            };
          }
          return item;
        });

        setAllTickets(updatedTickets);
        router.refresh(); // Sync server background component arrays context triggers safely instantly line parameters
      }
    } catch (error) {
      console.error(
        "Advertisement mutation override processing execution error:",
        error,
      );
    } finally {
      setLoadingTicketId(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Live Tracking Metrics Widgets Status Ribbon Layout Content Panel Section View Box Elements */}
      <div className="flex items-center justify-between bg-base-200/50 rounded-xl p-4 border border-base-200/60 text-sm">
        <div className="flex items-center gap-2 font-bold text-base-content/70">
          <Sparkles className="w-4 h-4 text-warning" />
          <span>Active Promotion Slots:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black text-base ${advertisedCount >= 6 ? "text-error" : "text-success"}`}
          >
            {advertisedCount}
          </span>
          <span className="font-extrabold text-base-content/30">/</span>
          <span className="font-black text-base-content/50">6 Max</span>
        </div>
      </div>

      {/* Main Struct Datatable Board Sheet Overlay Components Structure Grid Layer Layout */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-xl w-full">
        <table className="table table-md w-full">
          <thead className="bg-base-200 text-base-content/80 font-black text-xs uppercase tracking-wider border-b border-base-200">
            <tr>
              <th>Ticket Info</th>
              <th>Route Spec</th>
              <th>Fare Pricing</th>
              <th>Campaign Status</th>
              <th className="text-center w-40">Promotion Control</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-200 text-sm font-medium">
            {allTickets.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 font-bold text-base-content/40"
                >
                  No administrative approved tickets records found eligible for
                  campaigns.
                </td>
              </tr>
            ) : (
              allTickets.map((ticket) => {
                const isCurrentLoading = loadingTicketId === ticket._id;

                return (
                  <tr
                    key={ticket._id}
                    className="transition-colors hover:bg-base-200/40"
                  >
                    {/* Column 1: Core Content Typography Info Card Layout */}
                    <td>
                      <div className="flex flex-col">
                        <span className="font-black text-base-content tracking-tight line-clamp-1">
                          {ticket.title}
                        </span>
                        <span className="text-[11px] font-bold text-base-content/40 mt-0.5 capitalize">
                          {ticket.transportType || "Transport"} Pool
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Route directional array block vector */}
                    <td>
                      <div className="flex items-center gap-1 text-xs font-bold text-base-content">
                        <span className="bg-base-200 px-2 py-0.5 rounded border border-base-300/40 truncate max-w-[100px]">
                          {ticket.from}
                        </span>
                        <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                        <span className="bg-base-200 px-2 py-0.5 rounded border border-base-300/40 truncate max-w-[100px]">
                          {ticket.to}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Localized pricing grouping code formatting text logic check layout box */}
                    <td className="font-black text-base-content/80">
                      ৳
                      {ticket.price
                        ? ticket.price.toLocaleString("en-BD")
                        : "0"}
                    </td>

                    {/* Column 4: Safe Theme status flag badges layout box wrapper line matrix checks */}
                    <td>
                      <span
                        className={`badge font-bold text-[10px] uppercase tracking-wider px-2.5 py-2.5 border-none ${
                          ticket.isAdvertised
                            ? "bg-success/10 text-success animate-pulse"
                            : "bg-base-200 text-base-content/40"
                        }`}
                      >
                        {ticket.isAdvertised
                          ? "✨ Featured Live"
                          : "Idle Stock"}
                      </span>
                    </td>

                    {/* Column 5: REQUIREMENT FEATURE: Clean Toggle Checkbox Selector Control System Alignment Layer */}
                    <td className="text-center">
                      <div className="flex items-center justify-center min-w-[100px]">
                        {isCurrentLoading ? (
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                        ) : (
                          <div className="form-control">
                            <label className="cursor-pointer label p-0 gap-3">
                              {/* Native premium DaisyUI smooth round active animation toggle controller state matching trigger click maps */}
                              <input
                                type="checkbox"
                                checked={!!ticket.isAdvertised}
                                onChange={() => handleAdvertiseToggle(ticket)}
                                disabled={loadingTicketId !== null}
                                className="toggle toggle-primary toggle-sm shadow-inner transition-transform active:scale-95 disabled:opacity-40"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTicketTable;
