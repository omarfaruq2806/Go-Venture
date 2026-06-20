// "use server";
import { serverFetch, serverMutation } from "../core/server";

// add ticket by a vendor
export const addTicket = async (ticket) => {
  //   console.log(ticket, "from function");
  return serverMutation("/api/tickets", ticket, "POST");
};

// get ticket
export const getTickets = async (email = "", status = "") => {
  console.log(email);
  return serverFetch(`/api/tickets?vendorEmail=${email}&status=${status}`);
};

// for updating ticket data
export const updateTicket = async (id, data) => {
  return serverMutation(`/api/tickets/${id}`, data, "PATCH");
};
