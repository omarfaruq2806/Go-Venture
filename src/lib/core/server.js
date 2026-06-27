// "use server";
// import { auth } from "@/lib/core/auth";
// import { headers } from "next/headers";

import { authHeader } from "../session/server-session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  const data = await res.json();
  return data;
};
