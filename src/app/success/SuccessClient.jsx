"use client";

import { useEffect } from "react";
import { saveTransection } from "@/lib/actions/transections";

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
  }, []);

  return (
    <>
      Payment Successful
      {customerEmail}
    </>
  );
}
