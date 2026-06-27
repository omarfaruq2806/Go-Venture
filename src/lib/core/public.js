
import { authClient } from "@/lib/auth-client";
import { authHeader } from "../session/server-session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const serverFetch = async (path) => {
  // const token = await authClient.getToken();
  //   console.log(token);
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  const data = await res.json();
  return data;
};
