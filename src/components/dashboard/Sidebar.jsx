import Link from "next/link";
import { getSession, signOut } from "@/lib/session/server-session";
import LogoutButton from "./LogoutButton";

const DashboardSidebar = async () => {
  const session = await getSession();
  const role = session?.user?.role;
  // const role = vendor;

  console.log(session.user);

  const userLinks = [
    { label: "My Profile", path: "/dashboard/user/profile" },
    { label: "My Tickets", path: "/dashboard/user/tickets" },
    { label: "Transaction History", path: "/dashboard/user/transections" },
  ];

  const vendorLinks = [
    { label: "My Profile", path: "/dashboard/vendor/profile" },
    { label: "Add Ticket", path: "/dashboard/vendor/add-ticket" },
    { label: "My Added Tickets", path: "/dashboard/vendor/my-tickets" },
    {
      label: "Requested Bookings",
      path: "/dashboard/vendor/requested-bookings",
    },
    {
      label: "Revenue Overview",
      path: "/dashboard/vendor/revenue-overview",
    },
  ];

  const adminLinks = [
    { label: "My Profile", path: "/dashboard/admin/profile" },
    { label: "Manage Tickets", path: "/dashboard/admin/manage-tickets" },
    { label: "Manage Users", path: "/dashboard/admin/manage-users" },
    {
      label: "Advertise Tickets",
      path: "/dashboard/admin/advertise-tickets",
    },
  ];

  const linksMap = {
    user: userLinks,
    vendor: vendorLinks,
    admin: adminLinks,
  };

  const links = linksMap[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm p-5">
      {/* User Info */}
      <div className="mb-8">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold">
          {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2 className="mt-3 font-semibold">{session?.user?.name}</h2>

        <p className="text-sm text-gray-500 capitalize">
          {role || "Loading..."}
        </p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <LogoutButton></LogoutButton>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
