import { getSession } from "@/lib/session/server-session";
import { User, Mail, Compass, Activity } from "lucide-react";
import React from "react";

const UserProfile = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    // FIX: Optimized height layout with global theme auto adaptive token mappings
    <div className="w-full bg-base-100 text-base-content min-h-screen transition-colors duration-200">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Main Base Card Wrapper */}
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-6 md:p-10">
          {/* Profile Identity Avatar Header Section */}
          <div className="flex flex-col items-center text-center border-b border-base-200 pb-8">
            <div className="relative">
              <img
                src={
                  user?.image ||
                  user?.photo ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user?.name || "Passenger"}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md transition-all duration-300"
              />
            </div>

            <h1 className="mt-4 text-2xl md:text-3xl font-black text-base-content tracking-tight">
              {user?.name || "Passenger"}
            </h1>

            <span className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" /> {user?.role || "User"}
            </span>
          </div>

          {/* Dynamic Matrix Specifications Info Grid Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card: Full Name */}
            <div className="bg-base-200/60 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-primary/30 transition-all duration-200">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/50 tracking-wider block">
                  Full Name
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1">
                  {user?.name || "N/A"}
                </h3>
              </div>
            </div>

            {/* Card: Email Address */}
            <div className="bg-base-200/60 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-secondary/30 transition-all duration-200">
              <div className="p-2.5 bg-secondary/10 text-secondary rounded-xl mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-black text-base-content/50 tracking-wider block">
                  Email Address
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1 break-all">
                  {user?.email || "N/A"}
                </h3>
              </div>
            </div>

            {/* Card: Current Assigned Role */}
            <div className="bg-base-200/60 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-accent/30 transition-all duration-200">
              <div className="p-2.5 bg-accent/10 text-accent rounded-xl mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/50 tracking-wider block">
                  Account Privilege
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1 capitalize">
                  {user?.role || "Passenger"}
                </h3>
              </div>
            </div>

            {/* Card: Operational Status */}
            <div className="bg-base-200/60 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-success/30 transition-all duration-200">
              <div className="p-2.5 bg-success/10 text-success rounded-xl mt-0.5">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/50 tracking-wider block">
                  Account Status
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-success mt-1.5 bg-success/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  ● Profile Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
