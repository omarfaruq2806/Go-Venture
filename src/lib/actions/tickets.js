// "use server";
import { serverFetch, serverMutation } from "../core/server";

// add ticket by a vendor
export const addTicket = async (ticket) => {
  //   console.log(ticket, "from function");
  return serverMutation("/api/tickets", ticket, "POST");
};

// get ticket
export const getTickets = async (email = "") => {
  console.log(email);
  return serverFetch(`/api/tickets?vendorEmail=${email}`);
};
