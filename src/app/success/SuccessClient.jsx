"use client";

import { useEffect } from "react";
import { saveTransection } from "@/lib/actions/transections";
import {
  CheckCircle2,
  Mail,
  Ticket,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function SuccessClient({
  sessionId,
  status,
  customerEmail,
  metadata,
}) {
  useEffect(() => {
    if (status === "complete") {
      saveTransection({
        ...metadata,
        stripeSessionId: sessionId,
      });
    }
  }, [status, sessionId, metadata]);

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body items-center text-center space-y-6">
            {/* Success Icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>

              <div className="relative w-24 h-24 rounded-full bg-success text-success-content flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-14 h-14" />
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-black text-success">
                Payment Successful!
              </h1>

              <p className="mt-2 text-base-content/70">
                Thank you for your purchase. Your ticket has been confirmed and
                your transaction has been completed successfully.
              </p>
            </div>

            {/* Email */}
            <div className="w-full bg-base-200 rounded-xl p-4 border border-base-300">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />

                <div className="text-left">
                  <p className="text-xs uppercase font-bold text-base-content/50">
                    Confirmation Email
                  </p>

                  <p className="font-semibold break-all">
                    {customerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <div className="bg-base-200 rounded-xl p-4 border border-base-300">
                <Ticket className="w-7 h-7 text-primary mb-2" />

                <h3 className="font-bold">Ticket Reserved</h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Your booking has been saved successfully.
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4 border border-base-300">
                <ShieldCheck className="w-7 h-7 text-success mb-2" />

                <h3 className="font-bold">Secure Payment</h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Your payment has been verified securely via Stripe.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <Link
                href="/dashboard/user/transections"
                className="btn btn-primary flex-1"
              >
                View Transactions
              </Link>

              <Link
                href="/tickets"
                className="btn btn-outline flex-1"
              >
                Browse Tickets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Footer */}
            <div className="divider my-0"></div>

            <p className="text-xs text-base-content/50">
              Need help? Contact our support team anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}