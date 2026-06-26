import { authClient } from "@/lib/auth-client";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverMutation = async (path, data, method) => {
  // const {data:session} = await authClient.getSession();
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
