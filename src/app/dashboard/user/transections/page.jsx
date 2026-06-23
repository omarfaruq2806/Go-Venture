import { getTransectionsHistory } from "@/lib/api/transections";
import { getSession } from "@/lib/session/server-session";

const UserTransections = async () => {
  const { user } = await getSession();

  const email = user.email;

  const transectionHistory = await getTransectionsHistory(email);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Transaction ID</th>
              <th className="p-3 border text-left">Amount</th>
              <th className="p-3 border text-left">Ticket Title</th>
              <th className="p-3 border text-left">Payment Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transectionHistory?.length > 0 ? (
              transectionHistory.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{t.stripeSessionId}</td>

                  <td className="p-3 border">৳{t.price}</td>

                  <td className="p-3 border">{t.title}</td>

                  <td className="p-3 border">
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransections;
