import { getSession } from "@/lib/session/server-session";
import { User, Mail, Store, Activity, Briefcase } from "lucide-react";
import React from "react";

const VendorProfile = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    // FULL COMPATIBILITY LAYER: bg-base-100 controls light/dark viewport transition automatically
    <div className="w-full bg-base-100 text-base-content min-h-screen transition-colors duration-200">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Main Card Wrapper */}
        <div className="bg-base-100 border border-base-200 rounded-3xl shadow-xl p-6 md:p-10 transition-all duration-300">
          {/* Profile Header Identity Area */}
          <div className="flex flex-col items-center text-center border-b border-base-200 pb-8">
            <div className="relative group">
              {/* Profile Image with Dynamic Safe Fallbacks */}
              <img
                src={
                  user?.image ||
                  user?.photo ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user?.name || "Vendor Merchant"}
                className="w-28 h-28 rounded-full object-cover border-4 border-secondary/20 shadow-md group-hover:border-secondary/40 transition-all duration-300"
              />
              {/* Absolute Badge Marker for Vendor Role Aesthetics */}
              <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-content p-1.5 rounded-full shadow-md">
                <Store className="w-4 h-4" />
              </div>
            </div>

            <h1 className="mt-4 text-2xl md:text-3xl font-black text-base-content tracking-tight">
              {user?.name || "Merchant Store"}
            </h1>

            <span className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" /> {user?.role || "Vendor"}
            </span>
          </div>

          {/* Dynamic Specifications Grid Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Full Name */}
            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-primary/30 transition-all duration-200">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/40 tracking-wider block">
                  Merchant/Full Name
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1">
                  {user?.name || "N/A"}
                </h3>
              </div>
            </div>

            {/* Box 2: Email Address */}
            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-secondary/30 transition-all duration-200">
              <div className="p-2.5 bg-secondary/10 text-secondary rounded-xl mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-black text-base-content/40 tracking-wider block">
                  Email Records
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1 break-all">
                  {user?.email || "N/A"}
                </h3>
              </div>
            </div>

            {/* Box 3: Role Privileges */}
            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-accent/30 transition-all duration-200">
              <div className="p-2.5 bg-accent/10 text-accent rounded-xl mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/40 tracking-wider block">
                  Account Privilege
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1 capitalize">
                  {user?.role || "Vendor Merchant"}
                </h3>
              </div>
            </div>

            {/* Box 4: Fraud Safe Active Status */}
            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-success/30 transition-all duration-200">
              <div className="p-2.5 bg-success/10 text-success rounded-xl mt-0.5">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/40 tracking-wider block">
                  Merchant Status
                </span>
                {user?.isFraud ? (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-error mt-1.5 bg-error/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    ● Fraud Blocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-success mt-1.5 bg-success/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    ● Verified Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
