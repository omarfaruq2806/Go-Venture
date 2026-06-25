import { serverFetch } from "../core/public";

export const getBookings = async (
  userEmail = "",
  vendorEmail = "",
  status = "",
) => {
  return serverFetch(
    `/api/bookings?userEmail=${userEmail}&vendorEmail=${vendorEmail}&status=${status}`,
  );
};
