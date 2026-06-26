import Users from "@/components/dashboard/admin/Users";
import { getAllUsers } from "@/lib/api/users";
import React from "react";

const ManageUsers = async () => {
  const users = await getAllUsers();
  return (
    <div>
      <h1>Manage Users : {users.total}</h1>
      <Users users={users.users || []}></Users>
    </div>
  );
};

export default ManageUsers;
