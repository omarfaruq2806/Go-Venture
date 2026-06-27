import { protectedFetch } from "../core/server";

export const getTransectionsHistory = async (
  userEmail = "",
  vendorEmail = "",
) => {
  return protectedFetch(
    `/api/transections?userEmail=${userEmail}&vendorEmail=${vendorEmail}`,
  );
};
