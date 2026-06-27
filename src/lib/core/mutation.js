import { getClientToken } from "../session/client-session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverMutation = async (path, data, method) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...await getClientToken()
    },
    body: JSON.stringify(data),
  });
  return res;
};
