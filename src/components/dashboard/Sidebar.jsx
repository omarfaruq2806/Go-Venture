import Link from "next/link";
import { getSession } from "@/lib/session/server-session";
import LogoutButton from "./LogoutButton";
import {
  User,
  Ticket,
  History,
  PlusCircle,
  FolderSync,
  TrendingUp,
  ShieldCheck,
  Users,
  Megaphone,
  LayoutDashboard,
} from "lucide-react";

const DashboardSidebar = async () => {
  const session = await getSession();
  const role = session?.user?.role;

  // Icons array logic setup for visual aesthetics
  const userLinks = [
    {
      label: "My Profile",
      path: "/dashboard/user/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "My Tickets",
      path: "/dashboard/user/tickets",
      icon: <Ticket className="w-4 h-4" />,
    },
    {
      label: "Transaction History",
      path: "/dashboard/user/transections",
      icon: <History className="w-4 h-4" />,
    },
  ];

  const vendorLinks = [
    {
      label: "My Profile",
      path: "/dashboard/vendor/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Add Ticket",
      path: "/dashboard/vendor/add-ticket",
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      label: "My Added Tickets",
      path: "/dashboard/vendor/my-tickets",
      icon: <Ticket className="w-4 h-4" />,
    },
    {
      label: "Requested Bookings",
      path: "/dashboard/vendor/requested-bookings",
      icon: <FolderSync className="w-4 h-4" />,
    },
    {
      label: "Revenue Overview",
      path: "/dashboard/vendor/revenue-overview",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  const adminLinks = [
    {
      label: "My Profile",
      path: "/dashboard/admin/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Manage Tickets",
      path: "/dashboard/admin/manage-tickets",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      label: "Manage Users",
      path: "/dashboard/admin/manage-users",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Advertise Tickets",
      path: "/dashboard/admin/advertise-tickets",
      icon: <Megaphone className="w-4 h-4" />,
    },
  ];

  const linksMap = {
    user: userLinks,
    vendor: vendorLinks,
    admin: adminLinks,
  };

  const links = linksMap[role] || [];

  return (
    // FIX: bg-base-100 and border-base-200 controls light/dark mode framework seamlessly
    <aside
      className="min-h-screen
    w-64
    bg-base-100
    border-r
    border-base-200
    shadow-sm
    p-5
    flex
    flex-col
    justify-between"
    >
      <div>
        {/* Brand/Platform Header */}
        <div className="flex items-center gap-2 px-2 mb-8 border-b border-base-200 pb-4">
          <div className="p-2 bg-primary rounded-xl text-primary-content">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="font-black text-xl text-base-content tracking-tight">
            Ticket<span className="text-primary">Bari</span>
          </span>
        </div>

        {/* User Info Capsule Block */}
        <div className="flex items-center gap-3 bg-base-200/50 p-3 rounded-2xl border border-base-200/60 mb-6">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session?.user?.name}
              className="w-12 h-12 rounded-xl object-cover border border-base-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg border border-primary/20 flex-shrink-0">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-sm text-base-content truncate">
              {session?.user?.name || "Guest Account"}
            </h2>
            <span className="inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wide mt-0.5 capitalize">
              {role || "Loading..."}
            </span>
          </div>
        </div>

        {/* Navigation Menu Link List */}
        <nav className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40 px-2 block mb-2">
            Main Menu
          </span>
          <ul className="space-y-1.5">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-base-content/70 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                >
                  <div className="text-base-content/40 group-hover:text-primary transition-colors">
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer Area with Dynamic Action Trigger Logout */}
      <div className="border-t border-base-200 pt-4 mt-6">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
