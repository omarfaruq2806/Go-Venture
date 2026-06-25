
// import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const serverFetch = async (path) => {
  // const token = await authClient.getToken();
  //   console.log(token);
  const res = await fetch(`${baseUrl}${path}`);
  const data = await res.json();
  return data;
};
