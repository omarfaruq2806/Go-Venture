import { serverMutation } from "../core/server";

export const bookNow = async (bookingData) => {
  return serverMutation("/api/bookings", bookingData, "POST");
};
