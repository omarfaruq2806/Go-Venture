import { serverFetch } from "../core/server";

export const getTransectionsHistory = async (userEmail="", vendorEmail="") => {
  return serverFetch(
    `/api/transections?userEmail=${userEmail}&vendorEmail=${vendorEmail}`,
  );
};
