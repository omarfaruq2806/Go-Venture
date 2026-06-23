// "use server";
import { serverFetch, serverMutation } from "../core/server";

// add ticket by a vendor
export const addTicket = async (ticket) => {
  //   console.log(ticket, "from function");
  return serverMutation("/api/tickets", ticket, "POST");
};

// for updating ticket data
export const updateTicket = async (id, data) => {
  return serverMutation(`/api/tickets/${id}`, data, "PATCH");
};

// get ticket
export const getTickets = async (email = "", status = "") => {
  return serverFetch(`/api/tickets?vendorEmail=${email}&status=${status}`);
};

// for getting single ticket
export const getSingleTicket = async (id) => {
  return serverFetch(`/api/tickets/${id}`);
};

// for deleting ticket
export const deleteTicket = async (id) => {
  console.log(id, "from fuunc");
  return serverMutation(`/api/tickets/${id}`, {}, "DELETE");
};
