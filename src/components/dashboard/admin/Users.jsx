"use client";

import React, { useState } from "react";
import { markUserAsFraud, updateUserRole } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  UserCheck,
  ShieldPlus,
  UserX,
  Loader2,
  Users as UsersIcon, // Renamed perfectly tracking context
} from "lucide-react";

const Users = ({ users = [] }) => {
  const router = useRouter();
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleRoleChange = async (userId, role) => {
    try {
      setActionLoadingId(userId + "-" + role);
      await updateUserRole(userId, role);
      router.refresh();
    } catch (error) {
      console.error("Role modification failed:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleMarkAsFraud = async (userId, isFraud) => {
    try {
      setActionLoadingId(userId + "-fraud");
      await markUserAsFraud(userId, isFraud);
      router.refresh();
    } catch (error) {
      console.error("Fraud status override execution error:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="w-full bg-base-100 rounded-2xl border border-base-200 shadow-xl overflow-hidden transition-colors duration-200">
      {/* Table Title Banner */}
      <div className="p-5 border-b border-base-200 bg-base-200/20 flex items-center gap-3">
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
          {/* FIX: Crash resolved by mapping to the correct explicitly imported alias name */}
          <UsersIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-black text-base-content tracking-tight">
            System User Database
          </h2>
          <p className="text-xs text-base-content/50 font-semibold mt-0.5">
            Manage administrative roles, control access rights, and flags vendor
            profiles safety.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-md w-full">
          <thead className="bg-base-200 text-base-content/80 font-black text-xs uppercase tracking-wider border-b border-base-200">
            <tr>
              <th className="w-16">#</th>
              <th>User Identity</th>
              <th>Email Records</th>
              <th>Access Role</th>
              <th className="text-center w-80">Administrative Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-200 text-sm">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 font-bold text-base-content/40"
                >
                  No user records registered inside platform.
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                const userId = user._id || user.id;
                const isFraudVendor =
                  user.role === "vendor" && user.isFraud === true;

                return (
                  <tr
                    key={userId}
                    className={`transition-colors hover:bg-base-200/40 ${
                      isFraudVendor
                        ? "bg-error/5 text-error-content hover:bg-error/10"
                        : ""
                    }`}
                  >
                    <td className="font-bold text-base-content/40">
                      {index + 1}
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black tracking-tight ${isFraudVendor ? "text-error line-through" : "text-base-content"}`}
                        >
                          {user.name}
                        </span>
                        {isFraudVendor && (
                          <span className="badge badge-error badge-xs font-black tracking-widest text-[9px] uppercase px-1.5 py-1 text-white rounded-md">
                            ⚠️ Fraud Flagged
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="font-medium text-base-content/70 break-all">
                      {user.email}
                    </td>

                    <td>
                      <span
                        className={`badge font-bold text-xs uppercase tracking-wide px-2.5 py-2.5 border-none ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : user.role === "vendor"
                              ? isFraudVendor
                                ? "bg-error/20 text-error"
                                : "bg-secondary/10 text-secondary"
                              : "bg-base-200 text-base-content/70"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <div className="flex flex-wrap justify-center items-center gap-2">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleRoleChange(userId, "admin")}
                            disabled={actionLoadingId !== null}
                            className="btn btn-xs rounded-lg font-bold bg-primary/10 text-primary border-none hover:bg-primary hover:text-primary-content gap-1 transition-all h-7 px-2.5"
                          >
                            {actionLoadingId === `${userId}-admin` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <ShieldPlus className="w-3 h-3" /> Make Admin
                              </>
                            )}
                          </button>
                        )}

                        {user.role !== "vendor" && (
                          <button
                            onClick={() => handleRoleChange(userId, "vendor")}
                            disabled={actionLoadingId !== null}
                            className="btn btn-xs rounded-lg font-bold bg-secondary/10 text-secondary border-none hover:bg-secondary hover:text-secondary-content gap-1 transition-all h-7 px-2.5"
                          >
                            {actionLoadingId === `${userId}-vendor` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <UserCheck className="w-3 h-3" /> Make Vendor
                              </>
                            )}
                          </button>
                        )}

                        {user.role === "vendor" && !isFraudVendor && (
                          <button
                            onClick={() => handleMarkAsFraud(userId, true)}
                            disabled={actionLoadingId !== null}
                            className="btn btn-xs btn-error text-white font-extrabold rounded-lg gap-1 shadow-sm hover:shadow-none h-7 px-2.5 border-none bg-error"
                          >
                            {actionLoadingId === `${userId}-fraud` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <UserX className="w-3 h-3" /> Mark as Fraud
                              </>
                            )}
                          </button>
                        )}

                        {user.role === "admin" && (
                          <span className="text-[10px] font-black tracking-widest text-base-content/30 uppercase inline-flex items-center gap-0.5">
                            <ShieldAlert className="w-3 h-3" /> Root Guard
                            (Protected)
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
