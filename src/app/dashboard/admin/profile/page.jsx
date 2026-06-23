import { getSession } from "@/lib/session/server-session";

const AdminProfile = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={user?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
          />

          <h1 className="mt-4 text-2xl font-bold">{user?.name}</h1>

          <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm capitalize">
            {user?.role}
          </span>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Full Name</p>
            <h3 className="font-semibold">{user?.name}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Email Address</p>
            <h3 className="font-semibold break-all">{user?.email}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Role</p>
            <h3 className="font-semibold capitalize">{user?.role}</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Status</p>
            <h3 className="font-semibold text-green-600">Active</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
