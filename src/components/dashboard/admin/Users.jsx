"use client";
import { markUserAsFraud, updateUserRole } from "@/lib/actions/users";
import { useRouter } from "next/navigation";

const Users = ({ users }) => {
  const router = useRouter();

  const handleRoleChange = async (userId, role) => {
    const res = await updateUserRole(userId, role);
    // router.refresh();
  };

  const markAsFroud = async (userId, isFroud) => {
    const res = await markUserAsFraud(userId, isFroud);
    router.push();
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-md">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover">
              <td>{index + 1}</td>

              <td className="font-medium">{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span
                  className={`badge ${
                    user.role === "admin"
                      ? "badge-primary"
                      : user.role === "vendor"
                        ? "badge-secondary"
                        : "badge-outline"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td>
                <div className="flex flex-wrap justify-center gap-2">
                  {user.role !== "admin" && (
                    <button className="btn btn-xs btn-primary">
                      Make Admin
                    </button>
                  )}

                  {user.role !== "vendor" && (
                    <button
                      onClick={() => {
                        handleRoleChange(user.id, "vendor");
                      }}
                      className="btn btn-xs btn-secondary"
                    >
                      Make Vendor
                    </button>
                  )}

                  {user.role === "vendor" && (
                    <button
                      onClick={() => {
                        markAsFroud(user.id, true);
                      }}
                      className="btn btn-xs btn-error"
                    >
                      Mark as Fraud
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
