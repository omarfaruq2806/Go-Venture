"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateTicket } from "@/lib/actions/tickets";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";

const UpdateTicketForm = ({ ticket, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (ticket) {
      Object.keys(ticket).forEach((key) => setValue(key, ticket[key]));
    }
  }, [ticket, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const updatedData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };

      const res = await updateTicket(ticket._id, updatedData);

      if (res?.modifiedCount > 0) {
        alert("Ticket Updated Successfully");
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-black text-base-content mb-4 flex items-center justify-between">
        Update Schedule Details
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="w-4 h-4" />
        </button>
      </h2>

      {/* Grid Layout for Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label text-xs font-bold uppercase text-base-content/60">
            Title
          </label>
          <input
            {...register("title")}
            className="input input-bordered w-full bg-base-200/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label text-xs font-bold uppercase text-base-content/60">
              From
            </label>
            <input
              {...register("from")}
              className="input input-bordered w-full bg-base-200/50"
            />
          </div>
          <div className="form-control">
            <label className="label text-xs font-bold uppercase text-base-content/60">
              To
            </label>
            <input
              {...register("to")}
              className="input input-bordered w-full bg-base-200/50"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label text-xs font-bold uppercase text-base-content/60">
            Transport
          </label>
          <select
            {...register("transportType")}
            className="select select-bordered w-full bg-base-200/100"
          >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label text-xs font-bold uppercase text-base-content/60">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className="input input-bordered w-full bg-base-200/50"
          />
        </div>
        <div className="form-control">
          <label className="label text-xs font-bold uppercase text-base-content/60">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity")}
            className="input input-bordered w-full bg-base-200/50"
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label text-xs font-bold uppercase text-base-content/60">
          Departure Time
        </label>
        <input
          type="datetime-local"
          {...register("departureDateTime")}
          className="input input-bordered w-full bg-base-200/50"
        />
      </div>

      <div className="form-control w-full">
        <label className="label text-xs font-bold uppercase text-base-content/60">
          Perks
        </label>
        <div className="grid grid-cols-3 gap-2 bg-base-200/40 p-3 rounded-xl border border-base-200">
          {["AC", "Breakfast", "Wifi", "Lunch", "Dinner", "Snacks"].map(
            (perk) => (
              <label
                key={perk}
                className="flex items-center gap-2 cursor-pointer text-sm font-semibold"
              >
                <input
                  type="checkbox"
                  value={perk}
                  {...register("perks")}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                {perk}
              </label>
            ),
          )}
        </div>
      </div>

      <button
        disabled={loading}
        className="btn btn-primary btn-block rounded-xl font-bold mt-4 shadow-lg"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Save className="w-4 h-4" /> Save Changes
          </>
        )}
      </button>
    </form>
  );
};

export default UpdateTicketForm;
