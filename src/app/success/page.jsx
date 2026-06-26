import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";
import { saveTransection } from "@/lib/actions/transections";
import { Mail, ShieldCheck } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const res = await saveTransection({
      ...metadata,
      stripeSessionId: session_id,
    });

    return (
      <section id="success" className="h-screen bg-base-100 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden transition-all duration-200">
          {/* Header: Micro Invoice Title Ribbon */}
          <div className="bg-base-200 px-4 py-3 border-b border-base-300 flex items-center justify-between text-xs font-black uppercase tracking-wider text-base-content/60">
            <span className="flex items-center gap-1">🧾 Payment Receipt</span>
            <span className="text-[10px] text-success font-extrabold px-2 py-0.5 bg-success/10 rounded">
              Paid
            </span>
          </div>

          {/* Core Content Body Wrapper */}
          <div className="p-4 space-y-3.5 text-left">
            {/* Specification 1: Confirmation Email Stack */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-xl mt-0.5 flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black text-base-content/40 uppercase tracking-widest block">
                  Customer Account
                </span>
                <p className="text-xs font-bold text-base-content mt-0.5 leading-relaxed">
                  We appreciate your business! Confirmation sent to:{" "}
                  <span className="text-primary font-black break-all block sm:inline hover:underline cursor-pointer">
                    {customerEmail}
                  </span>
                </p>
              </div>
            </div>

            {/* Elegant Dot/Dash Divider to mimic real physical receipts */}
            <div className="border-t border-dashed border-base-300 my-1"></div>

            {/* Specification 2: Help Desk & Support Links */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 text-secondary rounded-xl mt-0.5 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black text-base-content/40 uppercase tracking-widest block">
                  Support Center
                </span>
                <p className="text-xs font-medium text-base-content/70 mt-0.5 leading-relaxed">
                  Any inquiries? Email:{" "}
                  <a
                    href="mailto:orders@example.com"
                    className="text-secondary font-black hover:underline break-all"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
