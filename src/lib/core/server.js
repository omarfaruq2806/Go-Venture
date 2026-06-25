// "use server";
// import { auth } from "@/lib/core/auth";
// import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const protectedFetch = async (path) => {
  // const token = await auth.api.getAccessToken({
  //   headers: await headers(),
  // });
  // console.log(token, 'token');
  const res = await fetch(`${baseUrl}${path}`);
  const data = await res.json();
  return data;
};
