import AddTicketForm from "@/components/dashboard/AddTicketForm";
import { getSession } from "@/lib/session/server-session";
import React from "react";

const AddTicketPage = async () => {
  const session = await getSession();
  return (
    <div>
      <AddTicketForm ></AddTicketForm>
    </div>
  );
};

export default AddTicketPage;
