// "use server";
import { serverMutation } from "../core/mutation";
import { serverFetch } from "../core/public";

// add ticket by a vendor
export const addTicket = async (ticket) => {
  return serverMutation("/api/tickets", ticket, "POST");
};

// for updating ticket data
export const updateTicket = async (id, data) => {
  return serverMutation(`/api/tickets/${id}`, data, "PATCH");
};

// get ticket : 1: for vendor with mail ,  2: for admin without mail, 3 : for all ticket section with status , this is private route
export const getTickets = async (
  email = "",
  status = "",
  isAdvertised = "",
) => {
  return serverFetch(
    `/api/tickets?vendorEmail=${email}&status=${status}&isAdvertised=${isAdvertised}`,
  );
};

// for public route
export const getAllTickets = async (status = "", isAdvertised = "", page) => {
  return serverFetch(
    `/api/tickets/public?status=${status}&isAdvertised=${isAdvertised}&page=${page}`,
  );
};

// for getting single ticket
export const getSingleTicket = async (id) => {
  return serverFetch(`/api/tickets/${id}`);
};

// for deleting ticket
export const deleteTicket = async (id) => {
  return serverMutation(`/api/tickets/${id}`, {}, "DELETE");
};

// for getting newst tickets
export const getLatestTickets = async (status = "") => {
  return serverFetch(`/api/tickets/latest?status=${status}`);
};
