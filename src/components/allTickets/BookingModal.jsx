"use client";

import { bookNow } from "@/lib/actions/bookings";
import { useSession } from "@/lib/session/client-session";
import { useState } from "react";
import {
  TicketCheck,
  X,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BookingModal = ({ ticket, closeModal }) => {
  const { session } = useSession();
  const user = session?.user;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const maxAvailable = ticket?.quantity || 0;

  const handleIncrement = () => {
    if (quantity < maxAvailable) {
      setQuantity((prev) => prev + 1);
      setErrorMessage("");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setErrorMessage("");
    }
  };

  const handleInputChange = (e) => {
    const val = Number(e.target.value);
    setQuantity(val);

    if (val > maxAvailable) {
      setErrorMessage(
        `Booking quantity can't be greater than Ticket Quantity (${maxAvailable})`,
      );
    } else if (val < 1) {
      setErrorMessage("Quantity must be at least 1");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity > maxAvailable) {
      setErrorMessage(
        `Booking quantity can't be greater than Ticket Quantity (${maxAvailable})`,
      );
      return;
    }
    if (quantity < 1) {
      setErrorMessage("Please enter a valid ticket quantity.");
      return;
    }

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      bookingDateTime: new Date().toISOString(),
      departureDateTime: ticket.departureDateTime,
      bookingQuantity: quantity,
      totalPrice: quantity * ticket.price,
      status: "pending",
      vendorName: ticket.vendorName,
      vendorEmail: ticket.vendorEmail,
      userName: user?.name || "Anonymous User",
      userEmail: user?.email || "",
      from: ticket.from,
      to: ticket.to,
      transportType: ticket.transportType,
    };

    setLoading(true);
    try {
      await bookNow(bookingData);
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Booking failed:", error);
      setErrorMessage("Something went wrong during booking submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIX: Full screen z-stack boost layout grid system override correction
    <div className="fixed inset-0 w-screen h-screen min-h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] left-0 top-0">
      {/* Background close overlay click trigger */}
      <div
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={!loading ? closeModal : undefined}
      ></div>

      {/* Box layout panel */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-2xl p-6 max-w-md w-full relative z-[100000] max-h-[90vh] overflow-y-auto">
        {/* Header Area */}
        <div className="flex items-center justify-between border-b border-base-200 pb-3 mb-4">
          <h3 className="font-black text-lg text-base-content flex items-center gap-2">
            <TicketCheck className="w-5 h-5 text-primary" /> Confirm Your
            Booking
          </h3>
          <button
            onClick={closeModal}
            disabled={loading}
            className="btn btn-sm btn-circle btn-ghost text-base-content/50 hover:text-base-content disabled:bg-transparent"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Journey Summary Box */}
        <div className="bg-base-200/60 p-3 rounded-xl border border-base-200 mb-4 text-xs font-semibold text-base-content/70">
          <p className="font-extrabold text-sm text-base-content mb-1 truncate">
            {ticket.title}
          </p>
          <p>
            Route: 📍 {ticket.from} → {ticket.to}
          </p>
          <p className="mt-0.5">
            Fare per Unit:{" "}
            <span className="text-primary font-bold">৳{ticket.price}</span>
          </p>
        </div>

        {/* Form Operations */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control w-full">
            <label className="label pt-0">
              <span className="label-text font-bold text-base-content/70 text-xs uppercase tracking-wider">
                Select Seats / Quantity
              </span>
              <span className="label-text-alt font-bold text-success">
                {maxAvailable} Available
              </span>
            </label>

            {/* Custom Interactive Stepper Counter */}
            <div className="flex items-center justify-between bg-base-200 p-2 rounded-xl border border-base-300 w-full">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1 || loading}
                className="btn btn-square btn-sm btn-ghost bg-base-100 border border-base-300 text-base-content disabled:opacity-40 rounded-lg shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="1"
                max={maxAvailable}
                value={quantity}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-transparent font-black text-xl text-center text-base-content w-20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= maxAvailable || loading}
                className="btn btn-square btn-sm btn-ghost bg-base-100 border border-base-300 text-base-content disabled:opacity-40 rounded-lg shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs font-semibold text-error mt-2 flex items-center gap-1">
                ⚠️ {errorMessage}
              </p>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-dashed border-base-300 pt-3 flex items-center justify-between text-sm">
            <span className="font-bold text-base-content/60">
              Estimated Total:
            </span>
            <span className="text-xl font-black text-primary">
              ৳
              {(
                (ticket.price || 0) *
                (quantity > 0 && quantity <= maxAvailable ? quantity : 0)
              ).toLocaleString("en-BD")}
            </span>
          </div>

          {/* Notice Info Tag */}
          <div className="alert bg-info/5 border border-info/10 p-3 rounded-xl flex items-start gap-2.5 text-xs text-base-content/70 font-medium">
            <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>
              By confirming, tickets allocation status triggers as{" "}
              <strong>"Pending"</strong> instantly.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content flex-1 font-bold rounded-xl btn-sm h-11"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || maxAvailable === 0 || !!errorMessage}
              className="btn btn-primary text-primary-content flex-1 font-bold rounded-xl btn-sm h-11 shadow-sm shadow-primary/20"
            >
              {loading ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
