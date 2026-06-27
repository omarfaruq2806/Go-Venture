import { protectedFetch } from "../core/server";

export const getBookings = async (
  userEmail = "",
  vendorEmail = "",
  status = "",
) => {
  return protectedFetch(
    `/api/bookings?userEmail=${userEmail}&vendorEmail=${vendorEmail}&status=${status}`,
  );
};
