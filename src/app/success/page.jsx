// app/success/page.jsx

import { stripe } from "@/lib/stripe";
import SuccessClient from "./SuccessClient";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <div>Invalid Session</div>;
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  return (
    <SuccessClient
      sessionId={session_id}
      status={session.status}
      customerEmail={session.customer_details?.email}
      metadata={session.metadata}
    />
  );
}
