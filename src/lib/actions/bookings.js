import { serverMutation } from "../core/server";

export const bookNow = async (bookingData) => {
  return serverMutation("/api/bookings", bookingData, "POST");
};

export const updateBooking = async (id, data) => {
  return serverMutation(`/api/bookings/${id}`, data, "PATCH");
};
