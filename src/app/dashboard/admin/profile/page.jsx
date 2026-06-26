import { getSession } from "@/lib/session/server-session";
import { User, Mail, Shield, Activity, Crown } from "lucide-react";
import React from "react";

const AdminProfile = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    // FIX 1: Page-er root content container text contrast thik korar jonno p-0 wrapper set kora holo
    <div className="w-full bg-base-100 text-base-content min-h-screen transition-colors duration-200">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* FIX 2: Card container ke dynamic `bg-base-200/40` or pure `bg-base-100` context-e upgrade kora holo */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 md:p-10">
          {/* Profile Identity Avatar Header Section */}
          <div className="flex flex-col items-center text-center border-b border-base-200 pb-8">
            <div className="relative group">
              <img
                src={
                  user?.image ||
                  user?.photo ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user?.name || "Admin"}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md group-hover:border-primary/40 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md animate-bounce">
                <Crown className="w-4 h-4" />
              </div>
            </div>

            <h1 className="mt-4 text-2xl md:text-3xl font-black text-base-content tracking-tight">
              {user?.name || "Administrator"}
            </h1>

            <span className="mt-2.5 inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" /> {user?.role || "Admin"}
            </span>
          </div>

          {/* Dynamic Matrix Specifications Info Grid Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card: Full Name */}
            {/* FIX 3: Inner components grid components dynamic texture `bg-base-200/60` use kora hoyeche jate overlap na hoy */}
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
            <div className="bg-base-200/60 p-4 rounded-xl border border-base-200 flex items-start gap-3.5 hover:border-info/30 transition-all duration-200">
              <div className="p-2.5 bg-info/10 text-info rounded-xl mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-base-content/50 tracking-wider block">
                  System Access Level
                </span>
                <h3 className="font-bold text-sm text-base-content mt-1 capitalize">
                  {user?.role || "Staff"}
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
                  Operational Status
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-success mt-1.5 bg-success/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  ● Live Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
