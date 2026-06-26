"use client";

import { useState } from "react";
import { updateBooking } from "@/lib/actions/bookings";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const RequestedBookingRow = ({ booking }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    await updateBooking(booking._id, { status: newStatus });
    router.refresh();
    setLoading(false);
  };

  return (
    <tr className="hover:bg-base-200/40 transition-colors">
      <td>
        <div className="flex flex-col">
          <span className="font-bold text-base-content">
            {booking.userName}
          </span>
          <span className="text-[11px] font-bold text-base-content/50">
            {booking.userEmail}
          </span>
        </div>
      </td>

      <td className="font-semibold">{booking.ticketTitle}</td>
      <td className="font-bold">{booking.bookingQuantity}</td>
      <td className="font-black text-primary">
        ৳{booking.totalPrice?.toLocaleString("en-BD")}
      </td>

      <td>
        <span
          className={`badge font-bold text-[10px] uppercase border-none px-2.5 py-2.5 ${
            booking.status === "accepted"
              ? "bg-success/10 text-success"
              : booking.status === "rejected"
                ? "bg-error/10 text-error"
                : "bg-warning/10 text-warning"
          }`}
        >
          {booking.status}
        </span>
      </td>

      <td>
        <div className="flex gap-2 justify-center">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() => handleStatusChange("accepted")}
                disabled={loading}
                className="btn btn-xs btn-success text-white rounded-lg px-3 h-8 shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Accept
                  </>
                )}
              </button>
              <button
                onClick={() => handleStatusChange("rejected")}
                disabled={loading}
                className="btn btn-xs btn-error text-white rounded-lg px-3 h-8 shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <>
                    <XCircle className="w-3 h-3" /> Reject
                  </>
                )}
              </button>
            </>
          )}
          {booking.status !== "pending" && (
            <span className="text-[10px] font-bold text-base-content/30 uppercase">
              Completed
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default RequestedBookingRow;
