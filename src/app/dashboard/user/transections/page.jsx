import { getTransectionsHistory } from "@/lib/api/transections";
import { getSession } from "@/lib/session/server-session";
import {
  History,
  Receipt,
  CreditCard,
  Calendar,
  ArrowRight,
} from "lucide-react";
import React from "react";

const UserTransactions = async () => {
  // FIX 1: Prevent crash by safely reading the session object first before destructuring data points
  const session = await getSession();
  const user = session?.user;
  const email = user?.email || "";

  const transactionHistory = (await getTransectionsHistory(email)) || [];

  return (
    <div className="w-full bg-base-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Component Header Banner Description Panel Section widget layout wrapper */}
        <div className="p-5 border border-base-200 bg-base-200/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-base-content tracking-tight">
              Transaction History
            </h2>
            <p className="text-xs text-base-content/50 font-semibold mt-0.5">
              Review and audit your secure financial settlement footprints
              processed through Stripe ledger systems.
            </p>
          </div>
        </div>

        {/* Outer Wrapper Board Layer Frame Overlay Box Component Table */}
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-xl w-full">
          <table className="table table-md w-full">
            {/* Dark Mode Safe Table Thead Base Element Header Grid Map line options */}
            <thead className="bg-base-200 text-base-content/80 font-black text-xs uppercase tracking-wider border-b border-base-200">
              <tr>
                <th>
                  <span className="flex items-center gap-1">
                    <Receipt className="w-3.5 h-3.5" /> Transaction ID
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> Settled Amount
                  </span>
                </th>
                <th>Ticket Specification</th>
                <th>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Settlement Date
                  </span>
                </th>
              </tr>
            </thead>

            {/* Content List Items Body mapping parameters */}
            <tbody className="divide-y divide-base-200 text-sm font-medium">
              {transactionHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-12 font-bold text-base-content/40"
                  >
                    No payment transaction records registered under this profile
                    logs.
                  </td>
                </tr>
              ) : (
                transactionHistory.map((t) => (
                  <tr
                    key={t._id || t.id}
                    className="transition-colors hover:bg-base-200/40"
                  >
                    {/* Column 1: Stripe Session Token Hash Identifier Segment */}
                    <td className="font-mono text-xs text-base-content/60 tracking-tight max-w-[180px] truncate select-all">
                      {t.stripeSessionId || "ch_stripe_mock_token_hash"}
                    </td>

                    {/* Column 2: Localized Pricing Currency Code formatted field text box data wrapper */}
                    <td className="font-black text-success">
                      ৳{t.price ? t.price.toLocaleString("en-BD") : "0"}
                    </td>

                    {/* Column 3: Bound Ticket Route Title specifications */}
                    <td>
                      <div className="flex flex-col max-w-[280px]">
                        <span className="font-black text-base-content tracking-tight line-clamp-1">
                          {t.title}
                        </span>
                        {/* Dynamic route sub-tag check helper context jodi payload metrics mapping support block values available thake */}
                        {t.from && t.to && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-base-content/40 mt-0.5">
                            <span>{t.from}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                            <span>{t.to}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Column 4: Timestamp parameter formatting layer array metrics options row execution */}
                    <td className="text-base-content/70 font-bold text-xs">
                      {t.createdAt ? (
                        <div className="flex flex-col">
                          <span>
                            {new Date(t.createdAt).toLocaleDateString([], {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="text-[10px] text-base-content/40 font-medium mt-0.5">
                            {new Date(t.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base-content/30 italic font-medium">
                          Not Documented
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
