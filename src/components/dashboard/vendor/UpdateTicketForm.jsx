"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateTicket } from "@/lib/actions/tickets";

const UpdateTicketForm = ({ ticket, onClose }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (ticket) {
      setValue("title", ticket.title);
      setValue("from", ticket.from);
      setValue("to", ticket.to);
      setValue("transportType", ticket.transportType);
      setValue("price", ticket.price);
      setValue("quantity", ticket.quantity);
      setValue("departureDateTime", ticket.departureDateTime);
      setValue("description", ticket.description);
      setValue("seatType", ticket.seatType);
    //   setImageUrl(ticket.image);
    }
  }, [ticket, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const updatedData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: data.price,
        quantity: data.quantity,
        departureDateTime: data.departureDateTime,
        description: data.description,
        seatType: data.seatType,
        perks: data.perks || [],
        vendorName: ticket.vendorName,
        vendorEmail: ticket.vendorEmail,
      };

      const res = await updateTicket(ticket._id, updatedData);

      if (res.modifiedCount > 0) {
        alert("Ticket Updated Successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Update Ticket</h2>

      <input {...register("title")} />

      <input {...register("from")} />
      <input {...register("to")} />

      <select {...register("transportType")}>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="launch">Launch</option>
        <option value="flight">Flight</option>
      </select>

      <input type="number" {...register("price")} />
      <input type="number" {...register("quantity")} />

      <input type="datetime-local" {...register("departureDateTime")} />

      <textarea {...register("description")} />

      <select {...register("seatType")}>
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="vip">VIP</option>
      </select>

      <div className="flex flex-wrap gap-2">
        <label>
          <input type="checkbox" value="AC" {...register("perks")} />
          AC
        </label>

        <label>
          <input type="checkbox" value="Breakfast" {...register("perks")} />
          Breakfast
        </label>

        <label>
          <input type="checkbox" value="Wifi" {...register("perks")} />
          Wifi
        </label>

        <label>
          <input type="checkbox" value="Lunch" {...register("perks")} />
          Lunch
        </label>

        <label>
          <input type="checkbox" value="Dinner" {...register("perks")} />
          Dinner
        </label>

        <label>
          <input type="checkbox" value="Snacks" {...register("perks")} />
          Snacks
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateTicketForm;
