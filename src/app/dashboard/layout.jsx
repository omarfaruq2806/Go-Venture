import MobileSidebar from "@/components/dashboard/MobileSidebar";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <DashboardSidebar />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar>
        <DashboardSidebar />
      </MobileSidebar>

      {/* Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden bg-base-100">
        {children}
      </main>
    </div>
  );
}
