"use client";

import { updateBooking } from "@/lib/actions/bookings";


const RequestedBookingRow = ({ booking }) => {
  const handleAccept = async () => {
    await updateBooking(booking._id, {
      status: "accepted",
    });
  };

  const handleReject = async () => {
    await updateBooking(booking._id, {
      status: "rejected",
    });
  };

  return (
    <tr className="border-t">
      <td>
        <div>
          <p>{booking.userName}</p>
          <p className="text-sm text-gray-500">{booking.userEmail}</p>
        </div>
      </td>

      <td>{booking.ticketTitle}</td>

      <td>{booking.bookingQuantity}</td>

      <td>৳{booking.totalPrice}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-sm ${
            booking.status === "accepted"
              ? "bg-green-100 text-green-700"
              : booking.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {booking.status}
        </span>
      </td>

      <td className="flex gap-2">
        <button
          onClick={handleAccept}
        //   disabled={booking.status !== "pending"} comment for test
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Accept
        </button>

        <button
          onClick={handleReject}
        //   disabled={booking.status !== "pending"} comment for test
          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default RequestedBookingRow;