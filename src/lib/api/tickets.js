import { serverFetch } from "../core/public";
import { protectedFetch } from "../core/server";

// get ticket : 1: for vendor with mail ,  2: for admin without mail, 3 : for all ticket section with status , this is private route
export const getTickets = async (
  email = "",
  status = "",
  isAdvertised = "",
) => {
  return protectedFetch(
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
  return protectedFetch(`/api/tickets/${id}`);
};

// for getting newst tickets
export const getLatestTickets = async (status = "") => {
  return serverFetch(`/api/tickets/latest?status=${status}`);
};
