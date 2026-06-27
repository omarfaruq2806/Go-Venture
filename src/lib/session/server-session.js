import { headers } from "next/headers";
import { auth } from "../auth";

// session for server side
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session;
};

// get user token
export const getUserToken = async () => {
  const session = await getSession();
  const token = session?.session?.token || null;
  return token;
};

// get user headers
export const authHeader = async () => {
  const token = await getUserToken();
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

