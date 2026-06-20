import AddTicketForm from "@/components/dashboard/AddTicketForm";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const AddTicketPage = async () => {
  const session = await getSession();
  return (
    <div>
      <h1>Add Ticket</h1>
      <AddTicketForm ></AddTicketForm>
    </div>
  );
};

export default AddTicketPage;
