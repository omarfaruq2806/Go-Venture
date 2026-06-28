"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/session/client-session";
import { addTicket } from "@/lib/actions/tickets";
import {
  TicketPlus,
  MapPin,
  Bus,
  Coins,
  Layers,
  Calendar,
  FileText,
  Coffee,
  ImagePlus,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const AddTicketForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // FIX: Isolated image handling loader to prevent submitting incomplete dynamic form datasets links
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
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
        toast.error(
          "Image optimization or upload server processing failed. Try again.",
        );
      }
    } catch (err) {
      console.error("Image file serialization block crash:", err);
      toast.error("Network glitch caused upload system breakdown.");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error(
        "Please upload a transport or destination cover image before saving.",
      );
      return;
    }

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
        vendorName: session?.user?.name || "Merchant Store",
        vendorEmail: session?.user?.email || "",
        isAdvertised: false,
        status: "pending",
      };

      const res = await addTicket(ticketData);

      if (res?.ok || res?.success) {
        toast.success(
          "Success! Ticket has been queued and is awaiting admin approval validation.",
        );
        reset();
        setImageUrl("");

      } else {
        toast.error(
          "Failed to securely deploy ticket record into database clusters.",
        );
      }
    } catch (err) {
      toast.error("An unexpected exception blocked data transmission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIX: Theme adaptive container variables layer map context
    <div className="w-full max-w-3xl mx-auto bg-base-100 border border-base-200 shadow-2xl rounded-3xl overflow-hidden transition-all duration-200 my-4">
      {/* Dynamic Header Box Area Segment */}
      <div className="p-6 border-b border-base-200 bg-base-200/30 flex items-center gap-3.5">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
          <TicketPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-base-content tracking-tight">
            Deploy Transport Schedule
          </h2>
          <p className="text-xs text-base-content/40 font-semibold mt-0.5">
            Publish travel ticket allocations, declare specialized seat options,
            and define amenities variables routes.
          </p>
        </div>
      </div>

      {/* Main Core Form Shell Layout Grid Container Elements */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-5 text-left"
      >
        {/* Field 1: Core Title Content Typography Input Blocks */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide">
            Ticket Title Designation
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g., Premium AC Sleeper - Dhaka to Cox's Bazar"
              {...register("title", { required: true })}
              className={`input input-bordered w-full rounded-xl pl-4 font-semibold text-sm bg-base-200/40 text-base-content ${errors.title ? "input-error" : ""}`}
            />
          </div>
        </div>

        {/* Field 2: Route Specs (From -> To Locations Horizontal Blocks Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" /> Boarding Station
              (From)
            </label>
            <input
              type="text"
              placeholder="e.g., Dhaka"
              {...register("from", { required: true })}
              className="input input-bordered w-full rounded-xl font-semibold text-sm bg-base-200/40 text-base-content"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 text-secondary" /> Destination Drop
              (To)
            </label>
            <input
              type="text"
              placeholder="e.g., Cox's Bazar"
              {...register("to", { required: true })}
              className="input input-bordered w-full rounded-xl font-semibold text-sm bg-base-200/40 text-base-content"
            />
          </div>
        </div>

        {/* Field 3: Transport Type Categories Selector Box Array Options */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
            <Bus className="w-3.5 h-3.5 text-primary" /> Vehicle Classification
          </label>
          <select
            {...register("transportType", { required: true })}
            className="select select-bordered w-full rounded-xl font-semibold text-sm bg-base-200/40 text-base-content capitalize"
          >
            <option value="">Choose Available Transport Fleet</option>
            <option value="bus">🚌 Bus Services</option>
            <option value="train">🚂 Train Network</option>
            <option value="launch">🚢 Launch Cruise</option>
            <option value="flight">✈️ Flight Airline</option>
          </select>
        </div>

        {/* Field 4: Financial Metrics Base Allocation Specs Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-success" /> Seat Fare Price
              (BDT)
            </label>
            <input
              type="number"
              placeholder="৳ Price Per Ticket Unit"
              {...register("price", { required: true, min: 1 })}
              className="input input-bordered w-full rounded-xl font-black text-sm bg-base-200/40 text-base-content"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-info" /> Total Inventory Count
            </label>
            <input
              type="number"
              placeholder="Available Capacity Quantity"
              {...register("quantity", { required: true, min: 1 })}
              className="input input-bordered w-full rounded-xl font-bold text-sm bg-base-200/40 text-base-content"
            />
          </div>
        </div>

        {/* Field 5: Departure DateTime String Timeline Mapping Elements */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-warning" /> Departure Timeline
            Calendar
          </label>
          <input
            type="datetime-local"
            {...register("departureDateTime", { required: true })}
            className="input input-bordered w-full rounded-xl font-bold text-sm bg-base-200/40 text-base-content px-4"
          />
        </div>

        {/* Field 6: Seat Class Type Levels Array Segment */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide">
            Seat Configuration Tier
          </label>
          <select
            {...register("seatType", { required: true })}
            className="select select-bordered w-full rounded-xl font-semibold text-sm bg-base-200/40 text-base-content"
          >
            <option value="">Select Cabin Comfort Class</option>
            <option value="economy">Economy Tier</option>
            <option value="business">Business Class</option>
            <option value="vip">VIP Lounge Pod</option>
          </select>
        </div>

        {/* Field 7: Amenities Checklist Dynamic Boxes Toggles Ribbon Panel Section */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
            <Coffee className="w-3.5 h-3.5 text-primary" /> Integrated Perks &
            Comfort Amenities
          </label>
          <div className="bg-base-200/40 border border-base-200 rounded-xl p-4 flex flex-wrap gap-x-5 gap-y-3 justify-start items-center text-xs font-bold text-base-content/80">
            {["AC", "Breakfast", "Wifi", "Lunch", "Dinner", "Snacks"].map(
              (perk) => (
                <label
                  key={perk}
                  className="label cursor-pointer p-0 gap-2 hover:text-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    value={perk}
                    {...register("perks")}
                    className="checkbox checkbox-primary checkbox-xs rounded"
                  />
                  <span>{perk}</span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Field 8: Textarea Description Data Log Row Box */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-base-content/40" /> Additional
            Travel Guideline Details
          </label>
          <textarea
            placeholder="Specify reporting details, baggage threshold allocations parameters, or tracking details info bounds rules guidelines text..."
            {...register("description")}
            className="textarea textarea-bordered textarea-md w-full rounded-xl h-24 bg-base-200/40 text-base-content text-sm font-semibold leading-relaxed"
          />
        </div>

        {/* Field 9: Cloud Image Media Uploader Pod Module Integration */}
        <div className="form-control w-full">
          <label className="label py-1 text-xs font-bold text-base-content/60 uppercase tracking-wide flex items-center gap-1">
            <ImagePlus className="w-3.5 h-3.5 text-primary" /> Schedule Cover
            Media Asset
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-base-200/30 border border-base-200 rounded-2xl p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imageUploading || loading}
              className="file-input file-input-bordered file-input-primary file-input-sm w-full sm:max-w-xs rounded-xl font-bold"
            />
            <div className="flex-grow flex items-center justify-center min-h-[80px]">
              {imageUploading ? (
                <div className="flex items-center gap-2 text-xs font-bold text-primary animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" /> Asset uploading
                  cloud vault...
                </div>
              ) : imageUrl ? (
                <div className="relative group rounded-xl overflow-hidden border border-base-300 w-24 h-20 shadow-sm flex-shrink-0">
                  <img
                    src={imageUrl}
                    alt="Uploaded Schedule Context"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-success/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-wider transition-opacity duration-200">
                    <CheckCircle2 className="w-4 h-4" /> Ready
                  </div>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-base-content/30 italic">
                  No media container buffer linked yet.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Static Footprint Signature Vendor Ownership Pill Grid Pod */}
        <div className="alert bg-base-200/50 border border-base-200/60 rounded-xl p-3 flex items-center gap-3 text-xs text-base-content/60 font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
          <span>
            Merchant Lock Signature:{" "}
            <strong>{session?.user?.name || "Anonymous Merchant"}</strong> (
            {session?.user?.email || "N/A"})
          </span>
        </div>

        {/* Primary Action Dispatch Core Submission Controller Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="btn btn-primary btn-block rounded-xl font-bold text-sm text-primary-content tracking-wide shadow-lg shadow-primary/10 hover:shadow-none transition-all border-none bg-primary h-11 min-h-11 disabled:bg-base-300 disabled:text-base-content/30"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Registering
                Allocation Ledger...
              </span>
            ) : (
              "Deploy & Submit Ticket Schedule"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicketForm;
