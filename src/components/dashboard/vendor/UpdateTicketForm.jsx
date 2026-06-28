"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import { updateTicket } from "@/lib/actions/tickets";

const UpdateTicketForm = ({ ticket, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!ticket) return;

    const { _id, departureDateTime, ...rest } = ticket;

    Object.entries(rest).forEach(([key, value]) => {
      setValue(key, value);
    });

    if (departureDateTime) {
      const formatted = new Date(departureDateTime).toISOString().slice(0, 16);

      setValue("departureDateTime", formatted);
    }

    if (ticket.perks) {
      setValue("perks", ticket.perks);
    }
  }, [ticket, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { _id, ...rest } = data;

      const updatedData = {
        ...rest,
        price: Number(rest.price),
        quantity: Number(rest.quantity),
      };

      const res = await updateTicket(ticket._id, updatedData);

      const result = await res.json();


      if (result.modifiedCount > 0) {
        alert("Ticket Updated Successfully");
        router.refresh();
        onClose();
      } else {
        alert("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const perks = ["AC", "Breakfast", "Wifi", "Lunch", "Dinner", "Snacks"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-base-content"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-base-content">
          Update Schedule Details
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase">
              Title
            </span>
          </label>

          <input
            {...register("title")}
            className="input input-bordered bg-base-200/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-bold uppercase">
                From
              </span>
            </label>

            <input
              {...register("from")}
              className="input input-bordered bg-base-200/40"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-bold uppercase">To</span>
            </label>

            <input
              {...register("to")}
              className="input input-bordered bg-base-200/40"
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase">
              Transport
            </span>
          </label>

          <select
            {...register("transportType")}
            className="select select-bordered bg-base-200/40"
          >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="flight">Flight</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase">
              Price
            </span>
          </label>

          <input
            type="number"
            {...register("price")}
            className="input input-bordered bg-base-200/40"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase">
              Quantity
            </span>
          </label>

          <input
            type="number"
            {...register("quantity")}
            className="input input-bordered bg-base-200/40"
          />
        </div>
      </div>

      {/* Departure */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs font-bold uppercase">
            Departure Time
          </span>
        </label>

        <input
          type="datetime-local"
          {...register("departureDateTime")}
          className="input input-bordered bg-base-200/40"
        />
      </div>

      {/* Perks */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs font-bold uppercase">Perks</span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 rounded-xl border border-base-300 bg-base-200/30 p-4">
          {perks.map((perk) => (
            <label
              key={perk}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={perk}
                {...register("perks")}
                defaultChecked={ticket?.perks?.includes(perk)}
                className="checkbox checkbox-primary checkbox-sm"
              />

              <span className="text-sm font-medium">{perk}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full rounded-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
};

export default UpdateTicketForm;
