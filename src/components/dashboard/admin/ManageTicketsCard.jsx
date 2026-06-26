"use client";

import React, { useState } from "react";
import { updateTicket } from "@/lib/actions/tickets";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, ArrowRight, Bus } from "lucide-react";

const ManageTicketsCard = ({ ticket, index }) => {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState(null); // Tracking loaders logic ('approve' | 'reject')

  const handleApprove = async () => {
    try {
      setLoadingType("approve");
      await updateTicket(ticket._id, { status: "approved" });
      router.refresh(); // Sync data model states components re-fetch instantly
    } catch (error) {
      console.error("Ticket approval processing execution failed:", error);
    } finally {
      setLoadingType(null);
    }
  };

  const handleReject = async () => {
    try {
      setLoadingType("reject");
      await updateTicket(ticket._id, { status: "rejected" });
      router.refresh(); // Sync data model states components re-fetch instantly
    } catch (error) {
      console.error("Ticket rejection processing execution failed:", error);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <tr className="transition-colors hover:bg-base-200/40">
      {/* Index Matrix Number */}
      <td className="font-bold text-base-content/30">{index + 1}</td>

      {/* Ticket Brief Block */}
      <td>
        <div className="flex flex-col min-w-[150px]">
          <span className="font-black text-base-content tracking-tight line-clamp-1">
            {ticket.title}
          </span>
          <span className="text-[11px] font-bold text-base-content/40 mt-0.5">
            {ticket.quantity} Units Available
          </span>
        </div>
      </td>

      {/* Route mapping visualization vector */}
      <td>
        <div className="flex items-center gap-1.5 text-xs font-bold text-base-content">
          <span className="bg-base-200 px-2 py-0.5 rounded border border-base-300/60 max-w-[90px] truncate">
            {ticket.from}
          </span>
          <ArrowRight className="w-3 h-3 text-primary/60 flex-shrink-0 animate-pulse" />
          <span className="bg-base-200 px-2 py-0.5 rounded border border-base-300/60 max-w-[90px] truncate">
            {ticket.to}
          </span>
        </div>
      </td>

      {/* Transport Type badge formatting */}
      <td className="capitalize font-extrabold text-xs text-base-content/70">
        <span className="inline-flex items-center gap-1">
          <Bus className="w-3.5 h-3.5 text-primary/50" /> {ticket.transportType}
        </span>
      </td>

      {/* Vendor Profile Data Details card segment */}
      <td>
        <div className="flex flex-col max-w-[180px] min-w-[120px]">
          <span className="font-bold text-base-content/80 truncate">
            {ticket.vendorName}
          </span>
          <span className="text-[11px] font-medium text-base-content/40 truncate mt-0.5">
            {ticket.vendorEmail}
          </span>
        </div>
      </td>

      {/* Fare pricing localized wrapper formatted text code layout */}
      <td className="font-black text-primary text-sm">
        ৳{ticket.price ? ticket.price.toLocaleString("en-BD") : "0"}
      </td>

      {/* Cross theme safe visual markup badges logic box container updates */}
      <td>
        <span
          className={`badge font-bold text-xs uppercase tracking-wide px-2.5 py-2.5 border-none ${
            ticket.status === "approved"
              ? "bg-success/10 text-success"
              : ticket.status === "rejected"
                ? "bg-error/10 text-error"
                : "bg-warning/10 text-warning"
          }`}
        >
          {ticket.status || "pending"}
        </span>
      </td>

      {/* Actions control buttons system execution frame alignment */}
      <td>
        <div className="flex gap-2 justify-center items-center">
          {/* Action A: Approve Button handler element config tag map */}
          <button
            onClick={handleApprove}
            disabled={ticket.status === "approved" || loadingType !== null}
            className="btn btn-xs rounded-lg font-bold bg-success/10 text-success border-none hover:bg-success hover:text-success-content gap-1 transition-all h-7 px-2.5 disabled:bg-base-200 disabled:text-base-content/20"
          >
            {loadingType === "approve" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3" /> Approve
              </>
            )}
          </button>

          {/* Action B: Reject Button handler element config tag map */}
          <button
            onClick={handleReject}
            disabled={ticket.status === "rejected" || loadingType !== null}
            className="btn btn-xs rounded-lg font-bold bg-error/10 text-error border-none hover:bg-error hover:text-error-content gap-1 transition-all h-7 px-2.5 disabled:bg-base-200 disabled:text-base-content/20"
          >
            {loadingType === "reject" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                <XCircle className="w-3 h-3" /> Reject
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageTicketsCard;
