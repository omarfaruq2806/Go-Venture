// "use server";
import { serverMutation } from "../core/mutation";

// add ticket by a vendor
export const addTicket = async (ticket) => {
  return serverMutation("/api/tickets", ticket, "POST");
};

// for updating ticket data
export const updateTicket = async (id, data) => {
  return serverMutation(`/api/tickets/${id}`, data, "PATCH");
};

// for deleting ticket
export const deleteTicket = async (id) => {
  return serverMutation(`/api/tickets/${id}`, {}, "DELETE");
};
