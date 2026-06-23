"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession } from "@/lib/session/client-session";
import { addTicket } from "@/lib/actions/tickets";

const AddTicketForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { session } = useSession();

  const { register, handleSubmit, reset } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data?.success) {
        setImageUrl(data.data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departureDateTime: data.departureDateTime,
        description: data.description,
        seatType: data.seatType,
        perks: data.perks || [],
        image: imageUrl, 
        vendorName: session?.user?.name,
        vendorEmail: session?.user?.email,
        status: "pending",
      };

      const res = await addTicket(ticketData);

      if (res?.ok) {
        alert("Ticket added successfully!");
        reset();
        setImageUrl("");
      } else {
        alert("Failed to add ticket");
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Ticket</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          placeholder="Ticket Title"
          {...register("title", { required: true })}
          className="w-full border p-2 rounded"
        />

        {/* From - To */}
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="From Location"
            {...register("from", { required: true })}
            className="border p-2 rounded"
          />
          <input
            placeholder="To Location"
            {...register("to", { required: true })}
            className="border p-2 rounded"
          />
        </div>

        {/* Transport Type */}
        <select
          {...register("transportType", { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Transport</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="flight">Flight</option>

        </select>

        {/* Price + Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price per ticket"
            {...register("price", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            {...register("quantity", { required: true })}
            className="border p-2 rounded"
          />
        </div>

        {/* Date */}
        <input
          type="datetime-local"
          {...register("departureDateTime", { required: true })}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full border p-2 rounded"
        />

        {/* Seat Type */}
        <select {...register("seatType")} className="w-full border p-2 rounded">
          <option value="">Select Seat Type</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="vip">VIP</option>
        </select>

        {/* Perks */}
        <div className="flex gap-4">
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

        {/* IMAGE UPLOAD */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />

          {imageUrl && (
            <img
              src={imageUrl}
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>

        {/* Vendor Info */}
        <div className="text-sm text-gray-500">
          Vendor: <b>{session?.user?.name}</b> ({session?.user?.email})
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add Ticket"}
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
