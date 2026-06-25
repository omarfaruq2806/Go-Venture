import { serverFetch } from "../core/public";

export const getTransectionsHistory = async (
  userEmail = "",
  vendorEmail = "",
) => {
  return serverFetch(
    `/api/transections?userEmail=${userEmail}&vendorEmail=${vendorEmail}`,
  );
};
