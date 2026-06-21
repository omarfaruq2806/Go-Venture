import { serverFetch } from "../core/server";

export const getBookings = async (
  userEmail = "",
  vendorEmail = "",
  status = "",
) => {
  return serverFetch(
    `/api/bookings?userEmail=${userEmail}&vendorEmail=${vendorEmail}&status=${status}`,
  );
};
